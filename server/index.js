import { WebSocketServer } from 'ws'

const PORT = 3002

console.log(`WebSocket server running on 0.0.0.0:${PORT}`)

const players = new Map()
const rooms = new Map()

// 地图定义（出生点 + 地面武器刷新点）
const MAPS = {
  classic: {
    name: '经典沙漠',
    spawnPoints: {
      red: [
        { x: -30, y: 1.5, z: -42 },
        { x: -28, y: 1.5, z: -38 },
        { x: -34, y: 1.5, z: -38 },
      ],
      blue: [
        { x: 30, y: 1.5, z: 42 },
        { x: 28, y: 1.5, z: 38 },
        { x: 34, y: 1.5, z: 38 },
      ],
    },
    groundWeaponSpawns: [
      { x: -15, z: -20, weaponIndex: 1 }, { x: 15, z: -20, weaponIndex: 2 },
      { x: -15, z: 20, weaponIndex: 1 }, { x: 15, z: 20, weaponIndex: 2 },
      { x: 0, z: -15, weaponIndex: 3 }, { x: 0, z: 15, weaponIndex: 3 },
      { x: -35, z: 0, weaponIndex: 1 }, { x: 35, z: 0, weaponIndex: 2 },
    ],
  },
  dust: {
    name: '草地双楼',
    spawnPoints: {
      red: [
        { x: -30, y: 1.5, z: -35 },
        { x: -30, y: 1.5, z: -37 },
        { x: -30, y: 1.5, z: -33 },
      ],
      blue: [
        { x: 30, y: 1.5, z: 35 },
        { x: 30, y: 1.5, z: 37 },
        { x: 30, y: 1.5, z: 33 },
      ],
    },
    groundWeaponSpawns: [
      { x: 0, z: -8, weaponIndex: 1 }, { x: 0, z: 8, weaponIndex: 2 },
      { x: -8, z: 0, weaponIndex: 1 }, { x: 8, z: 0, weaponIndex: 2 },
      { x: -20, z: -20, weaponIndex: 0 }, { x: 20, z: 20, weaponIndex: 0 },
      { x: -38, z: -35, weaponIndex: 3, y: 8.3 },
      { x: 38, z: 35, weaponIndex: 3, y: 8.3 },
    ],
  },
  campus: {
    name: '校园',
    spawnPoints: {
      red: [
        { x: -100, y: 1.5, z: -100 },
        { x: -110, y: 1.5, z: -90 },
        { x: -90, y: 1.5, z: -95 },
      ],
      blue: [
        { x: 100, y: 1.5, z: 100 },
        { x: 110, y: 1.5, z: 90 },
        { x: 90, y: 1.5, z: 95 },
      ],
    },
    groundWeaponSpawns: [
      { x: 0, z: 0, weaponIndex: 1 },
      { x: 50, z: 50, weaponIndex: 2 },
      { x: -50, z: 50, weaponIndex: 1 },
      { x: 50, z: -50, weaponIndex: 2 },
      { x: -50, z: -50, weaponIndex: 1 },
      { x: 0, z: 100, weaponIndex: 3 },
      { x: 0, z: -100, weaponIndex: 3 },
      { x: 100, z: 0, weaponIndex: 3 },
      { x: -100, z: 0, weaponIndex: 3 },
    ],
  },
}

function getMapSpawnPoints(room) {
  const mapId = room.mapId || 'classic'
  return MAPS[mapId] || MAPS.classic
}

function createPlayer(ws, data, playerId, team, roomId) {
  return {
    id: playerId,
    name: data.playerName || 'Player',
    position: { x: -30, y: 1.5, z: -42 },
    rotation: { x: 0, y: 0 },
    health: 100,
    isAlive: true,
    kills: 0,
    deaths: 0,
    team: team,
    roomId,
    money: 300,
    weapons: [{ index: 0, permanent: false }],
    currentWeaponSlot: 0,
  }
}

const WEAPON_COSTS = {
  0: 300,
  1: 700,
  2: 800,
  3: 1500,
}

function initGroundWeapons(room) {
  const mapData = getMapSpawnPoints(room)
  room.groundWeapons = mapData.groundWeaponSpawns.map(s => ({
    ...s,
    id: Math.random().toString(36).substring(2, 8),
    available: true,
    position: { x: s.x, y: s.y ?? 0.08, z: s.z },
  }))
}

function cleanPlayer(player) {
  return {
    id: player.id,
    name: player.name,
    position: player.position,
    rotation: player.rotation,
    health: player.health,
    isAlive: player.isAlive,
    isReady: false,
    kills: player.kills,
    deaths: player.deaths,
    team: player.team,
    money: player.money || 300,
    weapons: player.weapons || [{ index: 3, permanent: true }],
    currentWeaponSlot: player.currentWeaponSlot || 0,
  }
}

function cleanRoom(room) {
  const cleanPlayers = room.players.map(p => cleanPlayer(p))
  return {
    ...room,
    hostId: room.ownerId,
    players: cleanPlayers,
  }
}

function broadcast(roomId, message, excludeWs) {
  for (const [ws, player] of players) {
    if (player.roomId === roomId && ws !== excludeWs) {
      try {
        ws.send(JSON.stringify(message))
      } catch (e) {
        console.error('Broadcast failed:', e)
      }
    }
  }
}

function sendTo(ws, message) {
  try {
    ws.send(JSON.stringify(message))
  } catch (e) {
    console.error('Send failed:', e)
  }
}

function respawnPlayer(player, room) {
  const spawns = getMapSpawnPoints(room).spawnPoints[player.team]
  const spawn = spawns[Math.floor(Math.random() * spawns.length)]
  player.position = { ...spawn }
  player.health = 100
  player.isAlive = true
  
  broadcast(room.id, { 
    type: 'player_respawned', 
    data: { playerId: player.id, position: player.position } 
  })
  
  const updatedRoom = cleanRoom(room)
  broadcast(room.id, { type: 'room_updated', data: updatedRoom })
}

function startGame(room) {
  room.status = 'playing'
  room.gameTime = 900
  
  initGroundWeapons(room)
  
  const usedSpawns = { red: new Set(), blue: new Set() }
  let spawnIdx = { red: 0, blue: 0 }

  for (const player of room.players) {
    const spawns = getMapSpawnPoints(room).spawnPoints[player.team]
    const spawn = spawns[spawnIdx[player.team] % spawns.length]
    spawnIdx[player.team]++
    player.position = { ...spawn }
    player.health = 100
    player.isAlive = true
    player.kills = 0
    player.deaths = 0
    player.money = 300
    player.weapons = [{ index: 0, permanent: false }]
    player.currentWeaponSlot = 0
  }
  
  room.redKills = 0
  room.blueKills = 0
  
  broadcast(room.id, { type: 'game_started', data: cleanRoom(room) })
  broadcast(room.id, { type: 'ground_weapons', data: { groundWeapons: room.groundWeapons } })
}

function endGame(room) {
  room.status = 'ended'
  
  let winner = 'draw'
  if (room.redKills > room.blueKills) {
    winner = 'red'
  } else if (room.blueKills > room.redKills) {
    winner = 'blue'
  }
  
  broadcast(room.id, { 
    type: 'game_ended', 
    data: { winner, room: cleanRoom(room) } 
  })
  
  setTimeout(() => {
    startGame(room)
  }, 5000)
}

const wss = new WebSocketServer({ port: PORT, host: '0.0.0.0' })

wss.on('connection', (ws) => {
  console.log('New client connected')
  
  ws.on('message', (message) => {
    let msg
    try {
      msg = JSON.parse(message)
    } catch (e) {
      console.error('Invalid JSON:', e)
      return
    }
    
    const data = msg.data || {}
    
    switch (msg.type) {
      case 'create_room': {
        const roomId = Math.random().toString(36).substring(2, 11)
        const playerId = Math.random().toString(36).substring(2, 11)
        
        const player = createPlayer(ws, data, playerId, 'red', roomId)
        
        const room = {
          id: roomId,
          name: data.roomName || 'Untitled Room',
          mapId: data.mapId || 'classic',
          ownerId: playerId,
          hostId: playerId,
          maxPlayers: 8,
          status: 'waiting',
          players: [player],
          redKills: 0,
          blueKills: 0,
          gameTime: 900,
          groundWeapons: [],
        }
        
        players.set(ws, player)
        rooms.set(roomId, room)
        
        sendTo(ws, { 
          type: 'room_created', 
          data: { roomId, playerId, room: cleanRoom(room) } 
        })
        
        break
      }
      
      case 'join_room': {
        console.log('[join_room] Request:', data.roomId, data.playerName)
        const room = rooms.get(data.roomId)
        console.log('[join_room] Room found:', !!room, 'Status:', room?.status, 'Players:', room?.players?.length)
        if (!room || room.status === 'playing') {
          console.log('[join_room] Rejected - room not found or playing')
          sendTo(ws, { type: 'error', data: 'Room not found or already playing' })
          return
        }
        
        const playerId = Math.random().toString(36).substring(2, 11)
        const player = createPlayer(ws, data, playerId, 'blue', data.roomId)
        
        room.players.push(player)
        players.set(ws, player)
        
        console.log('[join_room] Success - player added:', playerId)
        sendTo(ws, { 
          type: 'room_joined', 
          data: { roomId: data.roomId, playerId, room: cleanRoom(room) } 
        })
        
        broadcast(data.roomId, { 
          type: 'player_joined', 
          data: { room: cleanRoom(room), player: cleanPlayer(player) } 
        })
        
        break
      }
      
      case 'get_rooms': {
        const roomList = Array.from(rooms.values()).map(cleanRoom)
        sendTo(ws, { type: 'rooms_list', data: roomList })
        break
      }
      
      case 'leave_room': {
        const player = players.get(ws)
        if (!player) return
        
        const room = rooms.get(player.roomId)
        if (room) {
          room.players = room.players.filter(p => p.id !== player.id)
          
          if (room.players.length === 0) {
            rooms.delete(room.id)
          } else {
            if (room.ownerId === player.id) {
              room.ownerId = room.players[0].id
            }
            
            broadcast(room.id, { 
              type: 'player_left', 
              data: { room: cleanRoom(room), playerId: player.id } 
            })
          }
        }
        
        players.delete(ws)
        sendTo(ws, { type: 'room_left' })
        break
      }
      
      case 'start_game': {
        const player = players.get(ws)
        if (!player) return
        
        const room = rooms.get(player.roomId)
        if (!room || room.ownerId !== player.id) {
          sendTo(ws, { type: 'error', data: 'Only owner can start game' })
          return
        }
        
        if (room.players.length < 2) {
          sendTo(ws, { type: 'error', data: 'Need at least 2 players' })
          return
        }
        
        startGame(room)
        break
      }
      
      case 'switch_team': {
        const player = players.get(ws)
        if (!player) return
        
        const room = rooms.get(player.roomId)
        if (!room || room.status === 'playing') {
          sendTo(ws, { type: 'error', data: 'Cannot switch team during game' })
          return
        }
        
        player.team = player.team === 'red' ? 'blue' : 'red'
        
        broadcast(room.id, { type: 'room_updated', data: cleanRoom(room) })
        break
      }
      
      case 'move': {
        const player = players.get(ws)
        if (!player || !player.isAlive) return
        
        player.position = data.position
        player.rotation = data.rotation
        
        broadcast(player.roomId, { 
          type: 'player_moved', 
          data: { playerId: player.id, position: data.position, rotation: data.rotation } 
        }, ws)
        
        break
      }
      
      case 'shoot': {
        const player = players.get(ws)
        if (!player || !player.isAlive) return
        
        const room = rooms.get(player.roomId)
        if (!room || room.status !== 'playing') return
        
        broadcast(room.id, { 
          type: 'player_shot', 
          data: { playerId: player.id, direction: data.direction } 
        }, ws)
        
        break
      }
      
      case 'hit': {
        const attacker = players.get(ws)
        if (!attacker || !attacker.isAlive) return
        
        const room = rooms.get(attacker.roomId)
        if (!room || room.status !== 'playing') return
        
        const target = room.players.find(p => p.id === data.targetId)
        if (!target || !target.isAlive) return
        
        if (attacker.team === target.team) return
        
        target.health -= data.damage
        
        console.log(`[HIT] Attacker: ${attacker.name} (${attacker.team}), Target: ${target.name} (${target.team}), Damage: ${data.damage}, Health: ${target.health}`)
        
        if (target.health <= 0) {
          target.isAlive = false
          target.deaths++
          attacker.kills++
          attacker.money = (attacker.money || 300) + 100
          
          // 掉落非永久武器到地面
          if (target.weapons) {
            const dropped = target.weapons.filter(w => !w.permanent)
            if (!room.groundWeapons) room.groundWeapons = []
            for (const w of dropped) {
              room.groundWeapons.push({
                x: target.position.x,
                z: target.position.z,
                weaponIndex: w.index,
                id: Math.random().toString(36).substring(2, 8),
                available: true,
                position: { x: target.position.x, y: 0.08, z: target.position.z },
              })
            }
            target.weapons = target.weapons.filter(w => w.permanent)
            target.currentWeaponSlot = 0
          }
          
          if (attacker.team === 'red') {
            room.redKills++
          } else {
            room.blueKills++
          }
          
          broadcast(room.id, { 
            type: 'player_die', 
            data: { victimId: target.id, killerId: attacker.id, room: cleanRoom(room) } 
          })
          broadcast(room.id, { type: 'ground_weapons', data: { groundWeapons: room.groundWeapons } })
          sendTo(ws, { type: 'money_update', data: { money: attacker.money } })
          
          setTimeout(() => {
            if (room.status === 'playing') {
              respawnPlayer(target, room)
            }
          }, 3000)
        } else {
          broadcast(room.id, { 
            type: 'player_hit', 
            data: { targetId: target.id, health: target.health, attackerId: attacker.id } 
          })
        }
        
        break
      }
      
      case 'buy_weapon': {
        const buyer = players.get(ws)
        if (!buyer || !buyer.isAlive) return
        const room = rooms.get(buyer.roomId)
        if (!room || room.status !== 'playing') return
        
        const weaponIdx = data.weaponIndex
        const cost = WEAPON_COSTS[weaponIdx]
        if (!cost) { sendTo(ws, { type: 'error', data: 'Invalid weapon' }); return }
        
        if ((buyer.money || 0) < cost) {
          sendTo(ws, { type: 'error', data: 'Not enough money' })
          return
        }
        
        const alreadyOwned = buyer.weapons && buyer.weapons.some(w => w.index === weaponIdx)
        if (alreadyOwned) {
          const slot = buyer.weapons.findIndex(w => w.index === weaponIdx)
          buyer.currentWeaponSlot = slot
        } else {
          if (buyer.weapons.length < 2) {
            buyer.weapons.push({ index: weaponIdx, permanent: true })
            buyer.currentWeaponSlot = buyer.weapons.length - 1
          } else {
            buyer.weapons[buyer.currentWeaponSlot] = { index: weaponIdx, permanent: true }
          }
        }
        buyer.money -= cost
        
        sendTo(ws, { type: 'money_update', data: { money: buyer.money } })
        broadcast(room.id, { type: 'player_weapons_update', data: { playerId: buyer.id, weapons: buyer.weapons, currentWeaponSlot: buyer.currentWeaponSlot } })
        break
      }
      
      case 'pickup_weapon': {
        const picker = players.get(ws)
        if (!picker || !picker.isAlive) return
        const room = rooms.get(picker.roomId)
        if (!room || room.status !== 'playing') return
        if (!room.groundWeapons) room.groundWeapons = []
        
        const gw = room.groundWeapons.find(g => g.id === data.groundWeaponId && g.available)
        if (!gw) { sendTo(ws, { type: 'error', data: 'Weapon not available' }); return }
        
        const alreadyOwned = picker.weapons && picker.weapons.some(w => w.index === gw.weaponIndex)
        if (!alreadyOwned) {
          if (picker.weapons.length < 2) {
            picker.weapons.push({ index: gw.weaponIndex, permanent: false })
            picker.currentWeaponSlot = picker.weapons.length - 1
          } else {
            const oldWeapon = picker.weapons[picker.currentWeaponSlot]
            if (oldWeapon) {
              const dropY = Math.max(0.08, picker.position.y - 1.4)
              room.groundWeapons.push({
                x: picker.position.x,
                z: picker.position.z,
                weaponIndex: oldWeapon.index,
                id: Math.random().toString(36).substring(2, 8),
                available: true,
                position: { x: picker.position.x, y: dropY, z: picker.position.z },
              })
            }
            picker.weapons[picker.currentWeaponSlot] = { index: gw.weaponIndex, permanent: false }
          }
        }
        gw.available = false
        
        broadcast(room.id, { type: 'player_weapons_update', data: { playerId: picker.id, weapons: picker.weapons, currentWeaponSlot: picker.currentWeaponSlot } })
        broadcast(room.id, { type: 'ground_weapons', data: { groundWeapons: room.groundWeapons } })
        break
      }
      
      case 'switch_weapon_slot': {
        const sw = players.get(ws)
        if (!sw) return
        sw.currentWeaponSlot = data.slot
        break
      }
    }
  })
  
  ws.on('close', () => {
    console.log('Client disconnected')
    
    const player = players.get(ws)
    if (!player) return
    
    const room = rooms.get(player.roomId)
    if (room) {
      room.players = room.players.filter(p => p.id !== player.id)
      
      if (room.players.length === 0) {
        rooms.delete(room.id)
      } else {
        if (room.ownerId === player.id) {
          room.ownerId = room.players[0].id
        }
        
        broadcast(room.id, { 
          type: 'player_left', 
          data: { room: cleanRoom(room), playerId: player.id } 
        })
      }
    }
    
    players.delete(ws)
  })
})