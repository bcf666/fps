export interface WallConfig {
  x: number
  z: number
  w: number
  h: number
  d: number
  y?: number
  color?: string
  // 可选：表示这是一个斜坡（不是 AABB），玩家走上去自动升高
  // 'north'=向z增大方向上升, 'south'=向z减小方向上升, 'east'=向x增大方向上升, 'west'=向x减小方向上升
  ramp?: 'north' | 'south' | 'east' | 'west'
}

export interface DecorationConfig {
  type: 'crate' | 'barrel' | 'pillar' | 'sandbag' | 'box' | 'crateStack' | 'pallet'
  x: number
  z: number
  y?: number
  rotation?: number
}

export interface SpawnPoint {
  x: number
  y: number
  z: number
}

export interface GroundWeaponSpawn {
  x: number
  z: number
  weaponIndex: number
  y?: number
}

export interface MapDef {
  id: string
  name: string
  description: string
  mapSize: number
  walls: WallConfig[]
  decorations: DecorationConfig[]
  spawnPoints: { red: SpawnPoint[]; blue: SpawnPoint[] }
  groundWeaponSpawns: GroundWeaponSpawn[]
}

export const WALLS: WallConfig[] = [
  { x: 0, z: -50, w: 100, h: 5, d: 1, color: '#c9a96e' },
  { x: 0, z: 50, w: 100, h: 5, d: 1, color: '#c9a96e' },
  { x: -50, z: 0, w: 1, h: 5, d: 100, color: '#c9a96e' },
  { x: 50, z: 0, w: 1, h: 5, d: 100, color: '#c9a96e' },

  { x: -40, z: -40, w: 20, h: 4, d: 1, color: '#b8956a' },
  { x: -40, z: -40, w: 1, h: 4, d: 20, color: '#b8956a' },

  { x: -40, z: 40, w: 20, h: 4, d: 1, color: '#a08060' },
  { x: -40, z: 40, w: 1, h: 4, d: 20, color: '#a08060' },

  { x: 40, z: -40, w: 20, h: 4, d: 1, color: '#b8956a' },
  { x: 40, z: -40, w: 1, h: 4, d: 20, color: '#b8956a' },

  { x: 40, z: 40, w: 20, h: 4, d: 1, color: '#a08060' },
  { x: 40, z: 40, w: 1, h: 4, d: 20, color: '#a08060' },

  { x: -30, z: -15, w: 1, h: 3.5, d: 20, color: '#c9a96e' },
  { x: -30, z: 15, w: 1, h: 3.5, d: 20, color: '#c9a96e' },
  { x: -20, z: -5, w: 20, h: 3.5, d: 1, color: '#c9a96e' },
  { x: -20, z: 5, w: 20, h: 3.5, d: 1, color: '#c9a96e' },

  { x: 30, z: -15, w: 1, h: 3.5, d: 20, color: '#c9a96e' },
  { x: 30, z: 15, w: 1, h: 3.5, d: 20, color: '#c9a96e' },
  { x: 20, z: -5, w: 20, h: 3.5, d: 1, color: '#c9a96e' },
  { x: 20, z: 5, w: 20, h: 3.5, d: 1, color: '#c9a96e' },

  { x: 0, z: -30, w: 10, h: 3, d: 1, color: '#8b7355' },
  { x: 0, z: 30, w: 10, h: 3, d: 1, color: '#8b7355' },
  { x: -5, z: -25, w: 1, h: 3, d: 10, color: '#8b7355' },
  { x: 5, z: -25, w: 1, h: 3, d: 10, color: '#8b7355' },
  { x: -5, z: 25, w: 1, h: 3, d: 10, color: '#8b7355' },
  { x: 5, z: 25, w: 1, h: 3, d: 10, color: '#8b7355' },

  { x: -20, z: -28, w: 6, h: 2, d: 1, color: '#9a7b5a' },
  { x: 20, z: -28, w: 6, h: 2, d: 1, color: '#9a7b5a' },
  { x: -20, z: 28, w: 6, h: 2, d: 1, color: '#9a7b5a' },
  { x: 20, z: 28, w: 6, h: 2, d: 1, color: '#9a7b5a' },
]

export const DECORATIONS: DecorationConfig[] = [
  { type: 'crateStack', x: -42, z: -42 },
  { type: 'crate', x: -38, z: -38 },
  { type: 'crate', x: -42, z: -38 },
  { type: 'barrel', x: -35, z: -42 },
  { type: 'barrel', x: -32, z: -38 },
  { type: 'pallet', x: -42, z: -30 },

  { type: 'crateStack', x: 42, z: -42 },
  { type: 'crate', x: 38, z: -38 },
  { type: 'crate', x: 42, z: -38 },
  { type: 'barrel', x: 35, z: -42 },
  { type: 'barrel', x: 32, z: -38 },
  { type: 'pallet', x: 42, z: -30 },

  { type: 'crateStack', x: -42, z: 42 },
  { type: 'crate', x: -38, z: 38 },
  { type: 'crate', x: -42, z: 38 },
  { type: 'barrel', x: -35, z: 42 },
  { type: 'barrel', x: -32, z: 38 },
  { type: 'pallet', x: -42, z: 30 },

  { type: 'crateStack', x: 42, z: 42 },
  { type: 'crate', x: 38, z: 38 },
  { type: 'crate', x: 42, z: 38 },
  { type: 'barrel', x: 35, z: 42 },
  { type: 'barrel', x: 32, z: 38 },
  { type: 'pallet', x: 42, z: 30 },

  { type: 'pillar', x: -12, z: -28 },
  { type: 'pillar', x: -12, z: 0 },
  { type: 'pillar', x: 12, z: -28 },
  { type: 'pillar', x: 12, z: 0 },
  { type: 'pillar', x: -12, z: 28 },
  { type: 'pillar', x: 12, z: 28 },

  { type: 'sandbag', x: -18, z: -12, rotation: 0 },
  { type: 'sandbag', x: -15, z: -12, rotation: 0 },
  { type: 'sandbag', x: -18, z: 12, rotation: Math.PI },
  { type: 'sandbag', x: -15, z: 12, rotation: Math.PI },

  { type: 'sandbag', x: 18, z: -12, rotation: 0 },
  { type: 'sandbag', x: 15, z: -12, rotation: 0 },
  { type: 'sandbag', x: 18, z: 12, rotation: Math.PI },
  { type: 'sandbag', x: 15, z: 12, rotation: Math.PI },

  { type: 'box', x: -27, z: -22 },
  { type: 'box', x: -27, z: -15 },
  { type: 'box', x: -27, z: 15 },
  { type: 'box', x: -27, z: 22 },
  { type: 'box', x: 27, z: -22 },
  { type: 'box', x: 27, z: -15 },
  { type: 'box', x: 27, z: 15 },
  { type: 'box', x: 27, z: 22 },

  { type: 'crate', x: 0, z: -5 },
  { type: 'crate', x: -3, z: -3 },
  { type: 'crate', x: 3, z: -3 },
  { type: 'barrel', x: 0, z: 5 },
  { type: 'barrel', x: -3, z: 3 },
  { type: 'barrel', x: 3, z: 3 },
  { type: 'crateStack', x: -6, z: 0 },
  { type: 'crateStack', x: 6, z: 0 },

  { type: 'crate', x: -45, z: -35 },
  { type: 'crate', x: 45, z: -35 },
  { type: 'crate', x: -45, z: 35 },
  { type: 'crate', x: 45, z: 35 },

  { type: 'sandbag', x: -45, z: -20, rotation: Math.PI / 2 },
  { type: 'sandbag', x: 45, z: -20, rotation: -Math.PI / 2 },
  { type: 'sandbag', x: -45, z: 20, rotation: Math.PI / 2 },
  { type: 'sandbag', x: 45, z: 20, rotation: -Math.PI / 2 },

  { type: 'crateStack', x: -25, z: -22 },
  { type: 'crateStack', x: 25, z: -22 },
  { type: 'crateStack', x: -25, z: 22 },
  { type: 'crateStack', x: 25, z: 22 },
]

export const MAP_SIZE = 100
export const PLAYER_RADIUS = 0.25
export const BULLET_RADIUS = 0.08
export const GRAVITY = 25
export const JUMP_FORCE = 9
export const PLAYER_HEIGHT = 1.5

export function getDecorationCollisions(decorations: DecorationConfig[] = DECORATIONS): WallConfig[] {
  const collisions: WallConfig[] = []
  
  for (const deco of decorations) {
    const { type, x, z, rotation = 0 } = deco
    
    switch (type) {
      case 'crate':
        collisions.push({ x, z, w: 1, h: 1, d: 1, y: 0.5 })
        break
      case 'crateStack':
        collisions.push({ x: x - 0.6, z, w: 1, h: 1, d: 1, y: 0.5 })
        collisions.push({ x: x + 0.6, z, w: 1, h: 1, d: 1, y: 0.5 })
        collisions.push({ x, z, w: 1, h: 1, d: 1, y: 1.5 })
        break
      case 'barrel':
        collisions.push({ x, z, w: 0.9, h: 1.2, d: 0.9, y: 0.6 })
        break
      case 'pillar':
        collisions.push({ x, z, w: 0.8, h: 3, d: 0.8, y: 1.5 })
        break
      case 'sandbag': {
        const cos = Math.cos(rotation)
        const sin = Math.sin(rotation)
        const w = Math.abs(1.2 * cos) + Math.abs(0.6 * sin)
        const d = Math.abs(1.2 * sin) + Math.abs(0.6 * cos)
        collisions.push({ x, z, w, h: 0.4, d, y: 0.2 })
        break
      }
      case 'box':
        collisions.push({ x, z, w: 1.4, h: 1, d: 1, y: 0.5 })
        break
      case 'pallet':
        collisions.push({ x, z, w: 1.6, h: 0.14, d: 1.2, y: 0.07 })
        break
    }
  }
  
  return collisions
}

export const DECO_COLLISIONS = getDecorationCollisions()

// ALL_COLLIDERS 和 CURRENT_RAMPS 是可变的，会根据当前地图通过 setCurrentMap() 切换
export let ALL_COLLIDERS: WallConfig[] = [...WALLS, ...DECO_COLLISIONS]
export let CURRENT_RAMPS: WallConfig[] = []

export function checkPointInWall(
  px: number,
  py: number,
  pz: number,
  walls: WallConfig[] = WALLS
): boolean {
  for (const wall of walls) {
    const halfW = wall.w / 2
    const halfD = wall.d / 2
    const wallY = wall.y ?? wall.h / 2
    const halfH = wall.h / 2
    const minY = wallY - halfH
    const maxY = wallY + halfH
    
    if (
      px > wall.x - halfW &&
      px < wall.x + halfW &&
      py > minY &&
      py < maxY &&
      pz > wall.z - halfD &&
      pz < wall.z + halfD
    ) {
      return true
    }
  }
  return false
}

export function checkSphereWallCollision(
  px: number,
  py: number,
  pz: number,
  radius: number,
  walls: WallConfig[] = WALLS
): boolean {
  for (const wall of walls) {
    if (wall.ramp) continue  // 斜坡不挡玩家
    const halfW = wall.w / 2
    const halfD = wall.d / 2
    const wallY = wall.y ?? wall.h / 2
    const halfH = wall.h / 2
    const minY = wallY - halfH
    const maxY = wallY + halfH

    const closestX = Math.max(wall.x - halfW, Math.min(px, wall.x + halfW))
    const closestY = Math.max(minY, Math.min(py, maxY))
    const closestZ = Math.max(wall.z - halfD, Math.min(pz, wall.z + halfD))

    const dx = px - closestX
    const dy = py - closestY
    const dz = pz - closestZ

    const distanceSq = dx * dx + dy * dy + dz * dz

    if (distanceSq < radius * radius) {
      return true
    }
  }
  return false
}

export function checkLineWallIntersection(
  startX: number,
  startY: number,
  startZ: number,
  endX: number,
  endY: number,
  endZ: number,
  walls: WallConfig[] = WALLS
): { hit: boolean; x: number; y: number; z: number } {
  let closestT = 1.0
  let hitPoint = { x: endX, y: endY, z: endZ }

  for (const wall of walls) {
    if (wall.ramp) continue  // 斜坡不挡子弹
    const halfW = wall.w / 2
    const halfD = wall.d / 2
    const wallY = wall.y ?? wall.h / 2
    const halfH = wall.h / 2
    
    const minX = wall.x - halfW
    const maxX = wall.x + halfW
    const minY = wallY - halfH
    const maxY = wallY + halfH
    const minZ = wall.z - halfD
    const maxZ = wall.z + halfD
    
    let tmin = 0.0
    let tmax = 1.0
    
    const dx = endX - startX
    if (Math.abs(dx) < 1e-8) {
      if (startX < minX || startX > maxX) continue
    } else {
      let t1 = (minX - startX) / dx
      let t2 = (maxX - startX) / dx
      if (t1 > t2) [t1, t2] = [t2, t1]
      tmin = Math.max(tmin, t1)
      tmax = Math.min(tmax, t2)
      if (tmin > tmax) continue
    }
    
    const dy = endY - startY
    if (Math.abs(dy) < 1e-8) {
      if (startY < minY || startY > maxY) continue
    } else {
      let t1 = (minY - startY) / dy
      let t2 = (maxY - startY) / dy
      if (t1 > t2) [t1, t2] = [t2, t1]
      tmin = Math.max(tmin, t1)
      tmax = Math.min(tmax, t2)
      if (tmin > tmax) continue
    }
    
    const dz = endZ - startZ
    if (Math.abs(dz) < 1e-8) {
      if (startZ < minZ || startZ > maxZ) continue
    } else {
      let t1 = (minZ - startZ) / dz
      let t2 = (maxZ - startZ) / dz
      if (t1 > t2) [t1, t2] = [t2, t1]
      tmin = Math.max(tmin, t1)
      tmax = Math.min(tmax, t2)
      if (tmin > tmax) continue
    }
    
    if (tmin >= 0 && tmin <= 1 && tmin < closestT) {
      closestT = tmin
      hitPoint = {
        x: startX + dx * tmin,
        y: startY + dy * tmin,
        z: startZ + dz * tmin,
      }
    }
  }
  
  return {
    hit: closestT < 1.0,
    x: hitPoint.x,
    y: hitPoint.y,
    z: hitPoint.z,
  }
}

export function resolvePlayerCollision(
  oldX: number,
  oldZ: number,
  newX: number,
  newZ: number,
  playerY: number,
  radius: number,
  walls: WallConfig[] = ALL_COLLIDERS
): { x: number; z: number } {
  // 如果新位置不在障碍物内，直接使用
  if (!checkSphereWallCollision(newX, playerY, newZ, radius, walls)) {
    return { x: newX, z: newZ }
  }
  
  // 分裂轴尝试
  if (!checkSphereWallCollision(oldX, playerY, newZ, radius, walls)) {
    return { x: oldX, z: newZ }
  }
  if (!checkSphereWallCollision(newX, playerY, oldZ, radius, walls)) {
    return { x: newX, z: oldZ }
  }
  
  // 尝试对角线退回
  const midX = (oldX + newX) / 2
  const midZ = (oldZ + newZ) / 2
  if (!checkSphereWallCollision(midX, playerY, midZ, radius, walls)) {
    return { x: midX, z: midZ }
  }
  
  // 退回原位
  if (!checkSphereWallCollision(oldX, playerY, oldZ, radius, walls)) {
    return { x: oldX, z: oldZ }
  }
  
  // 径向搜索：从近到远找最近的安全点，保证绝不卡在墙内
  const DIRS = 16
  for (let dist = 0.15; dist <= 12; dist += 0.25) {
    for (let k = 0; k < DIRS; k++) {
      const ang = (k / DIRS) * Math.PI * 2
      const testX = oldX + Math.cos(ang) * dist
      const testZ = oldZ + Math.sin(ang) * dist
      if (!checkSphereWallCollision(testX, playerY, testZ, radius, walls)) {
        return { x: testX, z: testZ }
      }
    }
  }

  return { x: oldX, z: oldZ }
}

// 给定一个可能落在墙内的点，返回其附近最近的安全点（用于出生/重生兜底）
export function nearestSafePoint(
  x: number,
  z: number,
  radius: number = PLAYER_RADIUS,
  playerY: number = 1.5,
  walls: WallConfig[] = ALL_COLLIDERS,
  maxDist: number = 20
): { x: number; z: number } {
  if (!checkSphereWallCollision(x, playerY, z, radius, walls)) return { x, z }
  const DIRS = 24
  for (let dist = 0.2; dist <= maxDist; dist += 0.2) {
    for (let k = 0; k < DIRS; k++) {
      const ang = (k / DIRS) * Math.PI * 2
      const tx = x + Math.cos(ang) * dist
      const tz = z + Math.sin(ang) * dist
      if (!checkSphereWallCollision(tx, playerY, tz, radius, walls)) {
        return { x: tx, z: tz }
      }
    }
  }
  return { x, z }
}

export function getGroundHeight(
  px: number,
  pz: number,
  maxY: number = Infinity,
  walls: WallConfig[] = ALL_COLLIDERS,
  currentFootY: number = -Infinity
): number {
  let groundY = 0

  for (const wall of walls) {
    const halfW = wall.w / 2
    const halfD = wall.d / 2
    const wallY = wall.y ?? wall.h / 2
    const halfH = wall.h / 2

    // 斜坡：根据玩家在斜坡上的位置线性计算Y
    if (wall.ramp) {
      const lowY = wallY - halfH
      const highY = wallY + halfH
      if (
        px > wall.x - halfW - 0.15 &&
        px < wall.x + halfW + 0.15 &&
        pz > wall.z - halfD - 0.15 &&
        pz < wall.z + halfD + 0.15
      ) {
        let t = 0
        if (wall.ramp === 'north') {
          t = (pz - (wall.z - halfD)) / wall.d
        } else if (wall.ramp === 'south') {
          t = ((wall.z + halfD) - pz) / wall.d
        } else if (wall.ramp === 'east') {
          t = (px - (wall.x - halfW)) / wall.w
        } else {
          t = ((wall.x + halfW) - px) / wall.w
        }
        t = Math.max(0, Math.min(1, t))
        const rampY = lowY + (highY - lowY) * t
        if (rampY > groundY) {
          groundY = rampY
        }
      }
      continue
    }

    const topY = wallY + halfH
    if (topY > maxY) continue

    // 悬空平台检测：如果提供了当前脚底高度，墙的底部不能比脚底高太多
    // 否则是悬空的，不能从下方直接迈上去
    if (currentFootY > -Infinity) {
      const bottomY = wallY - halfH
      if (bottomY > currentFootY + 0.1) continue
    }

    if (
      px > wall.x - halfW - 0.15 &&
      px < wall.x + halfW + 0.15 &&
      pz > wall.z - halfD - 0.15 &&
      pz < wall.z + halfD + 0.15 &&
      topY > groundY
    ) {
      groundY = topY
    }
  }

  return groundY
}

export function checkHeadCollision(
  px: number,
  py: number,
  pz: number,
  radius: number,
  walls: WallConfig[] = ALL_COLLIDERS
): boolean {
  for (const wall of walls) {
    const halfW = wall.w / 2
    const halfD = wall.d / 2
    const wallY = wall.y ?? wall.h / 2
    const halfH = wall.h / 2
    const minY = wallY - halfH
    const maxY = wallY + halfH
    
    if (py < minY) continue
    
    const closestX = Math.max(wall.x - halfW, Math.min(px, wall.x + halfW))
    const closestY = Math.max(minY, Math.min(py, maxY))
    const closestZ = Math.max(wall.z - halfD, Math.min(pz, wall.z + halfD))
    
    const dx = px - closestX
    const dy = py - closestY
    const dz = pz - closestZ
    
    const distanceSq = dx * dx + dy * dy + dz * dz
    
    if (distanceSq < radius * radius) {
      return true
    }
  }
  return false
}

export function isPointInsideWall(
  px: number,
  py: number,
  pz: number,
  radius: number = 0.3,
  walls: WallConfig[] = ALL_COLLIDERS
): boolean {
  return checkSphereWallCollision(px, py, pz, radius, walls)
}

export function findSafeSpawn(
  candidates: { x: number; z: number }[],
  radius: number = PLAYER_RADIUS,
  walls: WallConfig[] = ALL_COLLIDERS
): { x: number; z: number } {
  const safe = candidates.find(c => !checkSphereWallCollision(c.x, 1.5, c.z, radius, walls))
  if (safe) return safe
  return { x: 0, z: 0 }
}

export function isDecorationInsideWall(deco: DecorationConfig): boolean {
  const collisions = getDecorationCollisions([deco])
  for (const c of collisions) {
    if (checkSphereWallCollision(c.x, c.y ?? c.h / 2, c.z, 0.1, WALLS)) {
      return true
    }
  }
  return false
}

export function validateDecorations(): { index: number; deco: DecorationConfig }[] {
  const bad: { index: number; deco: DecorationConfig }[] = []
  DECORATIONS.forEach((d, i) => {
    if (isDecorationInsideWall(d)) {
      bad.push({ index: i, deco: d })
    }
  })
  return bad
}

// ============ 多地图定义 ============

function createWindowedWall(
  wall: WallConfig,
  axis: 'x' | 'z',
  windowOffsets: number[] = [-5, 0, 5],
  windowYs: number[] = [2.5, 5.5],
  windowWidth: number = 2.2,
  windowHeight: number = 1.7
): WallConfig[] {
  const centerY = wall.y ?? wall.h / 2
  const bottomY = centerY - wall.h / 2
  const longSize = axis === 'x' ? wall.w : wall.d
  const halfLong = longSize / 2
  const axisCuts = new Set<number>([-halfLong, halfLong])
  const yCuts = new Set<number>([0, wall.h])

  for (const offset of windowOffsets) {
    axisCuts.add(Math.max(-halfLong, offset - windowWidth / 2))
    axisCuts.add(Math.min(halfLong, offset + windowWidth / 2))
  }

  for (const winY of windowYs) {
    yCuts.add(Math.max(0, winY - windowHeight / 2))
    yCuts.add(Math.min(wall.h, winY + windowHeight / 2))
  }

  const axisPoints = [...axisCuts].sort((a, b) => a - b)
  const yPoints = [...yCuts].sort((a, b) => a - b)
  const pieces: WallConfig[] = []

  for (let ai = 0; ai < axisPoints.length - 1; ai++) {
    const a0 = axisPoints[ai]
    const a1 = axisPoints[ai + 1]
    const axisLen = a1 - a0
    if (axisLen <= 0.01) continue

    const axisMid = (a0 + a1) / 2

    for (let yi = 0; yi < yPoints.length - 1; yi++) {
      const y0 = yPoints[yi]
      const y1 = yPoints[yi + 1]
      const pieceH = y1 - y0
      if (pieceH <= 0.01) continue

      const pieceY = bottomY + (y0 + y1) / 2
      const isInsideWindow = windowOffsets.some(offset =>
        axisMid > offset - windowWidth / 2 &&
        axisMid < offset + windowWidth / 2
      ) && windowYs.some(winY =>
        (y0 + y1) / 2 > winY - windowHeight / 2 &&
        (y0 + y1) / 2 < winY + windowHeight / 2
      )

      if (isInsideWindow) continue

      pieces.push({
        ...wall,
        x: axis === 'x' ? wall.x + axisMid : wall.x,
        z: axis === 'z' ? wall.z + axisMid : wall.z,
        y: pieceY,
        w: axis === 'x' ? axisLen : wall.w,
        h: pieceH,
        d: axis === 'z' ? axisLen : wall.d,
      })
    }
  }

  return pieces
}

// 经典地图（原始沙漠地图）
export const CLASSIC_MAP: MapDef = {
  id: 'classic',
  name: '经典沙漠',
  description: '对称沙漠战场，四角建筑与中央掩体',
  mapSize: 100,
  walls: WALLS,
  decorations: DECORATIONS,
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
    { x: -15, z: -20, weaponIndex: 1 },
    { x: 15, z: -20, weaponIndex: 2 },
    { x: -15, z: 20, weaponIndex: 1 },
    { x: 15, z: 20, weaponIndex: 2 },
    { x: 0, z: -15, weaponIndex: 3 },
    { x: 0, z: 15, weaponIndex: 3 },
    { x: -35, z: 0, weaponIndex: 1 },
    { x: 35, z: 0, weaponIndex: 2 },
  ],
}

// 新地图：草地双楼（dust）
// 左楼中心(-35,-35)，右楼中心(35,35)，各16x16，3层结构用斜坡连接
export const DUST_MAP: MapDef = {
  id: 'dust',
  name: '草地双楼',
  description: '开阔草地，两栋三层楼，楼顶刷新狙击枪',
  mapSize: 100,
  walls: [
    // 边界围墙
    { x: 0, z: -50, w: 100, h: 5, d: 1, color: '#5a7a3a' },
    { x: 0, z: 50, w: 100, h: 5, d: 1, color: '#5a7a3a' },
    { x: -50, z: 0, w: 1, h: 5, d: 100, color: '#5a7a3a' },
    { x: 50, z: 0, w: 1, h: 5, d: 100, color: '#5a7a3a' },

    // ===== 左楼 (-35,-35) 16x16，墙高9 =====
    ...createWindowedWall({ x: -35, z: -43, w: 16, h: 9, d: 1, color: '#b0a890' }, 'x'), // 北墙
    ...createWindowedWall({ x: -35, z: -27, w: 16, h: 9, d: 1, color: '#b0a890' }, 'x'), // 南墙
    ...createWindowedWall({ x: -43, z: -35, w: 1, h: 9, d: 16, color: '#b0a890' }, 'z'), // 西墙
    { x: -27, z: -40, w: 1, h: 9, d: 6, color: '#b0a890' }, // 东墙北段（留门）
    { x: -27, z: -30, w: 1, h: 9, d: 6, color: '#b0a890' }, // 东墙南段
    // 左楼楼梯：靠西墙，从南端z=-35(Y=0)升到北端z=-43(Y=8)，宽3m长8m
    { x: -40.5, z: -39, w: 3, h: 8, d: 8, y: 4, color: '#9a9080', ramp: 'south' },
    // 楼梯侧墙（东侧），两端留口：底部进楼梯，顶部出屋顶
    ...createWindowedWall({ x: -38.9, z: -39, w: 0.2, h: 8, d: 5.5, y: 4, color: '#b0a890' }, 'z', [-1], [2.5, 5.5]),
    // 楼梯侧墙（西侧，填充西墙至楼梯间缝隙）
    ...createWindowedWall({ x: -42.4, z: -39, w: 0.2, h: 8, d: 8, y: 4, color: '#b0a890' }, 'z', [-1], [2.5, 5.5]),
    // 左楼屋顶（东侧12m宽，留出西侧楼梯上方空隙 x[-42,-39]）
    { x: -33, z: -35, w: 12, h: 0.2, d: 16, y: 8.1, color: '#7a7060' },
    // 左楼屋顶西缘窄条（靠西墙）
    { x: -42.5, z: -35, w: 1, h: 0.2, d: 16, y: 8.1, color: '#7a7060' },

    // ===== 右楼 (35,35) 16x16，墙高9 =====
    ...createWindowedWall({ x: 35, z: 43, w: 16, h: 9, d: 1, color: '#b0a890' }, 'x'), // 北墙
    ...createWindowedWall({ x: 35, z: 27, w: 16, h: 9, d: 1, color: '#b0a890' }, 'x'), // 南墙
    ...createWindowedWall({ x: 43, z: 35, w: 1, h: 9, d: 16, color: '#b0a890' }, 'z'), // 东墙
    { x: 27, z: 40, w: 1, h: 9, d: 6, color: '#b0a890' }, // 西墙北段（留门）
    { x: 27, z: 30, w: 1, h: 9, d: 6, color: '#b0a890' }, // 西墙南段
    // 右楼楼梯：靠东墙，从南端z=35(Y=0)升到北端z=43(Y=8)，宽3m长8m
    { x: 40.5, z: 39, w: 3, h: 8, d: 8, y: 4, color: '#9a9080', ramp: 'north' },
    // 楼梯侧墙（西侧），两端留口：底部进楼梯，顶部出屋顶
    ...createWindowedWall({ x: 38.9, z: 39, w: 0.2, h: 8, d: 5.5, y: 4, color: '#b0a890' }, 'z', [1], [2.5, 5.5]),
    // 楼梯侧墙（东侧，填充东墙至楼梯间缝隙）
    ...createWindowedWall({ x: 42.4, z: 39, w: 0.2, h: 8, d: 8, y: 4, color: '#b0a890' }, 'z', [1], [2.5, 5.5]),
    // 右楼屋顶（西侧12m宽，留出东侧楼梯上方空隙 x[39,42]）
    { x: 33, z: 35, w: 12, h: 0.2, d: 16, y: 8.1, color: '#7a7060' },
    // 右楼屋顶东缘窄条（靠东墙）
    { x: 42.5, z: 35, w: 1, h: 0.2, d: 16, y: 8.1, color: '#7a7060' },

    // ===== 中央低矮掩体墙 =====
    { x: 0, z: -12, w: 8, h: 1.5, d: 1, color: '#8b7355' },
    { x: 0, z: 12, w: 8, h: 1.5, d: 1, color: '#8b7355' },
    { x: -12, z: 0, w: 1, h: 1.5, d: 8, color: '#8b7355' },
    { x: 12, z: 0, w: 1, h: 1.5, d: 8, color: '#8b7355' },
  ],
  decorations: [
    // 中央箱子群
    { type: 'crateStack', x: 0, z: 0 },
    { type: 'crate', x: -3, z: 3 },
    { type: 'crate', x: 3, z: -3 },
    { type: 'barrel', x: -4, z: -4 },
    { type: 'barrel', x: 4, z: 4 },
    // 路径掩体
    { type: 'crateStack', x: -20, z: 0 },
    { type: 'crateStack', x: 20, z: 0 },
    { type: 'crateStack', x: 0, z: -20 },
    { type: 'crateStack', x: 0, z: 20 },
    { type: 'crate', x: -15, z: -15 },
    { type: 'crate', x: 15, z: 15 },
    { type: 'crate', x: -15, z: 15 },
    { type: 'crate', x: 15, z: -15 },
    { type: 'barrel', x: -10, z: 0 },
    { type: 'barrel', x: 10, z: 0 },
    { type: 'box', x: 0, z: -10 },
    { type: 'box', x: 0, z: 10 },
    { type: 'box', x: -22, z: -10 },
    { type: 'box', x: 22, z: 10 },
    { type: 'pallet', x: -18, z: 18 },
    { type: 'pallet', x: 18, z: -18 },
    // 楼外角落桶
    { type: 'barrel', x: -25, z: -25 },
    { type: 'barrel', x: 25, z: 25 },
    { type: 'crate', x: -25, z: 25 },
    { type: 'crate', x: 25, z: -25 },
  ],
  spawnPoints: {
    // 红队出生在左楼内（地面层，门附近）
    red: [
      { x: -30, y: 1.5, z: -35 },
      { x: -30, y: 1.5, z: -37 },
      { x: -30, y: 1.5, z: -33 },
    ],
    // 蓝队出生在右楼内
    blue: [
      { x: 30, y: 1.5, z: 35 },
      { x: 30, y: 1.5, z: 37 },
      { x: 30, y: 1.5, z: 33 },
    ],
  },
  groundWeaponSpawns: [
    // 中央步枪
    { x: 0, z: -8, weaponIndex: 1 },
    { x: 0, z: 8, weaponIndex: 2 },
    { x: -8, z: 0, weaponIndex: 1 },
    { x: 8, z: 0, weaponIndex: 2 },
    // 路径手枪
    { x: -20, z: -20, weaponIndex: 0 },
    { x: 20, z: 20, weaponIndex: 0 },
    // 楼顶狙击枪
    { x: -38, z: -35, weaponIndex: 3, y: 8.3 },
    { x: 38, z: 35, weaponIndex: 3, y: 8.3 },
  ],
}

// 地图字典
export const MAPS: Record<string, MapDef> = {
  classic: CLASSIC_MAP,
  dust: DUST_MAP,
  campus: {
    id: 'campus',
    name: '校园',
    description: '大型校园场景，包含多栋建筑和树木',
    mapSize: 600,
        walls: [
      { x: 0, z: -190, w: 450, h: 5, d: 1, color: '#5a7a3a' },
      { x: 0, z: 175, w: 450, h: 5, d: 1, color: '#5a7a3a' },
      { x: -225, z: -7.5, w: 1, h: 5, d: 365, color: '#5a7a3a' },
      { x: 225, z: -7.5, w: 1, h: 5, d: 365, color: '#5a7a3a' },
      { x: -80.64, z: 74.82, w: 66.93, h: 0.8, d: 43.15, y: 0.9, color: '#b0a890' },
      { x: -80.54, z: 74.92, w: 66.7, h: 17.04, d: 42.91, y: 9.82, color: '#b0a890' },
      { x: -69.39, z: 83.88, w: 34.8, h: 6, d: 17.88, y: 9.5, color: '#b0a890' },
      { x: -79.53, z: 76.55, w: 64.12, h: 10.15, d: 37.63, y: 7.42, color: '#b0a890' },
      { x: -80.64, z: 75.86, w: 66.9, h: 4.4, d: 41.03, y: 3.5, color: '#b0a890' },
      { x: -80.39, z: 77.32, w: 66.4, h: 10.7, d: 32, y: 7.15, color: '#b0a890' },
      { x: -85.33, z: 77, w: 56.12, h: 10.7, d: 36.74, y: 7.15, color: '#b0a890' },
      { x: -89.4, z: 95.4, w: 2.11, h: 11.59, d: 0, y: 9.59, color: '#b0a890' },
      { x: -49.55, z: 92.82, w: 3.08, h: 6, d: 0, y: 9.5, color: '#b0a890' },
      { x: -91.16, z: 94.44, w: 8.55, h: 15.04, d: 2.73, y: 8.02, color: '#b0a890' },
      { x: -98.27, z: 95.12, w: 14.72, h: 8, d: 3.6, y: 4.5, color: '#b0a890' },
      { x: -80.64, z: 74.43, w: 66.5, h: 7.24, d: 41.93, y: 12.92, color: '#b0a890' },
      { x: -76.25, z: 76.62, w: 59.34, h: 0.5, d: 40.61, y: 0.75, color: '#b0a890' },
      { x: -80.25, z: 75.6, w: 65.67, h: 2.9, d: 33.95, y: 2.35, color: '#b0a890' },
      { x: -100.54, z: 93.32, w: 10.2, h: 4.08, d: 0, y: 3.04, color: '#b0a890' },
      { x: -47.47, z: 72.12, w: 0, h: 6, d: 18.3, y: 9.5, color: '#b0a890' },
      { x: -47.47, z: 92.11, w: 0, h: 6, d: 0.77, y: 9.5, color: '#b0a890' },
      { x: -80.12, z: 76.32, w: 67.08, h: 9.74, d: 40.01, y: 5.37, color: '#b0a890' },
      { x: -80.51, z: 57.41, w: 50.31, h: 0.2, d: 1.45, y: 4.03, color: '#b0a890' },
      { x: -83.36, z: 54.35, w: 52.1, h: 12.4, d: 2.03, y: 7.5, color: '#b0a890' },
      { x: -85.66, z: 74.43, w: 56.85, h: 11.15, d: 42.34, y: 9.92, color: '#b0a890' },
      { x: -85.21, z: 56.94, w: 48.4, h: 12.4, d: 2.11, y: 7.5, color: '#b0a890' },
      { x: -85.66, z: 74.43, w: 56.85, h: 9.35, d: 42.34, y: 9.02, color: '#b0a890' },
      { x: -100.68, z: 96.62, w: 10.48, h: 0.17, d: 0.6, y: 0.75, color: '#b0a890' },
      { x: -93.27, z: 95.65, w: 4.33, h: 12.4, d: 0.1, y: 7.5, color: '#b0a890' },
      { x: -93.17, z: 96.26, w: 4.22, h: 0.2, d: 1.03, y: 1.04, color: '#b0a890' },
      { x: -113.08, z: 93.67, w: 1.82, h: 6.6, d: 3.65, y: 5.2, color: '#b0a890' },
      { x: -100.54, z: 94.82, w: 7.8, h: 1, d: 3, y: 5.58, color: '#b0a890' },
      { x: -80.64, z: 74.82, w: 66.9, h: 7.84, d: 43.11, y: 14.42, color: '#b0a890' },
      { x: -80.39, z: 81.43, w: 66.54, h: 1.38, d: 15.51, y: 9.55, color: '#b0a890' },
      { x: -100.54, z: 94.82, w: 10.2, h: 3.42, d: 3, y: 6.79, color: '#b0a890' },
      { x: -74.21, z: -5.19, w: 82.74, h: 10.13, d: 46.18, y: 5.57, color: '#b0a890' },
      { x: -72.82, z: -5.19, w: 78.39, h: 15.17, d: 45.32, y: 10.15, color: '#b0a890' },
      { x: -70.88, z: -3.96, w: 90.97, h: 22.84, d: 50.2, y: 11.92, color: '#b0a890' },
      { x: -74, z: -5.19, w: 82.3, h: 1.37, d: 46.17, y: 1.19, color: '#b0a890' },
      { x: -74.22, z: -4.49, w: 82.13, h: 16.41, d: 46.99, y: 14.81, color: '#b0a890' },
      { x: -74.85, z: -5.19, w: 75.33, h: 12.47, d: 46.17, y: 12.94, color: '#b0a890' },
      { x: -104.56, z: -5.27, w: 14.91, h: 16.51, d: 21.5, y: 10.92, color: '#b0a890' },
      { x: -74.21, z: -5.19, w: 82.74, h: 2.77, d: 46.18, y: 21.95, color: '#b0a890' },
      { x: -98.96, z: 0.01, w: 33.24, h: 13.69, d: 39.18, y: 13.72, color: '#b0a890' },
      { x: -114.18, z: -23.74, w: 0, h: 4.58, d: 6.14, y: 2.79, color: '#b0a890' },
      { x: -108.51, z: -9.02, w: 14.14, h: 14.32, d: 38.53, y: 14.03, color: '#b0a890' },
      { x: -87.49, z: -4.69, w: 53.38, h: 4.58, d: 44.23, y: 2.79, color: '#b0a890' },
      { x: -110.38, z: -23.93, w: 10.4, h: 4.58, d: 8.7, y: 2.79, color: '#b0a890' },
      { x: -67.04, z: -5.19, w: 66.82, h: 11.61, d: 45.32, y: 12.68, color: '#b0a890' },
      { x: -73.09, z: -5.28, w: 46.46, h: 15.86, d: 24.54, y: 10.5, color: '#b0a890' },
      { x: -45.2, z: -17.45, w: 4.88, h: 3.9, d: 0, y: 3.13, color: '#b0a890' },
      { x: -101.17, z: -0.06, w: 18.07, h: 3.9, d: 34.97, y: 3.12, color: '#b0a890' },
      { x: -80.21, z: -26.84, w: 49.22, h: 10.25, d: 0, y: 13.08, color: '#b0a890' },
      { x: -54.38, z: -17.12, w: 9.86, h: 20.06, d: 0, y: 10.53, color: '#b0a890' },
      { x: -79.81, z: -11.78, w: 75.95, h: 5.51, d: 37.56, y: 3.26, color: '#b0a890' },
      { x: -42, z: -24.34, w: 0, h: 14.2, d: 3.49, y: 10.64, color: '#b0a890' },
      { x: -82.06, z: 7.4, w: 64.4, h: 18.63, d: 9.46, y: 9.81, color: '#b0a890' },
      { x: -73.98, z: -4.86, w: 82.42, h: 23.94, d: 45.5, y: 17.93, color: '#b0a890' },
      { x: -94.73, z: -4.69, w: 45.43, h: 0.82, d: 51.1, y: 0.91, color: '#b0a890' },
      { x: -95.45, z: -4.69, w: 43.99, h: 0.82, d: 51.1, y: 0.91, color: '#b0a890' },
      { x: -96.43, z: 16.5, w: 31.91, h: 4.86, d: 9.42, y: 3.68, color: '#b0a890' },
      { x: -45.87, z: -5.28, w: 7.17, h: 0.67, d: 23.69, y: 0.84, color: '#b0a890' },
      { x: -68.44, z: 6.11, w: 85.22, h: 4.58, d: 26.97, y: 2.79, color: '#b0a890' },
      { x: -72.77, z: 0.71, w: 79.15, h: 4.33, d: 34.23, y: 3.2, color: '#b0a890' },
      { x: -72.77, z: 0.71, w: 78.88, h: 4.1, d: 33.98, y: 3.2, color: '#b0a890' },
      { x: -73.06, z: 0.98, w: 78.47, h: 3.17, d: 33.61, y: 3.2, color: '#b0a890' },
      { x: -77.26, z: 18.59, w: 10.5, h: 2.01, d: 1.37, y: 1.55, color: '#b0a890' },
      { x: -73.99, z: 10.29, w: 82.42, h: 3.64, d: 4.84, y: 9, color: '#b0a890' },
      { x: -110.25, z: 11.95, w: 8.02, h: 18.63, d: 0.34, y: 9.81, color: '#b0a890' },
      { x: -69.5, z: 0.31, w: 50.11, h: 4.58, d: 13.37, y: 2.79, color: '#b0a890' },
      { x: -78.59, z: -5.45, w: 31.93, h: 2.49, d: 19.7, y: 8.1, color: '#b0a890' },
      { x: -78.59, z: -5.45, w: 30.62, h: 3.12, d: 19.7, y: 3.27, color: '#b0a890' },
      { x: -176.52, z: -51.15, w: 104.5, h: 2.78, d: 31.23, y: 1.95, color: '#b0a890' },
      { x: -176.53, z: -51.15, w: 104.92, h: 1.25, d: 31.62, y: 1.12, color: '#b0a890' },
      { x: -176.53, z: -51.15, w: 104.92, h: 1.18, d: 31.62, y: 1.16, color: '#b0a890' },
      { x: -176.53, z: -51.15, w: 104.92, h: 1.25, d: 31.62, y: 1.12, color: '#b0a890' },
      { x: -176.53, z: -59.34, w: 92.4, h: 20.79, d: 36.1, y: 12.14, color: '#b0a890' },
      { x: -176.53, z: -59.34, w: 91.58, h: 20.45, d: 36.59, y: 11.97, color: '#b0a890' },
      { x: -176.53, z: -59.34, w: 94.26, h: 23.25, d: 37.83, y: 12.12, color: '#b0a890' },
      { x: -176.53, z: -59.34, w: 94.26, h: 1.27, d: 37.83, y: 1.14, color: '#b0a890' },
      { x: -176.53, z: -59.34, w: 94.26, h: 22, d: 37.83, y: 12.75, color: '#b0a890' },
      { x: -176.53, z: -59.39, w: 90.66, h: 23.84, d: 35.92, y: 13.67, color: '#b0a890' },
      { x: -176.53, z: -41.44, w: 69.22, h: 19.45, d: 0.03, y: 12.46, color: '#b0a890' },
      { x: -176.53, z: -54.14, w: 92.4, h: 3.29, d: 24.49, y: 3.39, color: '#b0a890' },
      { x: -176.53, z: -59.34, w: 92.4, h: 1.35, d: 14.09, y: 4.9, color: '#b0a890' },
      { x: -176.53, z: -59.24, w: 93.99, h: 10.21, d: 38.12, y: 23.14, color: '#b0a890' },
      { x: -176.53, z: -59.34, w: 92.78, h: 7.51, d: 36.35, y: 22.65, color: '#b0a890' },
      { x: -176.53, z: -59.25, w: 91.89, h: 24.65, d: 35.58, y: 14.07, color: '#b0a890' },
      { x: -176.53, z: -44.48, w: 71.41, h: 3.8, d: 0.15, y: 3.65, color: '#b0a890' },
      { x: -176.56, z: -59.29, w: 92.93, h: 26.07, d: 37, y: 13.54, color: '#b0a890' },
      { x: -176.53, z: -42.91, w: 71.41, h: 2.54, d: 2.89, y: 4.28, color: '#b0a890' },
      { x: -176.52, z: -47.2, w: 94.28, h: 1.11, d: 1.16, y: 8.32, color: '#b0a890' },
      { x: -176.53, z: -59.24, w: 93.99, h: 1.68, d: 38.12, y: 27.4, color: '#b0a890' },
      { x: -176.65, z: -46.93, w: 89.11, h: 2.18, d: 7.97, y: 24.5, color: '#b0a890' },
      { x: -119.73, z: -129.23, w: 63.05, h: 0.8, d: 51.37, y: 0.9, color: '#b0a890' },
      { x: -119.73, z: -128.92, w: 63.05, h: 16.92, d: 54.45, y: 9.76, color: '#b0a890' },
      { x: -118.57, z: -127.98, w: 62.97, h: 16.95, d: 56.34, y: 8.98, color: '#b0a890' },
      { x: -119.34, z: -128.92, w: 63.83, h: 17.92, d: 54.45, y: 10.26, color: '#b0a890' },
      { x: -97.65, z: -108.39, w: 18.48, h: 2.37, d: 9.27, y: 2.14, color: '#b0a890' },
      { x: -119.64, z: -128.92, w: 62.48, h: 15.02, d: 54.05, y: 9.51, color: '#b0a890' },
      { x: -100.08, z: -102.5, w: 21.3, h: 11.6, d: 0, y: 11.22, color: '#b0a890' },
      { x: -105.94, z: -102.07, w: 5.62, h: 3.2, d: 3.36, y: 2.7, color: '#b0a890' },
      { x: -119.1, z: -129.23, w: 61.78, h: 12.77, d: 51.37, y: 10.73, color: '#b0a890' },
      { x: -229.83, z: -128.6, w: 63.05, h: 0.8, d: 52.62, y: 0.9, color: '#b0a890' },
      { x: -229.83, z: -128.92, w: 63.05, h: 16.92, d: 54.45, y: 9.76, color: '#b0a890' },
      { x: -231.37, z: -128.44, w: 63.74, h: 16.77, d: 55.4, y: 8.89, color: '#b0a890' },
      { x: -230.22, z: -128.92, w: 63.83, h: 16.17, d: 54.45, y: 11.13, color: '#b0a890' },
      { x: -230.54, z: -129.23, w: 61.22, h: 2.82, d: 50.97, y: 1.91, color: '#b0a890' },
      { x: -243.45, z: -101.98, w: 6.11, h: 0.3, d: 3.13, y: 0.8, color: '#b0a890' },
      { x: -243.45, z: -101.98, w: 6.11, h: 0.45, d: 3.13, y: 0.73, color: '#b0a890' },
      { x: -229.91, z: -128.92, w: 62.48, h: 15.23, d: 54.05, y: 9.41, color: '#b0a890' },
      { x: -230.46, z: -129.23, w: 61.78, h: 12.77, d: 51.37, y: 10.73, color: '#b0a890' },
      { x: -243.47, z: -102.09, w: 5.66, h: 3.2, d: 3.31, y: 2.7, color: '#b0a890' },
      { x: -174.78, z: -145.76, w: 47.04, h: 0.8, d: 20.83, y: 0.9, color: '#b0a890' },
      { x: -174.78, z: -145.88, w: 47.04, h: 31.93, d: 23.01, y: 16.47, color: '#b0a890' },
      { x: -174.78, z: -145.67, w: 47.04, h: 34.43, d: 21.01, y: 18.52, color: '#b0a890' },
      { x: -174.78, z: -145.77, w: 46.64, h: 32.09, d: 20.81, y: 17.93, color: '#b0a890' },
      { x: -174.78, z: -145.88, w: 47.44, h: 34.1, d: 23.41, y: 18.68, color: '#b0a890' },
      { x: -174.78, z: -145.68, w: 46.85, h: 3.86, d: 20.79, y: 33.3, color: '#b0a890' },
      { x: -180.57, z: -151.11, w: 34.14, h: 33.73, d: 9.72, y: 17.37, color: '#b0a890' },
      { x: -174.78, z: -144.78, w: 47.04, h: 16.45, d: 25, y: 8.72, color: '#b0a890' },
      { x: -174.78, z: -155.41, w: 27.86, h: 1.3, d: 1, y: 1.15, color: '#b0a890' },
      { x: -174.78, z: -136.77, w: 3.05, h: 4.6, d: 0, y: 3.2, color: '#b0a890' },
      { x: -174.78, z: -157.28, w: 4.88, h: 4.6, d: 0, y: 3.2, color: '#b0a890' },
      { x: -174.78, z: -135.67, w: 4.88, h: 4.6, d: 2.2, y: 3.2, color: '#b0a890' },
      { x: -174.78, z: -135.54, w: 26.44, h: 28.1, d: 0, y: 16.17, color: '#b0a890' },
      { x: -174.78, z: -146.76, w: 8.54, h: 8.58, d: 8.58, y: 36.2, color: '#b0a890' },
      { x: -174.78, z: -146.76, w: 8.54, h: 8.58, d: 8.58, y: 36.2, color: '#b0a890' },
      { x: -100.85, z: -154.83, w: 31.03, h: 1.8, d: 21, y: 1.4, color: '#b0a890' },
      { x: -109.25, z: -159.45, w: 46.64, h: 36.12, d: 28.92, y: 18.56, color: '#b0a890' },
      { x: -109.4, z: -159.07, w: 46.34, h: 2.37, d: 29.68, y: 1.68, color: '#b0a890' },
      { x: -87.93, z: -160.18, w: 1, h: 2.16, d: 5.55, y: 2.19, color: '#b0a890' },
      { x: -105.79, z: -160.18, w: 36.01, h: 32.1, d: 27.06, y: 16.95, color: '#b0a890' },
      { x: -120.73, z: -164.68, w: 6.43, h: 31.68, d: 4.45, y: 17.16, color: '#b0a890' },
      { x: -109.4, z: -160.18, w: 46.34, h: 28.4, d: 27.46, y: 19.2, color: '#b0a890' },
      { x: -87.93, z: -160.18, w: 1, h: 28.98, d: 8.69, y: 18.91, color: '#b0a890' },
      { x: -102.78, z: -160.17, w: 30, h: 30.52, d: 26.81, y: 17.74, color: '#b0a890' },
      { x: -104.39, z: -160.18, w: 36.9, h: 34.68, d: 27.46, y: 18.66, color: '#b0a890' },
      { x: -121.73, z: -173.58, w: 1.44, h: 30.52, d: 0, y: 17.74, color: '#b0a890' },
      { x: -111.27, z: -153.35, w: 8.1, h: 2.5, d: 8.42, y: 3.55, color: '#b0a890' },
      { x: -120.73, z: -164.68, w: 6.43, h: 29.74, d: 4.45, y: 18.13, color: '#b0a890' },
      { x: -115.88, z: -162.33, w: 13.53, h: 29.74, d: 13.2, y: 18.13, color: '#b0a890' },
      { x: -120.21, z: -160.77, w: 5.57, h: 2.13, d: 16.32, y: 1.56, color: '#b0a890' },
      { x: -108.76, z: -160.18, w: 43.06, h: 2, d: 25.46, y: 35.12, color: '#b0a890' },
      { x: -118.3, z: -161.66, w: 1.26, h: 3.5, d: 0, y: 31.25, color: '#b0a890' },
      { x: -100.85, z: -154.83, w: 31.03, h: 1.8, d: 21, y: 1.4, color: '#b0a890' },
      { x: -109.4, z: -160.18, w: 46.34, h: 1.23, d: 27.46, y: 36.01, color: '#b0a890' },
      { x: -113.06, z: -152.79, w: 0.65, h: 0.91, d: 0.7, y: 5.76, color: '#b0a890' },
      { x: -114.25, z: -153.03, w: 14.07, h: 6.26, d: 17.66, y: 3.63, color: '#b0a890' },
      { x: -116.89, z: -150.98, w: 0.54, h: 1.65, d: 13.16, y: 1.75, color: '#b0a890' },
      { x: -105.28, z: -158.51, w: 35.91, h: 2.13, d: 12.05, y: 1.61, color: '#b0a890' },
      { x: -271.34, z: -168.38, w: 67.8, h: 1.53, d: 26.9, y: 1.26, color: '#b0a890' },
      { x: -268.41, z: -166.82, w: 59.7, h: 4.8, d: 28.02, y: 2.9, color: '#b0a890' },
      { x: -271.3, z: -166.83, w: 64.88, h: 35.8, d: 28, y: 18.4, color: '#b0a890' },
      { x: -240.21, z: -159.88, w: 2.7, h: 4.51, d: 0, y: 2.75, color: '#b0a890' },
      { x: -270.59, z: -169.71, w: 66.3, h: 35.6, d: 22.25, y: 19.2, color: '#b0a890' },
      { x: -270.59, z: -166.83, w: 65.2, h: 35, d: 28, y: 18, color: '#b0a890' },
      { x: -270.59, z: -169.71, w: 63.6, h: 33.5, d: 2.05, y: 18.75, color: '#b0a890' },
      { x: -270.59, z: -169.71, w: 66.3, h: 28.5, d: 22.25, y: 19.25, color: '#b0a890' },
      { x: -270.59, z: -179.43, w: 39.15, h: 31.07, d: 0, y: 17.56, color: '#b0a890' },
      { x: -270.59, z: -169.7, w: 63.45, h: 30.53, d: 21.63, y: 17.84, color: '#b0a890' },
      { x: -270.59, z: -159.98, w: 6.75, h: 26.81, d: 0, y: 19.49, color: '#b0a890' },
      { x: -302.39, z: -169.73, w: 0, h: 3, d: 2, y: 3.5, color: '#b0a890' },
      { x: -285.94, z: -162.16, w: 38.6, h: 2.07, d: 17.95, y: 1.53, color: '#b0a890' },
      { x: -285.94, z: -160.76, w: 38.6, h: 2.07, d: 15.15, y: 1.53, color: '#b0a890' },
      { x: -270.37, z: -169.67, w: 56.51, h: 4.57, d: 24.32, y: 3.22, color: '#b0a890' },
      { x: -270.59, z: -169.71, w: 66.3, h: 1.5, d: 22.25, y: 36.25, color: '#b0a890' },
      { x: -270.59, z: -169.71, w: 65.3, h: 2.5, d: 21.25, y: 35.25, color: '#b0a890' },
      { x: -271.13, z: -165.51, w: 36.67, h: 33.73, d: 10.75, y: 19.43, color: '#b0a890' },
      { x: -43.77, z: -131.58, w: 62, h: 0.9, d: 61.09, y: 0.95, color: '#b0a890' },
      { x: -45.34, z: -132.36, w: 63.04, h: 4.41, d: 23.09, y: 2.7, color: '#b0a890' },
      { x: -43.77, z: -131.96, w: 62, h: 17.23, d: 60.34, y: 9.12, color: '#b0a890' },
      { x: -43.77, z: -131.08, w: 62, h: 13.64, d: 62.1, y: 11.53, color: '#b0a890' },
      { x: -68.87, z: -101.55, w: 11.4, h: 0.65, d: 3, y: 4.46, color: '#b0a890' },
      { x: -44.24, z: -132.49, w: 60.65, h: 3.08, d: 58.88, y: 2.04, color: '#b0a890' },
      { x: -68.87, z: -103.15, w: 11.4, h: 3.72, d: 0.2, y: 2.36, color: '#b0a890' },
      { x: -44.82, z: -131.07, w: 64.12, h: 14.91, d: 62.11, y: 8.86, color: '#b0a890' },
      { x: -43.62, z: -131.5, w: 53.5, h: 10.41, d: 60.45, y: 7, color: '#b0a890' },
      { x: -43.7, z: -131.6, w: 62.05, h: 12.46, d: 61.13, y: 6.73, color: '#b0a890' },
      { x: -36.43, z: -162.03, w: 3.13, h: 10.8, d: 0.2, y: 6.56, color: '#b0a890' },
      { x: -43.62, z: -132.59, w: 59.41, h: 12.88, d: 58.68, y: 9.46, color: '#b0a890' },
      { x: -32.52, z: -135.94, w: 25.28, h: 5.27, d: 51.58, y: 5.59, color: '#b0a890' },
      { x: -43.72, z: -131.58, w: 60.9, h: 8.63, d: 60.09, y: 13.12, color: '#b0a890' },
      { x: -58, z: -161.93, w: 1.83, h: 7.65, d: 0, y: 8.78, color: '#b0a890' },
      { x: -43.67, z: -136.42, w: 61.4, h: 14.11, d: 50.62, y: 8.85, color: '#b0a890' },
      { x: -66.99, z: -161.73, w: 7.59, h: 14.11, d: 0, y: 8.85, color: '#b0a890' },
      { x: -74.57, z: -136.18, w: 0, h: 3.14, d: 4.01, y: 2.64, color: '#b0a890' },
      { x: -75.44, z: -136.29, w: 2.26, h: 19.72, d: 15.23, y: 10.36, color: '#b0a890' },
      { x: -44.81, z: -135.55, w: 63.82, h: 16.77, d: 58.56, y: 11.84, color: '#b0a890' },
      { x: -76.44, z: -136.17, w: 0.26, h: 11, d: 7.42, y: 10.4, color: '#b0a890' },
      { x: -28, z: -128.83, w: 27.39, h: 2.3, d: 37.41, y: 11.05, color: '#b0a890' },
      { x: -43.67, z: -133.5, w: 61.4, h: 10.8, d: 46.06, y: 6.8, color: '#b0a890' },
      { x: -57.86, z: -162.94, w: 2.79, h: 3.26, d: 1.63, y: 2.13, color: '#b0a890' },
      { x: -66.77, z: -101.79, w: 6.2, h: 0.55, d: 2.92, y: 0.78, color: '#b0a890' },
      { x: -45.12, z: -132.69, w: 64.7, h: 3.72, d: 64.85, y: 2.36, color: '#b0a890' },
      { x: -45.12, z: -136.85, w: 64.7, h: 0.66, d: 56.14, y: 0.83, color: '#b0a890' },
      { x: -43.77, z: -132.59, w: 62, h: 4.65, d: 59.08, y: 16.02, color: '#b0a890' },
      { x: -46.51, z: -128.98, w: 1.48, h: 3.7, d: 7.3, y: 14.05, color: '#b0a890' },
      { x: -38.44, z: -163.52, w: 7.14, h: 8.53, d: 3.19, y: 4.76, color: '#b0a890' },
      { x: -45.58, z: -120.84, w: 58.01, h: 0.65, d: 35.66, y: 3.23, color: '#b0a890' },
      { x: -45.69, z: -128.73, w: 57.75, h: 14.11, d: 29.37, y: 8.85, color: '#b0a890' },
      { x: -0.43, z: -117.41, w: 132.42, h: 1.68, d: 101.43, y: -0.34, color: '#b0a890' },
      { x: -0.37, z: -117.4, w: 128.8, h: 1.32, d: 97.93, y: -1.83, color: '#b0a890' },
      { x: -0.37, z: -117.41, w: 129.86, h: 0.8, d: 98.99, y: 1, color: '#b0a890' },
      { x: -2.39, z: 158.64, w: 19.55, h: 3.25, d: 15.13, y: 2.13, color: '#b0a890' },
      { x: -2.39, z: 158.64, w: 19.95, h: 0.2, d: 15.53, y: 3.75, color: '#b0a890' },
      { x: -5.87, z: 154.83, w: 13.39, h: 0.3, d: 8.3, y: 0.65, color: '#b0a890' },
      { x: -5.64, z: 155.05, w: 12.84, h: 2.4, d: 7.75, y: 2, color: '#b0a890' },
      { x: -6.65, z: 158.64, w: 10.82, h: 1.55, d: 14.93, y: 2.43, color: '#b0a890' },
      { x: 0.94, z: 158.09, w: 12.69, h: 1.15, d: 13.83, y: 2.62, color: '#b0a890' },
      { x: 11.51, z: 148.52, w: 3.28, h: 0.66, d: 40.2, y: 3.29, color: '#b0a890' },
      { x: 11.5, z: 148.52, w: 3.16, h: 2.53, d: 40.15, y: 1.76, color: '#b0a890' },
      { x: -2.44, z: 37.75, w: 4.33, h: 0.58, d: 6, y: 0.79, color: '#b0a890' },
      { x: -2.44, z: 37.75, w: 0.08, h: 13.45, d: 2.82, y: 7.8, color: '#b0a890' },
      { x: -92.8, z: 111.54, w: 10.8, h: 0.23, d: 2.28, y: 0.74, color: '#b0a890' },
      { x: -92.8, z: 111.54, w: 10.8, h: 0.35, d: 2.28, y: 0.68, color: '#b0a890' },
      { x: -118.58, z: -55.07, w: 0.69, h: 2.08, d: 24.92, y: 1.54, color: '#b0a890' },
      { x: -85.4, z: -53.54, w: 0.69, h: 2.08, d: 15.96, y: 1.54, color: '#b0a890' },
      { x: -171.45, z: -113.34, w: 10.9, h: 3.55, d: 0.55, y: 2.68, color: '#b0a890' },
      { x: -174.24, z: -113.34, w: 0.76, h: 0.64, d: 0.57, y: 1.35, color: '#b0a890' },
      { x: -232.31, z: -173.15, w: 4.79, h: 0.2, d: 5.57, y: 2.92, color: '#b0a890' },
      { x: -232.31, z: -173.15, w: 4.39, h: 2.32, d: 5.17, y: 1.66, color: '#b0a890' },
      { x: -231.61, z: -173.63, w: 2.99, h: 2.32, d: 4.22, y: 1.66, color: '#b0a890' },
      { x: -232.31, z: -173.15, w: 4.39, h: 2.32, d: 5.17, y: 1.66, color: '#b0a890' },
      { x: -219.79, z: -173.91, w: 14.7, h: 0.2, d: 11.05, y: 6.6, color: '#b0a890' },
      { x: -219.79, z: -174.23, w: 14.1, h: 6, d: 9.8, y: 3.5, color: '#b0a890' },
      { x: -219.79, z: -174.23, w: 10.1, h: 1.58, d: 9.8, y: 2.52, color: '#b0a890' },
      { x: -193.81, z: -174.93, w: 30.6, h: 1.17, d: 8.98, y: 5.02, color: '#b0a890' },
      { x: -193.81, z: -174.93, w: 30, h: 0.8, d: 8.4, y: 0.9, color: '#b0a890' },
      { x: -193.81, z: -174.93, w: 28.74, h: 1.9, d: 8.2, y: 2.85, color: '#b0a890' },
      { x: -193.81, z: -174.93, w: 30, h: 4.2, d: 8.4, y: 3.4, color: '#b0a890' },
      { x: -193.21, z: -170.3, w: 22.27, h: 0.45, d: 1.06, y: 0.73, color: '#b0a890' },
      { x: -70.43, z: -180.09, w: 8.93, h: 0.76, d: 8.88, y: 3.25, color: '#b0a890' },
      { x: -70.43, z: -180.09, w: 8.32, h: 0.8, d: 8.28, y: 0.9, color: '#b0a890' },
      { x: -70.43, z: -180.09, w: 8.32, h: 2.23, d: 8.28, y: 2.41, color: '#b0a890' },
      { x: 22.24, z: -171.52, w: 4.56, h: 3.15, d: 4.05, y: 2.08, color: '#b0a890' },
      { x: 21.98, z: -171.77, w: 4.05, h: 1.15, d: 3.55, y: 2.62, color: '#b0a890' },
      { x: 22.24, z: -171.77, w: 4.76, h: 3.25, d: 3.75, y: 2.13, color: '#b0a890' },
      { x: 22.24, z: -171.77, w: 5.48, h: 0.2, d: 4.41, y: 3.75, color: '#b0a890' },
      { x: 35.31, z: -173.1, w: 18.9, h: 0.45, d: 7.1, y: 3.23, color: '#b0a890' },
      { x: 35.31, z: -173.1, w: 18.5, h: 2.31, d: 6.7, y: 1.86, color: '#b0a890' },
      { x: 35.31, z: -173.1, w: 10.73, h: 0.49, d: 6.7, y: 2.45, color: '#b0a890' },
      { x: 35.31, z: -173.1, w: 18.5, h: 0.32, d: 6.7, y: 3.17, color: '#b0a890' },
      { x: 35.31, z: -173.1, w: 18.5, h: 0.2, d: 6.7, y: 0.6, color: '#b0a890' },
      { x: 91.17, z: -173.21, w: 30, h: 0.15, d: 6.2, y: 0.57, color: '#b0a890' },
      { x: 91.17, z: -173.21, w: 30.4, h: 0.31, d: 6.6, y: 3.45, color: '#b0a890' },
      { x: 91.17, z: -173.21, w: 30, h: 2.85, d: 6.2, y: 2.08, color: '#b0a890' },
      { x: 94.71, z: -132.37, w: 30.8, h: 1.18, d: 10.78, y: 6.92, color: '#b0a890' },
      { x: 94.71, z: -131.98, w: 30, h: 0.3, d: 10.77, y: 0.65, color: '#b0a890' },
      { x: 94.71, z: -132.37, w: 30, h: 5.61, d: 10, y: 3.6, color: '#b0a890' },
      { x: 94.71, z: -132.37, w: 30, h: 6.61, d: 10, y: 4.1, color: '#b0a890' },
      { x: 94.71, z: -132.37, w: 28.96, h: 1.82, d: 10, y: 2.68, color: '#b0a890' },
      { x: 136.54, z: -132.29, w: 41.8, h: 1.18, d: 10.78, y: 5.01, color: '#b0a890' },
      { x: 136.54, z: -131.83, w: 41, h: 0.3, d: 10.9, y: 0.65, color: '#b0a890' },
      { x: 136.54, z: -132.29, w: 41, h: 3.73, d: 10, y: 2.67, color: '#b0a890' },
      { x: 136.54, z: -132.29, w: 41, h: 4.7, d: 10, y: 3.15, color: '#b0a890' },
      { x: 135.93, z: -132.29, w: 39.77, h: 1.82, d: 10, y: 2.68, color: '#b0a890' },
      { x: -77.23, z: 61.71, w: 21.62, h: 0.8, d: 9.83, y: 0.9, color: '#b0a890' },
      { x: -77.48, z: 61.72, w: 22.08, h: 3.42, d: 10.52, y: 5.71, color: '#b0a890' },
      { x: -77.23, z: 61.72, w: 21.58, h: 3.67, d: 9.78, y: 2.84, color: '#b0a890' },
      { x: -76.7, z: 61.69, w: 16.64, h: 1.5, d: 9.73, y: 3.38, color: '#b0a890' },
      { x: -78.53, z: 59.82, w: 18.68, h: 2.89, d: 5.69, y: 2.35, color: '#b0a890' },
      { x: -82.18, z: 61.72, w: 8.28, h: 1, d: 9.58, y: 3.63, color: '#b0a890' },
      { x: -77.14, z: 65.29, w: 26, h: 3.63, d: 19.33, y: 2.31, color: '#b0a890' },
      { x: -70.82, z: 55.93, w: 3.35, h: 0.5, d: 0.6, y: 0.75, color: '#b0a890' },
      { x: -77.23, z: 61.9, w: 21.75, h: 3.33, d: 11.07, y: 5.86, color: '#b0a890' },
      { x: -79.74, z: 59.73, w: 16.29, h: 0.31, d: 5.53, y: 2.78, color: '#b0a890' },
      { x: -80.41, z: 58.63, w: 15.24, h: 0.52, d: 3.64, y: 2.89, color: '#b0a890' },
      { x: -77.14, z: 65.29, w: 25.61, h: 0.35, d: 18.93, y: 0.77, color: '#b0a890' },
      { x: -81.64, z: 67.98, w: 3.82, h: 2.31, d: 2.24, y: 1.76, color: '#b0a890' },
      { x: -81.64, z: 67.98, w: 4.02, h: 0.28, d: 2.44, y: 3.05, color: '#b0a890' },
      { x: -199.62, z: -9.71, w: 11.56, h: 1.35, d: 10.73, y: 3.78, color: '#b0a890' },
      { x: -199.62, z: -7.93, w: 10.95, h: 2.7, d: 6.41, y: 1.85, color: '#b0a890' },
      { x: -199.62, z: -8.21, w: 5.77, h: 1.03, d: 4.91, y: 2.22, color: '#b0a890' },
      { x: -199.62, z: -9.99, w: 5.77, h: 3.36, d: 9.5, y: 2.18, color: '#b0a890' },
      { x: -199.62, z: -8.29, w: 5.77, h: 2.41, d: 1.39, y: 1.7, color: '#b0a890' },
      { x: -126.64, z: 165.3, w: 12.21, h: 2.83, d: 6.32, y: 2.09, color: '#b0a890' },
      { x: -126.64, z: 165.3, w: 12.21, h: 3.01, d: 6.32, y: 2.01, color: '#b0a890' },
      { x: 115.58, z: 119.15, w: 8, h: 0.71, d: 4.32, y: 2.62, color: '#b0a890' },
      { x: 115.58, z: 119.15, w: 7.8, h: 2.42, d: 4.12, y: 1.71, color: '#b0a890' },
      { x: 76.08, z: -26.02, w: 4.07, h: 1.24, d: 2.97, y: 1.2, color: '#b0a890' },
      { x: -133.97, z: -13.78, w: 1.49, h: 4.06, d: 3.57, y: 2.53, color: '#b0a890' },
      { x: -133.97, z: -13.78, w: 1.49, h: 0.41, d: 3.35, y: 4.36, color: '#b0a890' },
      { x: -164.98, z: -10.96, w: 62.07, h: 1.6, d: 28.26, y: 1.3, color: '#b0a890' },
      { x: -135.58, z: -182.58, w: 6, h: 1.23, d: 7.69, y: 4.83, color: '#b0a890' },
      { x: -135.78, z: -182.58, w: 4.19, h: 0.76, d: 6.27, y: 0.91, color: '#b0a890' },
      { x: -135.58, z: -182.58, w: 6, h: 3.69, d: 7.69, y: 2.37, color: '#b0a890' },
      { x: -135.58, z: -182.58, w: 6, h: 3.56, d: 7.69, y: 2.3, color: '#b0a890' },
      { x: -135.78, z: -182.58, w: 4.19, h: 2.8, d: 6.27, y: 2.68, color: '#b0a890' },
      { x: -130.44, z: -189.26, w: 4.29, h: 4.02, d: 9.4, y: 2.54, color: '#b0a890' },
      { x: -129.26, z: -187.97, w: 1.93, h: 2.73, d: 1.94, y: 1.89, color: '#b0a890' },
      { x: -129.26, z: -187.97, w: 2.15, h: 0.12, d: 2.15, y: 3.32, color: '#b0a890' },
      { x: -102.89, z: -182.58, w: 6, h: 1.23, d: 7.69, y: 4.83, color: '#b0a890' },
      { x: -102.69, z: -182.58, w: 4.19, h: 0.76, d: 6.4, y: 0.91, color: '#b0a890' },
      { x: -102.89, z: -182.58, w: 6, h: 3.69, d: 7.69, y: 2.37, color: '#b0a890' },
      { x: -102.69, z: -182.58, w: 4.19, h: 2.8, d: 6.4, y: 2.68, color: '#b0a890' },
      { x: -107.7, z: -189.26, w: 3.62, h: 5.03, d: 9.4, y: 3.04, color: '#b0a890' },
      { x: -119.73, z: -185.43, w: 21.46, h: 0.37, d: 0.78, y: 2.91, color: '#b0a890' },
      { x: -119.73, z: -185.43, w: 21.4, h: 2.08, d: 0.73, y: 1.68, color: '#b0a890' },
      { x: -119.73, z: -185.43, w: 21.18, h: 2.08, d: 0.73, y: 1.68, color: '#b0a890' },
      { x: -119.73, z: -185.43, w: 21.37, h: 2.22, d: 1, y: 1.61, color: '#b0a890' },
      { x: -119.73, z: -185.43, w: 21.37, h: 0.44, d: 1, y: 0.86, color: '#b0a890' },
      { x: -119.73, z: -185.43, w: 21.38, h: 2.21, d: 0.68, y: 1.65, color: '#b0a890' },
      { x: -118.59, z: -185.43, w: 4.01, h: 2.01, d: 0.68, y: 1.65, color: '#b0a890' },
      { x: -119.72, z: -185.43, w: 21.36, h: 0.18, d: 0.98, y: 0.59, color: '#b0a890' },
      { x: -119.72, z: -185.43, w: 21.35, h: 0.18, d: 0.98, y: 0.59, color: '#b0a890' },
    ],
    decorations: [],
    spawnPoints: {
      red: [
      { x: -80, y: 1.5, z: -100 },
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
      { x: -100, z: 45, weaponIndex: 3 },
    ],
  },
}

// 切换当前地图：更新 ALL_COLLIDERS 和 CURRENT_RAMPS
export function setCurrentMap(mapId: string): MapDef {
  const map = MAPS[mapId] || CLASSIC_MAP
  const decoCollisions = getDecorationCollisions(map.decorations)
  ALL_COLLIDERS = [...map.walls, ...decoCollisions]
  CURRENT_RAMPS = map.walls.filter(w => w.ramp)
  return map
}
