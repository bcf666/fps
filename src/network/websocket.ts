import { useGameStore, Room, Player } from '../stores/gameStore'

type MessageHandler = (data: unknown) => void

export interface GroundWeapon {
  id: string
  x: number
  z: number
  weaponIndex: number
  available: boolean
  position: { x: number; y: number; z: number }
}

class NetworkManager {
  private ws: WebSocket | null = null
  private handlers: Map<string, MessageHandler[]> = new Map()
  private reconnectAttempts = 0
  private maxReconnectAttempts = 5

  connect() {
    const wsHost = window.location.hostname || 'localhost'
    const serverUrl = `ws://${wsHost}:3002`
    
    try {
      this.ws = new WebSocket(serverUrl)
      
      this.ws.onopen = () => {
        console.log('Connected to server')
        useGameStore.getState().setIsConnected(true)
        this.reconnectAttempts = 0
      }
      
      this.ws.onclose = () => {
        console.log('Disconnected from server')
        useGameStore.getState().setIsConnected(false)
        this.attemptReconnect()
      }
      
      this.ws.onerror = (error) => {
        console.error('WebSocket error:', error)
      }
      
      this.ws.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data)
          this.handleMessage(message)
        } catch (e) {
          console.error('Failed to parse message:', e)
        }
      }
    } catch (error) {
      console.error('Failed to connect:', error)
    }
  }

  private attemptReconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++
      setTimeout(() => this.connect(), 2000)
    }
  }

  private handleMessage(message: { type: string; data: unknown }) {
    const handlers = this.handlers.get(message.type) || []
    handlers.forEach(handler => handler(message.data))
    
    switch (message.type) {
      case 'room_created': {
        const data = message.data as { roomId: string; playerId: string; room: Room }
        useGameStore.getState().setPlayerId(data.playerId)
        useGameStore.getState().setCurrentRoom(data.room)
        break
      }
      case 'room_joined': {
        const data = message.data as { roomId: string; playerId: string; room: Room }
        useGameStore.getState().setPlayerId(data.playerId)
        useGameStore.getState().setCurrentRoom(data.room)
        break
      }
      case 'room_update': {
        const roomUpdateData = message.data as Room
        useGameStore.getState().setCurrentRoom(roomUpdateData)
        const myId = useGameStore.getState().playerId
        const myPlayer = roomUpdateData.players.find(p => p.id === myId)
        if (myPlayer?.weapons) {
          useGameStore.getState().setPlayerWeapons(myPlayer.weapons, myPlayer.currentWeaponSlot ?? 0)
        }
        break
      }
      case 'set_player_id':
        useGameStore.getState().setPlayerId((message.data as { id: string }).id)
        break
      case 'rooms_list':
        useGameStore.getState().setRooms(message.data as Room[])
        break
      case 'error':
        console.error('[WS] Server error:', message.data)
        alert(message.data)
        break
      case 'player_joined':
        this.handlePlayerJoined(message.data as { room: Room; player: Player })
        break
      case 'player_left':
        this.handlePlayerLeft(message.data as { room: Room; playerId: string })
        break
      case 'game_started': {
        const roomData = message.data as Room
        useGameStore.getState().setCurrentRoom(roomData)
        useGameStore.getState().setGameTime(900)
        useGameStore.getState().setWinner(null)
        const player = roomData.players.find(p => p.id === useGameStore.getState().playerId)
        if (player?.weapons) {
          useGameStore.getState().setPlayerWeapons(player.weapons, player.currentWeaponSlot ?? 0)
        }
        break
      }
      case 'player_moved':
        this.handlePlayerMoved(message.data as { playerId: string; position: { x: number; y: number; z: number }; rotation: { x: number; y: number } })
        break
      case 'player_die':
        const deathData = message.data as { victimId: string; killerId: string; room: Room }
        const state = useGameStore.getState()
        const victim = state.currentRoom?.players.find(p => p.id === deathData.victimId)
        const killer = state.currentRoom?.players.find(p => p.id === deathData.killerId)
        if (victim && killer) {
          state.addKill(killer.name, victim.name, killer.team, victim.team)
        }
        useGameStore.getState().updateRoom(deathData.room)
        break
      case 'game_ended':
        const endData = message.data as { room: Room; winner: 'red' | 'blue' | 'draw'; redKills: number; blueKills: number }
        useGameStore.getState().updateRoom(endData.room)
        useGameStore.getState().setWinner(endData.winner)
        useGameStore.getState().setTeamScores(endData.redKills, endData.blueKills)
        break
      case 'player_hit':
        const hitData = message.data as { targetId: string; health: number; attackerId: string }
        useGameStore.getState().updateRoomFromHit(hitData)
        break
      case 'player_respawned':
        const respawnData = message.data as { playerId: string; position: { x: number; y: number; z: number } }
        useGameStore.getState().handlePlayerRespawn(respawnData)
        break
      case 'player_shot':
        break
      case 'ground_weapons': {
        const gwData = message.data as { groundWeapons: GroundWeapon[] }
        useGameStore.getState().setGroundWeapons(gwData.groundWeapons)
        break
      }
      case 'money_update': {
        const moneyData = message.data as { money: number }
        useGameStore.getState().setMoney(moneyData.money)
        break
      }
      case 'player_weapons_update': {
        const pwData = message.data as { playerId: string; weapons: { index: number; permanent: boolean }[]; currentWeaponSlot: number }
        const store = useGameStore.getState()
        // Only update local weapon state if this message is about myself
        if (pwData.playerId === store.playerId) {
          store.setPlayerWeapons(pwData.weapons, pwData.currentWeaponSlot)
        }
        // Update currentRoom.players so OtherPlayers renders correct weapons
        if (store.currentRoom) {
          const updatedRoom = {
            ...store.currentRoom,
            players: store.currentRoom.players.map(p =>
              p.id === pwData.playerId ? { ...p, weapons: pwData.weapons, currentWeaponSlot: pwData.currentWeaponSlot } : p
            )
          }
          store.setCurrentRoom(updatedRoom)
        }
        break
      }
    }
  }

  private handlePlayerMoved(data: { playerId: string; position: { x: number; y: number; z: number }; rotation: { x: number; y: number } }) {
    const room = useGameStore.getState().currentRoom
    if (!room) return
    const player = room.players.find(p => p.id === data.playerId)
    if (player) {
      player.position = data.position
      player.rotation = data.rotation
    }
  }

  private handlePlayerJoined(data: { room: Room; player: Player }) {
    useGameStore.getState().updateRoom(data.room)
  }

  private handlePlayerLeft(data: { room: Room; playerId: string }) {
    useGameStore.getState().updateRoom(data.room)
  }

  on(type: string, handler: MessageHandler) {
    const handlers = this.handlers.get(type) || []
    handlers.push(handler)
    this.handlers.set(type, handlers)
  }

  off(type: string, handler: MessageHandler) {
    const handlers = this.handlers.get(type) || []
    const index = handlers.indexOf(handler)
    if (index > -1) {
      handlers.splice(index, 1)
    }
  }

  send(type: string, data?: unknown) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({ type, data }))
    }
  }

  createRoom(roomName: string, playerName: string, mapId: string = 'classic') {
    this.send('create_room', { roomName, playerName, mapId })
  }

  joinRoom(roomId: string, playerName: string) {
    this.send('join_room', { roomId, playerName })
  }

  leaveRoom() {
    this.send('leave_room')
    useGameStore.getState().setCurrentRoom(null)
  }

  setReady(ready: boolean) {
    this.send('player_ready', { ready })
  }

  switchTeam(team: 'red' | 'blue') {
    this.send('switch_team', { team })
  }

  startGame() {
    this.send('start_game')
  }

  buyWeapon(weaponIndex: number) {
    this.send('buy_weapon', { weaponIndex })
  }

  pickupWeapon(groundWeaponId: string) {
    this.send('pickup_weapon', { groundWeaponId })
  }

  switchWeaponSlot(slot: number) {
    this.send('switch_weapon_slot', { slot })
  }

  sendMove(position: { x: number; y: number; z: number }, rotation: { x: number; y: number }) {
    this.send('move', { position, rotation })
  }

  sendShoot(direction: { x: number; y: number; z: number; damage?: number }) {
    this.send('shoot', { direction })
  }

  sendHit(targetId: string, damage: number) {
    this.send('hit', { targetId, damage })
  }

  disconnect() {
    if (this.ws) {
      this.ws.close()
      this.ws = null
    }
  }
}

export const network = new NetworkManager()
