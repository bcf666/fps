// 单人模式核心战斗逻辑（纯逻辑，不依赖 React）。
// - 机器人数据、AI（巡逻/追击/攻击/搜索）、视线检测、随机刷新
// - 玩家子弹命中机器人 -> applyHit（本地扣血，不走网络）
// - 机器人射击玩家 -> damageLocalPlayer（直接命中 + 曳光事件供 SoloManager 渲染）
// - 击杀计分走 store（killFeed / redKills / blueKills），并通过 bumpRoom 触发 HUD 刷新

import {
  resolvePlayerCollision,
  getGroundHeight,
  checkLineWallIntersection,
  checkSphereWallCollision,
  nearestSafePoint,
  ALL_COLLIDERS,
  PLAYER_RADIUS,
  setCurrentMap,
  MAPS,
} from '../../config/mapConfig'
import { WEAPONS } from '../../config/weapons'
import { useGameStore } from '../../stores/gameStore'
import { localPlayer } from '../../components/game/playerTracker'

const EYE = 1.5
const BOT_RADIUS = 0.35
const DETECT_RANGE = 38        // 敌人察觉玩家的距离（原来是 45，缩小避免过早被围）
const ATTACK_RANGE = 26        // 进入交火的距离（原来是 32）
const PATROL_SPEED = 3.0
const CHASE_SPEED = 4.2        // 追击速度略低于玩家（玩家 5，冲刺 8），给玩家摆脱空间
const RESPAWN_DELAY = 3
const REACT_MIN = 0.7          // 发现目标后到第一枪的反应延迟（拟人，原来仅 0.2~0.7）
const REACT_MAX = 1.4
const BOT_DAMAGE_MULT = 0.45   // 机器人伤害系数（原来接近满额），明显削弱
const LOCAL_ID = 'local_player'

export interface BotShot {
  fromX: number
  fromY: number
  fromZ: number
  toX: number
  toY: number
  toZ: number
}

interface Bot {
  id: string
  name: string
  team: 'red'
  health: number
  isAlive: boolean
  x: number
  y: number // 眼睛高度 ~ 地面 + EYE
  z: number
  yaw: number
  state: 'patrol' | 'chase' | 'attack' | 'search'
  waypoint: { x: number; z: number } | null
  lastKnown: { x: number; z: number } | null
  lostTimer: number
  fireCooldown: number
  reloadTimer: number
  respawnTimer: number
  reactTimer: number
  weaponIndex: number
  ammo: number
  strafeDir: number
  strafeTimer: number
  kills: number
  deaths: number
}

const bots = new Map<string, Bot>()
let localDamageHandler: ((amount: number) => void) | null = null
const botShotHandlers = new Set<(d: BotShot) => void>()
let currentMapId = 'campus'

// ============ 工具函数 ============

function lerpAngle(a: number, b: number, t: number): number {
  let d = b - a
  while (d > Math.PI) d -= Math.PI * 2
  while (d < -Math.PI) d += Math.PI * 2
  return a + d * t
}

function dirToYaw(fx: number, fz: number): number {
  return Math.atan2(-fx, -fz)
}

function pickWeapon(): number {
  const r = Math.random()
  if (r < 0.4) return 1 // AK-47
  if (r < 0.8) return 2 // M4A1
  return 0 // Deagle
}

function randomSafePoint(mapId: string, avoid?: { x: number; z: number } | null): { x: number; z: number } {
  const map = MAPS[mapId] || MAPS.classic
  const half = Math.min((map.mapSize || 100) / 2, 220) - 8
  for (let i = 0; i < 50; i++) {
    const x = (Math.random() * 2 - 1) * half
    const z = (Math.random() * 2 - 1) * half
    if (checkSphereWallCollision(x, 1.5, z, 0.6, ALL_COLLIDERS)) continue
    if (avoid) {
      const d = Math.hypot(x - avoid.x, z - avoid.z)
      if (d < 18) continue
    }
    return { x, z }
  }
  return { x: 0, z: 0 }
}

function checkLOS(bot: Bot, px: number, py: number, pz: number): boolean {
  const by = bot.y - 0.15
  const res = checkLineWallIntersection(bot.x, by, bot.z, px, py, pz, ALL_COLLIDERS)
  return !res.hit
}

function syncBotToRoom(bot: Bot) {
  const room = useGameStore.getState().currentRoom
  if (!room) return
  const p = room.players.find((x) => x.id === bot.id)
  if (!p) return
  p.position.x = bot.x
  p.position.y = bot.y
  p.position.z = bot.z
  p.rotation.x = 0
  p.rotation.y = bot.yaw
  p.health = Math.max(0, Math.round(bot.health))
  p.isAlive = bot.isAlive
  p.kills = bot.kills
  p.deaths = bot.deaths
}

function bumpRoom() {
  const store = useGameStore.getState()
  const room = store.currentRoom
  if (!room) return
  useGameStore.setState({
    currentRoom: {
      ...room,
      redKills: store.redKills,
      blueKills: store.blueKills,
      players: room.players,
    },
  })
}

// ============ 机器人生命周期 ============

function makeBot(i: number): Bot {
  const weaponIndex = pickWeapon()
  return {
    id: `bot_${i}`,
    name: `敌人 ${i + 1}`,
    team: 'red',
    health: 100,
    isAlive: true,
    x: 0,
    y: EYE,
    z: 0,
    yaw: 0,
    state: 'patrol',
    waypoint: null,
    lastKnown: null,
    lostTimer: 0,
    fireCooldown: 0,
    reloadTimer: 0,
    respawnTimer: 0,
    reactTimer: 0,
    weaponIndex,
    ammo: WEAPONS[weaponIndex].magSize,
    strafeDir: Math.random() < 0.5 ? -1 : 1,
    strafeTimer: 0,
    kills: 0,
    deaths: 0,
  }
}

function initBots(count: number, mapId: string) {
  bots.clear()
  const avoid = { x: localPlayer.x, z: localPlayer.z }
  for (let i = 0; i < count; i++) {
    const bot = makeBot(i)
    const sp = randomSafePoint(mapId, avoid)
    bot.x = sp.x
    bot.z = sp.z
    bot.y = getGroundHeight(sp.x, sp.z, 5) + EYE
    bots.set(bot.id, bot)
  }
}

function respawnBot(bot: Bot) {
  const sp = randomSafePoint(currentMapId, { x: localPlayer.x, z: localPlayer.z })
  bot.x = sp.x
  bot.z = sp.z
  bot.y = getGroundHeight(sp.x, sp.z, 5) + EYE
  bot.health = 100
  bot.isAlive = true
  bot.ammo = WEAPONS[bot.weaponIndex].magSize
  bot.state = 'patrol'
  bot.waypoint = null
  bot.lastKnown = null
  bot.lostTimer = 0
  bot.fireCooldown = 0
  bot.reloadTimer = 0
  bot.reactTimer = 0
  syncBotToRoom(bot)
}

function killBot(bot: Bot) {
  bot.health = 0
  bot.isAlive = false
  bot.respawnTimer = RESPAWN_DELAY
  bot.deaths++
  const store = useGameStore.getState()
  store.addKill('你', bot.name, 'blue', 'red')
  const red = store.redKills || 0
  const blue = (store.blueKills || 0) + 1
  store.setTeamScores(red, blue)
  syncBotToRoom(bot)
  bumpRoom()
}

function fireBot(bot: Bot, px: number, py: number, pz: number, dist: number) {
  const w = WEAPONS[bot.weaponIndex]
  const fromX = bot.x
  const fromY = bot.y - 0.15
  const fromZ = bot.z
  // 曳光终点：若中间有墙则截断在墙前
  const wall = checkLineWallIntersection(fromX, fromY, fromZ, px, py, pz, ALL_COLLIDERS)
  const toX = wall.hit ? wall.x : px
  const toY = wall.hit ? wall.y : py
  const toZ = wall.hit ? wall.z : pz
  emitBotShot({ fromX, fromY, fromZ, toX, toY, toZ })

  // 命中概率：远距离明显偏低，近距也不到 0.6，且每次独立随机 → 不会瞬间清空血量
  const hitChance = Math.max(0.15, Math.min(0.6, 0.6 - (dist / ATTACK_RANGE) * 0.5))
  if (Math.random() < hitChance) {
    const dmg = w.damage * (0.45 + Math.random() * 0.25) * BOT_DAMAGE_MULT
    damageLocalPlayer(dmg)
  }
}

// ============ 对外 API ============

export function setupSolo(mapId: string, enemyCount: number, playerName: string) {
  setCurrentMap(mapId)
  currentMapId = mapId
  const store = useGameStore.getState()
  store.setPlayerId(LOCAL_ID)
  if (playerName && playerName.trim()) store.setPlayerName(playerName.trim())

  const map = MAPS[mapId] || MAPS.classic
  const ps = map.spawnPoints.blue[0] || { x: 0, y: 1.5, z: 0 }
  const player = {
    id: LOCAL_ID,
    name: playerName && playerName.trim() ? playerName.trim() : '你',
    team: 'blue' as const,
    position: { x: ps.x, y: ps.y, z: ps.z },
    rotation: { x: 0, y: 0 },
    health: 100,
    isAlive: true,
    kills: 0,
    deaths: 0,
    isReady: true,
    // 单人训练默认携带全套武器（步枪/冲锋枪/狙击/手枪），与 multiplayer 购买后的体验一致
    weapons: [
      { index: 1, permanent: true },
      { index: 2, permanent: true },
      { index: 3, permanent: true },
      { index: 0, permanent: true },
    ],
    currentWeaponSlot: 0,
  }

  const botPlayers = []
  for (let i = 0; i < enemyCount; i++) {
    botPlayers.push({
      id: `bot_${i}`,
      name: `敌人 ${i + 1}`,
      team: 'red' as const,
      position: { x: 0, y: EYE, z: 0 },
      rotation: { x: 0, y: 0 },
      health: 100,
      isAlive: true,
      kills: 0,
      deaths: 0,
      isReady: true,
    })
  }

  const room = {
    id: 'solo_room',
    name: '单人训练',
    mapId,
    hostId: LOCAL_ID,
    players: [player, ...botPlayers],
    status: 'playing' as const,
    maxPlayers: enemyCount + 1,
    gameEndAt: null,
    winner: null,
    redKills: 0,
    blueKills: 0,
  }

  store.setIsSolo(true)
  store.setLocalHealth(100)
  store.setSoloInvuln(false)
  store.setCurrentRoom(room)
  store.setTeamScores(0, 0)
  store.setGameTime(900)
  initBots(enemyCount, mapId)
}

export function clearSolo() {
  bots.clear()
  localDamageHandler = null
  botShotHandlers.clear()
  const store = useGameStore.getState()
  store.setIsSolo(false)
}

export function registerLocalPlayerDamageHandler(fn: ((amount: number) => void) | null) {
  localDamageHandler = fn
}

export function damageLocalPlayer(amount: number) {
  localDamageHandler?.(amount)
}

export function applyHit(targetId: string, damage: number) {
  if (targetId === LOCAL_ID) {
    damageLocalPlayer(damage)
    return
  }
  const bot = bots.get(targetId)
  if (!bot || !bot.isAlive) return
  bot.health -= damage
  if (bot.health <= 0) {
    killBot(bot)
  } else {
    syncBotToRoom(bot)
  }
}

export function onPlayerDeath() {
  const store = useGameStore.getState()
  store.addKill('敌人', '你', 'red', 'blue')
  const red = (store.redKills || 0) + 1
  const blue = store.blueKills || 0
  store.setTeamScores(red, blue)
  bumpRoom()
}

// 玩家重生时调用：让所有存活机器人丢失目标、回到巡逻并清空开火冷却，
// 给玩家喘息空间，避免一露头就被集火导致“已阵亡”画面反复出现。
export function onPlayerRespawn() {
  for (const bot of bots.values()) {
    if (bot.isAlive) {
      bot.state = 'patrol'
      bot.lastKnown = null
      bot.lostTimer = 0
      if (bot.fireCooldown < 1.5) bot.fireCooldown = 1.5
    }
  }
}

export function getRespawnPoint(): { x: number; y: number; z: number } {
  const map = MAPS[currentMapId] || MAPS.classic
  const spawns = map.spawnPoints?.blue || []
  const aliveBots = [...bots.values()].filter((b) => b.isAlive)
  // 选离所有存活敌人最远的己方出生点，避免重生即被集火
  let best: { x: number; z: number } | null = null
  let bestMin = -1
  for (const sp of spawns) {
    let minD = Infinity
    for (const b of aliveBots) {
      const d = Math.hypot(sp.x - b.x, sp.z - b.z)
      if (d < minD) minD = d
    }
    if (minD > bestMin) {
      bestMin = minD
      best = sp
    }
  }
  if (best) {
    const safe = nearestSafePoint(best.x, best.z, PLAYER_RADIUS, EYE, ALL_COLLIDERS, 30)
    return { x: safe.x, y: getGroundHeight(safe.x, safe.z, 5) + EYE, z: safe.z }
  }
  // 兜底：随机安全点（远离玩家最后位置）
  const sp = randomSafePoint(currentMapId, { x: localPlayer.x, z: localPlayer.z })
  const safe = nearestSafePoint(sp.x, sp.z, PLAYER_RADIUS, EYE, ALL_COLLIDERS, 30)
  return { x: safe.x, y: getGroundHeight(safe.x, safe.z, 5) + EYE, z: safe.z }
}

export function onBotShot(handler: (d: BotShot) => void): () => void {
  botShotHandlers.add(handler)
  return () => {
    botShotHandlers.delete(handler)
  }
}

function emitBotShot(d: BotShot) {
  botShotHandlers.forEach((h) => h(d))
}

// ============ 每帧 AI 更新（由 SoloManager 的 useFrame 调用）============

export function updateBots(delta: number) {
  const lp = localPlayer
  if (!lp.active) return
  const store = useGameStore.getState()
  const room = store.currentRoom
  if (!room || room.status !== 'playing') return
  const me = room.players.find((p) => p.id === LOCAL_ID)
  const playerEyeY = me?.position.y ?? EYE

  for (const bot of bots.values()) {
    if (!bot.isAlive) {
      bot.respawnTimer -= delta
      if (bot.respawnTimer <= 0) respawnBot(bot)
      continue
    }

    const dx = lp.x - bot.x
    const dz = lp.z - bot.z
    const dist = Math.hypot(dx, dz)
    const hasLOS = checkLOS(bot, lp.x, playerEyeY, lp.z)

    // 状态机
    if (dist < DETECT_RANGE && hasLOS) {
      bot.lastKnown = { x: lp.x, z: lp.z }
      bot.lostTimer = 0
      if (bot.state === 'patrol' || bot.state === 'search') bot.state = 'chase'
    } else if (bot.state === 'chase' || bot.state === 'attack') {
      bot.lostTimer += delta
      if (bot.lostTimer > 3) bot.state = 'search'
    }

    let dirX = 0
    let dirZ = 0
    let desiredYaw = bot.yaw

    if (bot.state === 'patrol' || bot.state === 'search') {
      if (bot.state === 'search' && bot.lastKnown) {
        const d = Math.hypot(bot.lastKnown.x - bot.x, bot.lastKnown.z - bot.z)
        if (d < 2) {
          bot.lastKnown = null
          bot.state = 'patrol'
        } else {
          dirX = bot.lastKnown.x - bot.x
          dirZ = bot.lastKnown.z - bot.z
        }
      }
      if (bot.state === 'patrol') {
        if (!bot.waypoint || Math.hypot(bot.waypoint.x - bot.x, bot.waypoint.z - bot.z) < 2) {
          bot.waypoint = randomSafePoint(currentMapId, { x: lp.x, z: lp.z })
        }
        const wp = bot.waypoint
        if (wp) {
          dirX = wp.x - bot.x
          dirZ = wp.z - bot.z
        }
      }
      const l = Math.hypot(dirX, dirZ) || 1
      dirX /= l
      dirZ /= l
      desiredYaw = dirToYaw(dirX, dirZ)
    } else if (bot.state === 'chase') {
      if (dist <= ATTACK_RANGE) {
        bot.state = 'attack'
        bot.reactTimer = REACT_MIN + Math.random() * (REACT_MAX - REACT_MIN)
      } else {
        dirX = dx
        dirZ = dz
        const l = Math.hypot(dirX, dirZ) || 1
        dirX /= l
        dirZ /= l
        desiredYaw = dirToYaw(dx, dz)
      }
    } else if (bot.state === 'attack') {
      if (dist > ATTACK_RANGE * 1.1) {
        bot.state = 'chase'
      } else {
        desiredYaw = dirToYaw(dx, dz)
        bot.strafeTimer -= delta
        if (bot.strafeTimer <= 0) {
          bot.strafeDir = Math.random() < 0.5 ? -1 : 1
          bot.strafeTimer = 0.8 + Math.random() * 1.2
        }
        let approach = 0
        if (dist > ATTACK_RANGE * 0.8) approach = 0.5
        else if (dist < ATTACK_RANGE * 0.4) approach = -0.5
        const perpX = -dz
        const perpZ = dx
        dirX = dx * approach + perpX * bot.strafeDir * 0.8
        dirZ = dz * approach + perpZ * bot.strafeDir * 0.8
        const l = Math.hypot(dirX, dirZ) || 1
        dirX /= l
        dirZ /= l
      }
    }

    const speed = bot.state === 'attack' ? CHASE_SPEED * 0.55 : bot.state === 'chase' ? CHASE_SPEED : PATROL_SPEED
    const footY = bot.y - EYE
    const playerY = footY + 0.3
    const nr = resolvePlayerCollision(
      bot.x,
      bot.z,
      bot.x + dirX * speed * delta,
      bot.z + dirZ * speed * delta,
      playerY,
      BOT_RADIUS,
    )
    bot.x = nr.x
    bot.z = nr.z
    bot.y = getGroundHeight(bot.x, bot.z, bot.y + 1) + EYE
    bot.yaw = lerpAngle(bot.yaw, desiredYaw, Math.min(1, delta * (bot.state === 'patrol' ? 4 : 9)))

    // 射击
    if (bot.state === 'attack' && hasLOS && dist < ATTACK_RANGE) {
      if (bot.reactTimer > 0) bot.reactTimer -= delta
      if (bot.fireCooldown > 0) bot.fireCooldown -= delta
      if (bot.reloadTimer > 0) {
        bot.reloadTimer -= delta
        if (bot.reloadTimer <= 0) bot.ammo = WEAPONS[bot.weaponIndex].magSize
      }
      if (bot.reactTimer <= 0 && bot.fireCooldown <= 0 && bot.reloadTimer <= 0 && bot.ammo > 0) {
        fireBot(bot, lp.x, playerEyeY, lp.z, dist)
        bot.ammo--
        const w = WEAPONS[bot.weaponIndex]
        bot.fireCooldown = (60 / w.rpm) * (1.3 + Math.random() * 0.9)
        if (bot.ammo <= 0) bot.reloadTimer = w.reloadTime
      }
    } else {
      if (bot.fireCooldown > 0) bot.fireCooldown -= delta
      if (bot.reloadTimer > 0) {
        bot.reloadTimer -= delta
        if (bot.reloadTimer <= 0) bot.ammo = WEAPONS[bot.weaponIndex].magSize
      }
    }

    syncBotToRoom(bot)
  }
}
