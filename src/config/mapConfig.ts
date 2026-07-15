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
      { x: -132.24, z: -189.96, w: 1, h: 6, d: 9, y: 3, color: '#b0a890' },
      { x: -106.24, z: -189.96, w: 1, h: 6, d: 9, y: 3, color: '#b0a890' },
      { x: -129.24, z: -188.96, w: 3, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: -130.24, z: -186.21, w: 1, h: 6, d: 4.5, y: 3, color: '#b0a890' },
      { x: -128.24, z: -186.21, w: 1, h: 6, d: 4.5, y: 3, color: '#b0a890' },
      { x: -129.24, z: -185.96, w: 1, h: 6, d: 3, y: 3, color: '#b0a890' },
      { x: -138.49, z: -182.46, w: 0.5, h: 6, d: 9, y: 3, color: '#b0a890' },
      { x: -102.74, z: -185.96, w: 6, h: 6, d: 2, y: 3, color: '#b0a890' },
      { x: -127.49, z: -185.21, w: 0.5, h: 6, d: 2.5, y: 3, color: '#b0a890' },
      { x: -124.74, z: -185.21, w: 1, h: 6, d: 2.5, y: 3, color: '#b0a890' },
      { x: -120.24, z: -185.21, w: 2, h: 6, d: 2.5, y: 3, color: '#b0a890' },
      { x: -116.99, z: -185.21, w: 1.5, h: 6, d: 2.5, y: 3, color: '#b0a890' },
      { x: -112.74, z: -185.21, w: 1, h: 6, d: 2.5, y: 3, color: '#b0a890' },
      { x: -108.24, z: -185.96, w: 3, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: -135.49, z: -185.46, w: 5.5, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: -126.24, z: -185.21, w: 2, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -122.74, z: -185.21, w: 3, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -117.99, z: -185.21, w: 0.5, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -114.74, z: -185.21, w: 3, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -110.99, z: -185.21, w: 2.5, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -132.49, z: -181.71, w: 0.5, h: 6, d: 7.5, y: 3, color: '#b0a890' },
      { x: -108.99, z: -184.71, w: 1.5, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -106.99, z: -184.71, w: 0.5, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -105.99, z: -181.71, w: 0.5, h: 6, d: 7.5, y: 3, color: '#b0a890' },
      { x: -137.74, z: -181.71, w: 1, h: 6, d: 6.5, y: 3, color: '#b0a890' },
      { x: -133.49, z: -181.71, w: 1.5, h: 6, d: 6.5, y: 3, color: '#b0a890' },
      { x: -107.74, z: -184.46, w: 1, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: -106.49, z: -184.46, w: 0.5, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: -104.99, z: -181.46, w: 1.5, h: 6, d: 7, y: 3, color: '#b0a890' },
      { x: -100.49, z: -181.46, w: 1.5, h: 6, d: 7, y: 3, color: '#b0a890' },
      { x: -70.49, z: -184.21, w: 9.5, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -123.99, z: -184.21, w: 0.5, h: 6, d: 0.5, y: 3, color: '#b0a890' },
      { x: -115.99, z: -184.21, w: 0.5, h: 6, d: 0.5, y: 3, color: '#b0a890' },
      { x: -74.74, z: -179.21, w: 1, h: 6, d: 8.5, y: 3, color: '#b0a890' },
      { x: -66.24, z: -179.21, w: 1, h: 6, d: 8.5, y: 3, color: '#b0a890' },
      { x: -135.74, z: -182.21, w: 1, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -290.99, z: -181.21, w: 1.5, h: 6, d: 2.5, y: 3, color: '#b0a890' },
      { x: -270.74, z: -180.46, w: 34, h: 6, d: 4, y: 3, color: '#b0a890' },
      { x: -250.49, z: -180.46, w: 1.5, h: 6, d: 4, y: 3, color: '#b0a890' },
      { x: -289.99, z: -180.21, w: 0.5, h: 6, d: 3.5, y: 3, color: '#b0a890' },
      { x: -253.49, z: -180.21, w: 0.5, h: 6, d: 3.5, y: 3, color: '#b0a890' },
      { x: -249.49, z: -180.96, w: 0.5, h: 6, d: 2, y: 3, color: '#b0a890' },
      { x: -297.74, z: -180.71, w: 12, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -243.24, z: -180.71, w: 12, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -303.99, z: -169.46, w: 0.5, h: 6, d: 23, y: 3, color: '#b0a890' },
      { x: -303.49, z: -168.96, w: 0.5, h: 6, d: 22, y: 3, color: '#b0a890' },
      { x: -290.74, z: -179.21, w: 1, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -288.74, z: -179.21, w: 2, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -252.24, z: -179.21, w: 2, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -237.49, z: -174.96, w: 0.5, h: 6, d: 10, y: 3, color: '#b0a890' },
      { x: -193.74, z: -179.21, w: 31, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -135.74, z: -179.21, w: 3, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -102.74, z: -178.96, w: 3, h: 6, d: 2, y: 3, color: '#b0a890' },
      { x: -219.74, z: -178.96, w: 15, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: -209.49, z: -174.46, w: 0.5, h: 6, d: 10, y: 3, color: '#b0a890' },
      { x: -302.99, z: -174.46, w: 0.5, h: 6, d: 9, y: 3, color: '#b0a890' },
      { x: -237.99, z: -174.46, w: 0.5, h: 6, d: 9, y: 3, color: '#b0a890' },
      { x: -226.74, z: -173.46, w: 1, h: 6, d: 10, y: 3, color: '#b0a890' },
      { x: -212.74, z: -173.46, w: 1, h: 6, d: 10, y: 3, color: '#b0a890' },
      { x: -208.74, z: -173.96, w: 1, h: 6, d: 9, y: 3, color: '#b0a890' },
      { x: -178.74, z: -173.96, w: 1, h: 6, d: 9, y: 3, color: '#b0a890' },
      { x: -132.99, z: -178.21, w: 0.5, h: 6, d: 0.5, y: 3, color: '#b0a890' },
      { x: 35.26, z: -176.21, w: 20, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: 91.26, z: -176.21, w: 31, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -232.49, z: -175.71, w: 5.5, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -70.49, z: -175.71, w: 7.5, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: 25.76, z: -172.21, w: 1, h: 6, d: 6.5, y: 3, color: '#b0a890' },
      { x: 44.76, z: -172.21, w: 1, h: 6, d: 6.5, y: 3, color: '#b0a890' },
      { x: 76.26, z: -172.21, w: 1, h: 6, d: 6.5, y: 3, color: '#b0a890' },
      { x: 106.26, z: -172.21, w: 1, h: 6, d: 6.5, y: 3, color: '#b0a890' },
      { x: -234.74, z: -172.21, w: 1, h: 6, d: 5.5, y: 3, color: '#b0a890' },
      { x: -230.24, z: -172.21, w: 1, h: 6, d: 5.5, y: 3, color: '#b0a890' },
      { x: -109.24, z: -173.71, w: 47, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: 22.26, z: -173.71, w: 6, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -131.49, z: -170.71, w: 2.5, h: 6, d: 4.5, y: 3, color: '#b0a890' },
      { x: -86.24, z: -160.71, w: 1, h: 6, d: 24.5, y: 3, color: '#b0a890' },
      { x: 19.76, z: -170.96, w: 1, h: 6, d: 4, y: 3, color: '#b0a890' },
      { x: 24.76, z: -170.96, w: 1, h: 6, d: 4, y: 3, color: '#b0a890' },
      { x: -129.99, z: -170.46, w: 0.5, h: 6, d: 4, y: 3, color: '#b0a890' },
      { x: -129.24, z: -170.21, w: 1, h: 6, d: 3.5, y: 3, color: '#b0a890' },
      { x: -305.24, z: -168.46, w: 1, h: 6, d: 6, y: 3, color: '#b0a890' },
      { x: -203.99, z: -170.46, w: 2.5, h: 6, d: 2, y: 3, color: '#b0a890' },
      { x: -199.99, z: -170.46, w: 0.5, h: 6, d: 2, y: 3, color: '#b0a890' },
      { x: -197.99, z: -170.46, w: 2.5, h: 6, d: 2, y: 3, color: '#b0a890' },
      { x: -192.24, z: -170.21, w: 2, h: 6, d: 2.5, y: 3, color: '#b0a890' },
      { x: -190.49, z: -170.21, w: 0.5, h: 6, d: 2.5, y: 3, color: '#b0a890' },
      { x: -188.49, z: -170.46, w: 0.5, h: 6, d: 2, y: 3, color: '#b0a890' },
      { x: -185.49, z: -170.21, w: 0.5, h: 6, d: 2.5, y: 3, color: '#b0a890' },
      { x: -183.74, z: -170.21, w: 2, h: 6, d: 2.5, y: 3, color: '#b0a890' },
      { x: -179.49, z: -170.46, w: 0.5, h: 6, d: 2, y: 3, color: '#b0a890' },
      { x: -128.49, z: -169.96, w: 0.5, h: 6, d: 3, y: 3, color: '#b0a890' },
      { x: -302.49, z: -169.46, w: 0.5, h: 6, d: 3, y: 3, color: '#b0a890' },
      { x: -238.74, z: -169.46, w: 1, h: 6, d: 3, y: 3, color: '#b0a890' },
      { x: -232.49, z: -170.21, w: 3.5, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -206.74, z: -170.21, w: 3, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -201.49, z: -170.21, w: 2.5, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -199.49, z: -170.21, w: 0.5, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -194.99, z: -170.21, w: 3.5, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -190.99, z: -169.96, w: 0.5, h: 6, d: 2, y: 3, color: '#b0a890' },
      { x: -189.49, z: -170.21, w: 1.5, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -186.99, z: -170.21, w: 2.5, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -184.99, z: -169.96, w: 0.5, h: 6, d: 2, y: 3, color: '#b0a890' },
      { x: -181.24, z: -170.21, w: 3, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -127.99, z: -169.71, w: 0.5, h: 6, d: 2.5, y: 3, color: '#b0a890' },
      { x: -86.99, z: -167.46, w: 0.5, h: 6, d: 7, y: 3, color: '#b0a890' },
      { x: -127.24, z: -169.46, w: 1, h: 6, d: 2, y: 3, color: '#b0a890' },
      { x: 22.26, z: -169.71, w: 4, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: 91.26, z: -169.71, w: 29, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -219.74, z: -169.21, w: 13, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -126.49, z: -169.21, w: 0.5, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: 35.26, z: -169.46, w: 18, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: -203.24, z: -169.21, w: 3, h: 6, d: 0.5, y: 3, color: '#b0a890' },
      { x: -197.49, z: -169.21, w: 2.5, h: 6, d: 0.5, y: 3, color: '#b0a890' },
      { x: -193.74, z: -169.21, w: 1, h: 6, d: 0.5, y: 3, color: '#b0a890' },
      { x: -182.24, z: -169.21, w: 1, h: 6, d: 0.5, y: 3, color: '#b0a890' },
      { x: -124.24, z: -168.96, w: 4, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: -304.49, z: -167.21, w: 0.5, h: 6, d: 3.5, y: 3, color: '#b0a890' },
      { x: -302.99, z: -164.46, w: 0.5, h: 6, d: 9, y: 3, color: '#b0a890' },
      { x: -237.74, z: -164.46, w: 1, h: 6, d: 9, y: 3, color: '#b0a890' },
      { x: -122.74, z: -167.46, w: 1, h: 6, d: 2, y: 3, color: '#b0a890' },
      { x: -123.74, z: -164.71, w: 1, h: 6, d: 6.5, y: 3, color: '#b0a890' },
      { x: -124.49, z: -166.71, w: 0.5, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: 49.26, z: -166.71, w: 6, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: 45.26, z: -165.71, w: 2, h: 6, d: 2.5, y: 3, color: '#b0a890' },
      { x: 53.51, z: -165.96, w: 2.5, h: 6, d: 2, y: 3, color: '#b0a890' },
      { x: -122.99, z: -161.21, w: 0.5, h: 6, d: 10.5, y: 3, color: '#b0a890' },
      { x: -87.49, z: -165.21, w: 0.5, h: 6, d: 2.5, y: 3, color: '#b0a890' },
      { x: 43.76, z: -165.46, w: 1, h: 6, d: 2, y: 3, color: '#b0a890' },
      { x: 55.26, z: -164.96, w: 1, h: 6, d: 3, y: 3, color: '#b0a890' },
      { x: -122.49, z: -160.96, w: 0.5, h: 6, d: 10, y: 3, color: '#b0a890' },
      { x: -85.49, z: -160.21, w: 0.5, h: 6, d: 11.5, y: 3, color: '#b0a890' },
      { x: 42.76, z: -164.21, w: 1, h: 6, d: 3.5, y: 3, color: '#b0a890' },
      { x: 47.51, z: -165.71, w: 2.5, h: 6, d: 0.5, y: 3, color: '#b0a890' },
      { x: 51.51, z: -165.46, w: 1.5, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: 56.26, z: -164.71, w: 1, h: 6, d: 2.5, y: 3, color: '#b0a890' },
      { x: -121.99, z: -160.71, w: 0.5, h: 6, d: 9.5, y: 3, color: '#b0a890' },
      { x: -84.99, z: -159.96, w: 0.5, h: 6, d: 11, y: 3, color: '#b0a890' },
      { x: -38.24, z: -164.71, w: 8, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -16.74, z: -164.71, w: 8, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: 41.76, z: -163.96, w: 1, h: 6, d: 3, y: 3, color: '#b0a890' },
      { x: 57.26, z: -164.46, w: 1, h: 6, d: 2, y: 3, color: '#b0a890' },
      { x: -121.49, z: -160.46, w: 0.5, h: 6, d: 9, y: 3, color: '#b0a890' },
      { x: -88.24, z: -164.46, w: 1, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: -12.49, z: -155.71, w: 0.5, h: 6, d: 18.5, y: 3, color: '#b0a890' },
      { x: 41.01, z: -163.71, w: 0.5, h: 6, d: 2.5, y: 3, color: '#b0a890' },
      { x: 54.51, z: -164.21, w: 0.5, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: 58.01, z: -162.96, w: 0.5, h: 6, d: 4, y: 3, color: '#b0a890' },
      { x: -120.99, z: -160.21, w: 0.5, h: 6, d: 8.5, y: 3, color: '#b0a890' },
      { x: -57.99, z: -162.96, w: 3.5, h: 6, d: 3, y: 3, color: '#b0a890' },
      { x: 40.26, z: -162.71, w: 1, h: 6, d: 3.5, y: 3, color: '#b0a890' },
      { x: 58.51, z: -162.71, w: 0.5, h: 6, d: 3.5, y: 3, color: '#b0a890' },
      { x: -120.49, z: -159.96, w: 0.5, h: 6, d: 8, y: 3, color: '#b0a890' },
      { x: -88.49, z: -162.96, w: 0.5, h: 6, d: 2, y: 3, color: '#b0a890' },
      { x: -55.99, z: -162.46, w: 0.5, h: 6, d: 3, y: 3, color: '#b0a890' },
      { x: -41.99, z: -162.46, w: 0.5, h: 6, d: 3, y: 3, color: '#b0a890' },
      { x: -37.49, z: -163.71, w: 6.5, h: 6, d: 0.5, y: 3, color: '#b0a890' },
      { x: -20.24, z: -162.46, w: 1, h: 6, d: 3, y: 3, color: '#b0a890' },
      { x: -16.49, z: -162.46, w: 1.5, h: 6, d: 3, y: 3, color: '#b0a890' },
      { x: -12.99, z: -155.21, w: 0.5, h: 6, d: 17.5, y: 3, color: '#b0a890' },
      { x: 39.51, z: -162.46, w: 0.5, h: 6, d: 3, y: 3, color: '#b0a890' },
      { x: 59.01, z: -162.46, w: 0.5, h: 6, d: 3, y: 3, color: '#b0a890' },
      { x: -119.99, z: -159.71, w: 0.5, h: 6, d: 7.5, y: 3, color: '#b0a890' },
      { x: -87.74, z: -162.71, w: 1, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -38.99, z: -162.21, w: 3.5, h: 6, d: 2.5, y: 3, color: '#b0a890' },
      { x: -34.74, z: -162.21, w: 1, h: 6, d: 2.5, y: 3, color: '#b0a890' },
      { x: 39.01, z: -162.21, w: 0.5, h: 6, d: 2.5, y: 3, color: '#b0a890' },
      { x: 57.51, z: -162.21, w: 0.5, h: 6, d: 2.5, y: 3, color: '#b0a890' },
      { x: 59.51, z: -162.21, w: 0.5, h: 6, d: 2.5, y: 3, color: '#b0a890' },
      { x: -118.49, z: -161.96, w: 2.5, h: 6, d: 2, y: 3, color: '#b0a890' },
      { x: 38.51, z: -160.96, w: 0.5, h: 6, d: 4, y: 3, color: '#b0a890' },
      { x: 60.01, z: -159.96, w: 0.5, h: 6, d: 6, y: 3, color: '#b0a890' },
      { x: -67.49, z: -161.71, w: 15.5, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -48.99, z: -161.71, w: 13.5, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -41.24, z: -161.71, w: 1, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -36.24, z: -161.71, w: 2, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -27.49, z: -161.71, w: 13.5, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -18.49, z: -161.71, w: 2.5, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -14.49, z: -161.96, w: 2.5, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: 38.01, z: -160.71, w: 0.5, h: 6, d: 3.5, y: 3, color: '#b0a890' },
      { x: 60.51, z: -159.71, w: 0.5, h: 6, d: 5.5, y: 3, color: '#b0a890' },
      { x: -270.74, z: -161.46, w: 8, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: -87.49, z: -153.71, w: 0.5, h: 6, d: 16.5, y: 3, color: '#b0a890' },
      { x: 37.51, z: -160.46, w: 0.5, h: 6, d: 3, y: 3, color: '#b0a890' },
      { x: 61.01, z: -159.46, w: 0.5, h: 6, d: 5, y: 3, color: '#b0a890' },
      { x: -123.49, z: -158.71, w: 0.5, h: 6, d: 5.5, y: 3, color: '#b0a890' },
      { x: -58.24, z: -161.21, w: 3, h: 6, d: 0.5, y: 3, color: '#b0a890' },
      { x: -14.74, z: -161.21, w: 2, h: 6, d: 0.5, y: 3, color: '#b0a890' },
      { x: 37.01, z: -160.21, w: 0.5, h: 6, d: 2.5, y: 3, color: '#b0a890' },
      { x: 61.51, z: -159.21, w: 0.5, h: 6, d: 4.5, y: 3, color: '#b0a890' },
      { x: -274.49, z: -156.46, w: 0.5, h: 6, d: 9, y: 3, color: '#b0a890' },
      { x: -267.24, z: -159.46, w: 1, h: 6, d: 3, y: 3, color: '#b0a890' },
      { x: -74.49, z: -159.96, w: 1.5, h: 6, d: 2, y: 3, color: '#b0a890' },
      { x: 36.51, z: -158.71, w: 0.5, h: 6, d: 4.5, y: 3, color: '#b0a890' },
      { x: -298.24, z: -158.71, w: 1, h: 6, d: 3.5, y: 3, color: '#b0a890' },
      { x: -282.74, z: -159.96, w: 16, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: -270.99, z: -159.21, w: 6.5, h: 6, d: 2.5, y: 3, color: '#b0a890' },
      { x: -266.24, z: -156.21, w: 1, h: 6, d: 8.5, y: 3, color: '#b0a890' },
      { x: -240.74, z: -159.21, w: 4, h: 6, d: 2.5, y: 3, color: '#b0a890' },
      { x: -119.49, z: -156.21, w: 0.5, h: 6, d: 8.5, y: 3, color: '#b0a890' },
      { x: 35.76, z: -158.46, w: 1, h: 6, d: 4, y: 3, color: '#b0a890' },
      { x: 62.01, z: -156.71, w: 0.5, h: 6, d: 7.5, y: 3, color: '#b0a890' },
      { x: -298.99, z: -158.46, w: 0.5, h: 6, d: 3, y: 3, color: '#b0a890' },
      { x: -238.49, z: -158.96, w: 0.5, h: 6, d: 2, y: 3, color: '#b0a890' },
      { x: -237.49, z: -158.96, w: 0.5, h: 6, d: 2, y: 3, color: '#b0a890' },
      { x: -118.99, z: -155.96, w: 0.5, h: 6, d: 8, y: 3, color: '#b0a890' },
      { x: -300.99, z: -158.71, w: 3.5, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -296.49, z: -158.21, w: 2.5, h: 6, d: 2.5, y: 3, color: '#b0a890' },
      { x: -292.74, z: -158.21, w: 3, h: 6, d: 2.5, y: 3, color: '#b0a890' },
      { x: -290.24, z: -157.96, w: 1, h: 6, d: 3, y: 3, color: '#b0a890' },
      { x: -286.74, z: -158.71, w: 2, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -282.74, z: -158.71, w: 2, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -278.74, z: -158.71, w: 2, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -275.24, z: -158.71, w: 1, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -264.24, z: -158.21, w: 3, h: 6, d: 2.5, y: 3, color: '#b0a890' },
      { x: -260.49, z: -158.21, w: 3.5, h: 6, d: 2.5, y: 3, color: '#b0a890' },
      { x: -256.49, z: -158.21, w: 3.5, h: 6, d: 2.5, y: 3, color: '#b0a890' },
      { x: -252.24, z: -158.21, w: 3, h: 6, d: 2.5, y: 3, color: '#b0a890' },
      { x: -248.24, z: -158.21, w: 3, h: 6, d: 2.5, y: 3, color: '#b0a890' },
      { x: -244.24, z: -158.21, w: 3, h: 6, d: 2.5, y: 3, color: '#b0a890' },
      { x: -118.49, z: -158.21, w: 0.5, h: 6, d: 2.5, y: 3, color: '#b0a890' },
      { x: 35.01, z: -157.96, w: 0.5, h: 6, d: 3, y: 3, color: '#b0a890' },
      { x: 62.51, z: -156.21, w: 0.5, h: 6, d: 6.5, y: 3, color: '#b0a890' },
      { x: -302.99, z: -158.46, w: 0.5, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: -294.74, z: -157.96, w: 1, h: 6, d: 2, y: 3, color: '#b0a890' },
      { x: -290.99, z: -157.96, w: 0.5, h: 6, d: 2, y: 3, color: '#b0a890' },
      { x: -288.74, z: -158.46, w: 2, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: -284.74, z: -158.46, w: 2, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: -280.74, z: -158.46, w: 2, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: -276.74, z: -158.46, w: 2, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: -262.49, z: -157.96, w: 0.5, h: 6, d: 2, y: 3, color: '#b0a890' },
      { x: -258.49, z: -157.96, w: 0.5, h: 6, d: 2, y: 3, color: '#b0a890' },
      { x: -254.24, z: -157.96, w: 1, h: 6, d: 2, y: 3, color: '#b0a890' },
      { x: -250.24, z: -157.96, w: 1, h: 6, d: 2, y: 3, color: '#b0a890' },
      { x: -246.24, z: -157.96, w: 1, h: 6, d: 2, y: 3, color: '#b0a890' },
      { x: -237.99, z: -158.46, w: 0.5, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: -117.99, z: -157.96, w: 0.5, h: 6, d: 2, y: 3, color: '#b0a890' },
      { x: -74.74, z: -151.21, w: 1, h: 6, d: 15.5, y: 3, color: '#b0a890' },
      { x: 34.51, z: -156.46, w: 0.5, h: 6, d: 5, y: 3, color: '#b0a890' },
      { x: -117.49, z: -150.96, w: 0.5, h: 6, d: 15, y: 3, color: '#b0a890' },
      { x: 34.01, z: -156.21, w: 0.5, h: 6, d: 4.5, y: 3, color: '#b0a890' },
      { x: 63.01, z: -153.71, w: 0.5, h: 6, d: 9.5, y: 3, color: '#b0a890' },
      { x: -288.49, z: -157.21, w: 0.5, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -276.49, z: -155.96, w: 0.5, h: 6, d: 4, y: 3, color: '#b0a890' },
      { x: -274.99, z: -154.96, w: 0.5, h: 6, d: 6, y: 3, color: '#b0a890' },
      { x: -270.74, z: -155.21, w: 6, h: 6, d: 5.5, y: 3, color: '#b0a890' },
      { x: -266.99, z: -154.96, w: 0.5, h: 6, d: 6, y: 3, color: '#b0a890' },
      { x: -242.24, z: -157.46, w: 1, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: -174.74, z: -156.71, w: 8, h: 6, d: 2.5, y: 3, color: '#b0a890' },
      { x: -115.99, z: -150.71, w: 2.5, h: 6, d: 14.5, y: 3, color: '#b0a890' },
      { x: -88.24, z: -156.46, w: 1, h: 6, d: 3, y: 3, color: '#b0a890' },
      { x: 33.51, z: -155.96, w: 0.5, h: 6, d: 4, y: 3, color: '#b0a890' },
      { x: -196.99, z: -155.71, w: 2.5, h: 6, d: 3.5, y: 3, color: '#b0a890' },
      { x: -178.99, z: -155.71, w: 0.5, h: 6, d: 3.5, y: 3, color: '#b0a890' },
      { x: -73.99, z: -148.46, w: 0.5, h: 6, d: 18, y: 3, color: '#b0a890' },
      { x: -273.99, z: -154.71, w: 0.5, h: 6, d: 4.5, y: 3, color: '#b0a890' },
      { x: -267.49, z: -154.71, w: 0.5, h: 6, d: 4.5, y: 3, color: '#b0a890' },
      { x: 33.01, z: -155.46, w: 0.5, h: 6, d: 3, y: 3, color: '#b0a890' },
      { x: -205.74, z: -155.21, w: 8, h: 6, d: 2.5, y: 3, color: '#b0a890' },
      { x: -198.49, z: -155.21, w: 0.5, h: 6, d: 2.5, y: 3, color: '#b0a890' },
      { x: -191.99, z: -155.96, w: 7.5, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: -182.49, z: -155.21, w: 6.5, h: 6, d: 2.5, y: 3, color: '#b0a890' },
      { x: -167.24, z: -155.21, w: 7, h: 6, d: 2.5, y: 3, color: '#b0a890' },
      { x: -157.24, z: -155.96, w: 8, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: -147.24, z: -155.21, w: 2, h: 6, d: 2.5, y: 3, color: '#b0a890' },
      { x: -140.49, z: -155.21, w: 1.5, h: 6, d: 2.5, y: 3, color: '#b0a890' },
      { x: -114.49, z: -149.96, w: 0.5, h: 6, d: 13, y: 3, color: '#b0a890' },
      { x: 32.51, z: -145.96, w: 0.5, h: 6, d: 21, y: 3, color: '#b0a890' },
      { x: 63.51, z: -150.21, w: 0.5, h: 6, d: 12.5, y: 3, color: '#b0a890' },
      { x: -201.24, z: -154.96, w: 1, h: 6, d: 2, y: 3, color: '#b0a890' },
      { x: -199.49, z: -154.96, w: 0.5, h: 6, d: 2, y: 3, color: '#b0a890' },
      { x: -149.24, z: -154.96, w: 2, h: 6, d: 2, y: 3, color: '#b0a890' },
      { x: -113.99, z: -149.71, w: 0.5, h: 6, d: 12.5, y: 3, color: '#b0a890' },
      { x: -86.99, z: -150.71, w: 0.5, h: 6, d: 10.5, y: 3, color: '#b0a890' },
      { x: 32.01, z: -145.71, w: 0.5, h: 6, d: 20.5, y: 3, color: '#b0a890' },
      { x: -199.99, z: -154.71, w: 0.5, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -198.99, z: -154.71, w: 0.5, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -187.49, z: -154.71, w: 3.5, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -178.49, z: -154.71, w: 0.5, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -170.99, z: -154.71, w: 0.5, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -161.99, z: -154.71, w: 3.5, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -151.99, z: -154.71, w: 3.5, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -143.74, z: -154.71, w: 5, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -113.49, z: -149.46, w: 0.5, h: 6, d: 12, y: 3, color: '#b0a890' },
      { x: -200.49, z: -154.46, w: 0.5, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: -112.99, z: -149.21, w: 0.5, h: 6, d: 11.5, y: 3, color: '#b0a890' },
      { x: 31.51, z: -145.21, w: 0.5, h: 6, d: 19.5, y: 3, color: '#b0a890' },
      { x: -112.49, z: -148.96, w: 0.5, h: 6, d: 11, y: 3, color: '#b0a890' },
      { x: 31.01, z: -144.96, w: 0.5, h: 6, d: 19, y: 3, color: '#b0a890' },
      { x: 64.01, z: -144.46, w: 0.5, h: 6, d: 20, y: 3, color: '#b0a890' },
      { x: -209.49, z: -151.46, w: 0.5, h: 6, d: 5, y: 3, color: '#b0a890' },
      { x: -139.99, z: -151.46, w: 0.5, h: 6, d: 5, y: 3, color: '#b0a890' },
      { x: -111.99, z: -148.71, w: 0.5, h: 6, d: 10.5, y: 3, color: '#b0a890' },
      { x: -111.49, z: -148.46, w: 0.5, h: 6, d: 10, y: 3, color: '#b0a890' },
      { x: 30.51, z: -144.46, w: 0.5, h: 6, d: 18, y: 3, color: '#b0a890' },
      { x: -118.24, z: -152.46, w: 1, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: -110.99, z: -148.21, w: 0.5, h: 6, d: 9.5, y: 3, color: '#b0a890' },
      { x: -85.49, z: -150.71, w: 0.5, h: 6, d: 4.5, y: 3, color: '#b0a890' },
      { x: -209.99, z: -150.71, w: 0.5, h: 6, d: 3.5, y: 3, color: '#b0a890' },
      { x: -139.49, z: -150.71, w: 0.5, h: 6, d: 3.5, y: 3, color: '#b0a890' },
      { x: -110.49, z: -147.96, w: 0.5, h: 6, d: 9, y: 3, color: '#b0a890' },
      { x: 30.01, z: -143.96, w: 0.5, h: 6, d: 17, y: 3, color: '#b0a890' },
      { x: -210.49, z: -150.46, w: 0.5, h: 6, d: 3, y: 3, color: '#b0a890' },
      { x: -138.99, z: -150.46, w: 0.5, h: 6, d: 3, y: 3, color: '#b0a890' },
      { x: 29.51, z: -143.71, w: 0.5, h: 6, d: 16.5, y: 3, color: '#b0a890' },
      { x: 64.51, z: -143.21, w: 0.5, h: 6, d: 17.5, y: 3, color: '#b0a890' },
      { x: -210.99, z: -150.21, w: 0.5, h: 6, d: 2.5, y: 3, color: '#b0a890' },
      { x: -138.49, z: -150.21, w: 0.5, h: 6, d: 2.5, y: 3, color: '#b0a890' },
      { x: -109.99, z: -147.46, w: 0.5, h: 6, d: 8, y: 3, color: '#b0a890' },
      { x: -213.74, z: -147.46, w: 1, h: 6, d: 7, y: 3, color: '#b0a890' },
      { x: -211.49, z: -149.96, w: 0.5, h: 6, d: 2, y: 3, color: '#b0a890' },
      { x: -137.99, z: -149.96, w: 0.5, h: 6, d: 2, y: 3, color: '#b0a890' },
      { x: -135.99, z: -147.46, w: 1.5, h: 6, d: 7, y: 3, color: '#b0a890' },
      { x: -109.49, z: -147.21, w: 0.5, h: 6, d: 7.5, y: 3, color: '#b0a890' },
      { x: 29.01, z: -143.21, w: 0.5, h: 6, d: 15.5, y: 3, color: '#b0a890' },
      { x: -214.49, z: -147.21, w: 0.5, h: 6, d: 6.5, y: 3, color: '#b0a890' },
      { x: -212.99, z: -147.21, w: 0.5, h: 6, d: 6.5, y: 3, color: '#b0a890' },
      { x: -211.99, z: -149.71, w: 0.5, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -137.24, z: -149.71, w: 1, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -134.99, z: -147.21, w: 0.5, h: 6, d: 6.5, y: 3, color: '#b0a890' },
      { x: -108.99, z: -146.96, w: 0.5, h: 6, d: 7, y: 3, color: '#b0a890' },
      { x: 28.51, z: -142.96, w: 0.5, h: 6, d: 15, y: 3, color: '#b0a890' },
      { x: -214.99, z: -146.96, w: 0.5, h: 6, d: 6, y: 3, color: '#b0a890' },
      { x: -212.49, z: -149.46, w: 0.5, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: -134.49, z: -146.96, w: 0.5, h: 6, d: 6, y: 3, color: '#b0a890' },
      { x: -108.49, z: -146.71, w: 0.5, h: 6, d: 6.5, y: 3, color: '#b0a890' },
      { x: -215.49, z: -146.71, w: 0.5, h: 6, d: 5.5, y: 3, color: '#b0a890' },
      { x: -133.99, z: -146.71, w: 0.5, h: 6, d: 5.5, y: 3, color: '#b0a890' },
      { x: -107.49, z: -148.96, w: 1.5, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: 28.01, z: -142.46, w: 0.5, h: 6, d: 14, y: 3, color: '#b0a890' },
      { x: -215.99, z: -146.46, w: 0.5, h: 6, d: 5, y: 3, color: '#b0a890' },
      { x: -133.49, z: -146.46, w: 0.5, h: 6, d: 5, y: 3, color: '#b0a890' },
      { x: 27.51, z: -142.21, w: 0.5, h: 6, d: 13.5, y: 3, color: '#b0a890' },
      { x: -216.49, z: -146.21, w: 0.5, h: 6, d: 4.5, y: 3, color: '#b0a890' },
      { x: -132.99, z: -146.21, w: 0.5, h: 6, d: 4.5, y: 3, color: '#b0a890' },
      { x: -107.24, z: -146.96, w: 1, h: 6, d: 3, y: 3, color: '#b0a890' },
      { x: -104.74, z: -146.96, w: 3, h: 6, d: 3, y: 3, color: '#b0a890' },
      { x: -86.49, z: -146.96, w: 0.5, h: 6, d: 3, y: 3, color: '#b0a890' },
      { x: -216.99, z: -145.96, w: 0.5, h: 6, d: 4, y: 3, color: '#b0a890' },
      { x: -132.49, z: -145.96, w: 0.5, h: 6, d: 4, y: 3, color: '#b0a890' },
      { x: -107.99, z: -146.71, w: 0.5, h: 6, d: 2.5, y: 3, color: '#b0a890' },
      { x: -106.49, z: -146.71, w: 0.5, h: 6, d: 2.5, y: 3, color: '#b0a890' },
      { x: -102.99, z: -146.71, w: 0.5, h: 6, d: 2.5, y: 3, color: '#b0a890' },
      { x: -85.99, z: -146.71, w: 0.5, h: 6, d: 2.5, y: 3, color: '#b0a890' },
      { x: -16.49, z: -127.96, w: 0.5, h: 6, d: 40, y: 3, color: '#b0a890' },
      { x: -13.74, z: -147.21, w: 1, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: 27.01, z: -141.71, w: 0.5, h: 6, d: 12.5, y: 3, color: '#b0a890' },
      { x: 65.01, z: -143.21, w: 0.5, h: 6, d: 9.5, y: 3, color: '#b0a890' },
      { x: -217.49, z: -145.71, w: 0.5, h: 6, d: 3.5, y: 3, color: '#b0a890' },
      { x: -131.99, z: -145.71, w: 0.5, h: 6, d: 3.5, y: 3, color: '#b0a890' },
      { x: -16.99, z: -127.71, w: 0.5, h: 6, d: 39.5, y: 3, color: '#b0a890' },
      { x: 26.51, z: -141.46, w: 0.5, h: 6, d: 12, y: 3, color: '#b0a890' },
      { x: -217.99, z: -144.96, w: 0.5, h: 6, d: 4, y: 3, color: '#b0a890' },
      { x: -131.49, z: -144.96, w: 0.5, h: 6, d: 4, y: 3, color: '#b0a890' },
      { x: -95.24, z: -146.21, w: 15, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -218.49, z: -144.71, w: 0.5, h: 6, d: 3.5, y: 3, color: '#b0a890' },
      { x: -130.99, z: -144.71, w: 0.5, h: 6, d: 3.5, y: 3, color: '#b0a890' },
      { x: 26.01, z: -140.96, w: 0.5, h: 6, d: 11, y: 3, color: '#b0a890' },
      { x: -218.99, z: -142.21, w: 0.5, h: 6, d: 7.5, y: 3, color: '#b0a890' },
      { x: -130.49, z: -142.21, w: 0.5, h: 6, d: 7.5, y: 3, color: '#b0a890' },
      { x: -219.49, z: -141.96, w: 0.5, h: 6, d: 7, y: 3, color: '#b0a890' },
      { x: -129.99, z: -141.96, w: 0.5, h: 6, d: 7, y: 3, color: '#b0a890' },
      { x: -77.49, z: -136.46, w: 0.5, h: 6, d: 18, y: 3, color: '#b0a890' },
      { x: 25.51, z: -140.46, w: 0.5, h: 6, d: 10, y: 3, color: '#b0a890' },
      { x: -76.99, z: -136.21, w: 0.5, h: 6, d: 17.5, y: 3, color: '#b0a890' },
      { x: 25.01, z: -140.21, w: 0.5, h: 6, d: 9.5, y: 3, color: '#b0a890' },
      { x: -219.99, z: -141.46, w: 0.5, h: 6, d: 6, y: 3, color: '#b0a890' },
      { x: -76.24, z: -143.46, w: 1, h: 6, d: 2, y: 3, color: '#b0a890' },
      { x: -220.49, z: -141.21, w: 0.5, h: 6, d: 5.5, y: 3, color: '#b0a890' },
      { x: -129.49, z: -141.21, w: 0.5, h: 6, d: 5.5, y: 3, color: '#b0a890' },
      { x: 24.51, z: -139.71, w: 0.5, h: 6, d: 8.5, y: 3, color: '#b0a890' },
      { x: -220.99, z: -140.96, w: 0.5, h: 6, d: 5, y: 3, color: '#b0a890' },
      { x: -128.99, z: -140.96, w: 0.5, h: 6, d: 5, y: 3, color: '#b0a890' },
      { x: -74.49, z: -121.46, w: 0.5, h: 6, d: 44, y: 3, color: '#b0a890' },
      { x: 24.01, z: -139.46, w: 0.5, h: 6, d: 8, y: 3, color: '#b0a890' },
      { x: -221.49, z: -140.71, w: 0.5, h: 6, d: 4.5, y: 3, color: '#b0a890' },
      { x: -128.49, z: -140.71, w: 0.5, h: 6, d: 4.5, y: 3, color: '#b0a890' },
      { x: -221.99, z: -140.46, w: 0.5, h: 6, d: 4, y: 3, color: '#b0a890' },
      { x: -197.24, z: -141.71, w: 3, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -152.24, z: -141.71, w: 3, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -127.99, z: -140.46, w: 0.5, h: 6, d: 4, y: 3, color: '#b0a890' },
      { x: -76.49, z: -135.21, w: 0.5, h: 6, d: 14.5, y: 3, color: '#b0a890' },
      { x: 23.51, z: -138.96, w: 0.5, h: 6, d: 7, y: 3, color: '#b0a890' },
      { x: -222.49, z: -140.21, w: 0.5, h: 6, d: 3.5, y: 3, color: '#b0a890' },
      { x: -127.49, z: -140.21, w: 0.5, h: 6, d: 3.5, y: 3, color: '#b0a890' },
      { x: 23.01, z: -138.71, w: 0.5, h: 6, d: 6.5, y: 3, color: '#b0a890' },
      { x: -222.99, z: -139.96, w: 0.5, h: 6, d: 3, y: 3, color: '#b0a890' },
      { x: -126.99, z: -139.96, w: 0.5, h: 6, d: 3, y: 3, color: '#b0a890' },
      { x: -223.49, z: -139.21, w: 0.5, h: 6, d: 3.5, y: 3, color: '#b0a890' },
      { x: -198.24, z: -138.71, w: 1, h: 6, d: 4.5, y: 3, color: '#b0a890' },
      { x: -195.99, z: -138.21, w: 0.5, h: 6, d: 5.5, y: 3, color: '#b0a890' },
      { x: -153.49, z: -138.21, w: 0.5, h: 6, d: 5.5, y: 3, color: '#b0a890' },
      { x: -151.24, z: -138.71, w: 1, h: 6, d: 4.5, y: 3, color: '#b0a890' },
      { x: -126.49, z: -139.71, w: 0.5, h: 6, d: 2.5, y: 3, color: '#b0a890' },
      { x: 22.51, z: -138.21, w: 0.5, h: 6, d: 5.5, y: 3, color: '#b0a890' },
      { x: -223.99, z: -139.46, w: 0.5, h: 6, d: 2, y: 3, color: '#b0a890' },
      { x: -125.99, z: -138.96, w: 0.5, h: 6, d: 3, y: 3, color: '#b0a890' },
      { x: -75.49, z: -139.96, w: 1.5, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: 22.01, z: -137.96, w: 0.5, h: 6, d: 5, y: 3, color: '#b0a890' },
      { x: -224.74, z: -136.46, w: 1, h: 6, d: 7, y: 3, color: '#b0a890' },
      { x: -124.99, z: -136.46, w: 1.5, h: 6, d: 7, y: 3, color: '#b0a890' },
      { x: 63.51, z: -135.21, w: 0.5, h: 6, d: 9.5, y: 3, color: '#b0a890' },
      { x: -225.49, z: -136.21, w: 0.5, h: 6, d: 6.5, y: 3, color: '#b0a890' },
      { x: -123.99, z: -136.21, w: 0.5, h: 6, d: 6.5, y: 3, color: '#b0a890' },
      { x: -75.99, z: -135.46, w: 0.5, h: 6, d: 8, y: 3, color: '#b0a890' },
      { x: -74.99, z: -138.96, w: 0.5, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: 21.51, z: -137.46, w: 0.5, h: 6, d: 4, y: 3, color: '#b0a890' },
      { x: -225.99, z: -135.96, w: 0.5, h: 6, d: 6, y: 3, color: '#b0a890' },
      { x: -123.49, z: -135.96, w: 0.5, h: 6, d: 6, y: 3, color: '#b0a890' },
      { x: -226.49, z: -135.71, w: 0.5, h: 6, d: 5.5, y: 3, color: '#b0a890' },
      { x: -122.99, z: -135.71, w: 0.5, h: 6, d: 5.5, y: 3, color: '#b0a890' },
      { x: 21.01, z: -134.46, w: 0.5, h: 6, d: 8, y: 3, color: '#b0a890' },
      { x: -226.99, z: -135.46, w: 0.5, h: 6, d: 5, y: 3, color: '#b0a890' },
      { x: -122.49, z: -135.46, w: 0.5, h: 6, d: 5, y: 3, color: '#b0a890' },
      { x: 20.51, z: -134.21, w: 0.5, h: 6, d: 7.5, y: 3, color: '#b0a890' },
      { x: 94.51, z: -137.21, w: 30.5, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: 136.51, z: -137.21, w: 42.5, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -227.49, z: -135.21, w: 0.5, h: 6, d: 4.5, y: 3, color: '#b0a890' },
      { x: -199.49, z: -133.21, w: 1.5, h: 6, d: 8.5, y: 3, color: '#b0a890' },
      { x: -150.24, z: -133.21, w: 1, h: 6, d: 8.5, y: 3, color: '#b0a890' },
      { x: -121.99, z: -135.21, w: 0.5, h: 6, d: 4.5, y: 3, color: '#b0a890' },
      { x: 110.01, z: -131.96, w: 0.5, h: 6, d: 11, y: 3, color: '#b0a890' },
      { x: -227.99, z: -134.96, w: 0.5, h: 6, d: 4, y: 3, color: '#b0a890' },
      { x: -195.49, z: -135.96, w: 0.5, h: 6, d: 2, y: 3, color: '#b0a890' },
      { x: -180.24, z: -135.96, w: 2, h: 6, d: 2, y: 3, color: '#b0a890' },
      { x: -176.74, z: -136.46, w: 2, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: -172.74, z: -136.46, w: 2, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: -169.99, z: -135.96, w: 0.5, h: 6, d: 2, y: 3, color: '#b0a890' },
      { x: -154.24, z: -135.96, w: 1, h: 6, d: 2, y: 3, color: '#b0a890' },
      { x: -121.49, z: -134.96, w: 0.5, h: 6, d: 4, y: 3, color: '#b0a890' },
      { x: 20.01, z: -133.71, w: 0.5, h: 6, d: 6.5, y: 3, color: '#b0a890' },
      { x: 63.01, z: -133.71, w: 0.5, h: 6, d: 6.5, y: 3, color: '#b0a890' },
      { x: -228.49, z: -134.71, w: 0.5, h: 6, d: 3.5, y: 3, color: '#b0a890' },
      { x: -198.49, z: -132.71, w: 0.5, h: 6, d: 7.5, y: 3, color: '#b0a890' },
      { x: -194.99, z: -135.71, w: 0.5, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -188.99, z: -135.96, w: 2.5, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: -185.24, z: -135.96, w: 2, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: -181.74, z: -135.71, w: 1, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -178.49, z: -135.96, w: 1.5, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: -170.99, z: -135.96, w: 1.5, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: -168.49, z: -135.71, w: 2.5, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -164.24, z: -135.96, w: 2, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: -160.74, z: -135.96, w: 2, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: -150.99, z: -132.71, w: 0.5, h: 6, d: 7.5, y: 3, color: '#b0a890' },
      { x: -120.99, z: -134.71, w: 0.5, h: 6, d: 3.5, y: 3, color: '#b0a890' },
      { x: 19.51, z: -133.46, w: 0.5, h: 6, d: 6, y: 3, color: '#b0a890' },
      { x: 79.76, z: -131.46, w: 1, h: 6, d: 10, y: 3, color: '#b0a890' },
      { x: 109.51, z: -131.46, w: 0.5, h: 6, d: 10, y: 3, color: '#b0a890' },
      { x: 115.76, z: -131.21, w: 1, h: 6, d: 10.5, y: 3, color: '#b0a890' },
      { x: 157.26, z: -131.21, w: 1, h: 6, d: 10.5, y: 3, color: '#b0a890' },
      { x: -228.99, z: -133.96, w: 0.5, h: 6, d: 4, y: 3, color: '#b0a890' },
      { x: -197.99, z: -135.46, w: 0.5, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: -192.49, z: -135.46, w: 4.5, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: -186.99, z: -135.21, w: 1.5, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -183.24, z: -135.46, w: 2, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: -177.24, z: -133.71, w: 1, h: 6, d: 4.5, y: 3, color: '#b0a890' },
      { x: -172.24, z: -133.71, w: 1, h: 6, d: 4.5, y: 3, color: '#b0a890' },
      { x: -166.24, z: -135.46, w: 2, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: -162.49, z: -135.21, w: 1.5, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -157.24, z: -135.46, w: 5, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: -151.49, z: -132.46, w: 0.5, h: 6, d: 7, y: 3, color: '#b0a890' },
      { x: -120.49, z: -133.96, w: 0.5, h: 6, d: 4, y: 3, color: '#b0a890' },
      { x: -229.49, z: -133.71, w: 0.5, h: 6, d: 3.5, y: 3, color: '#b0a890' },
      { x: -200.49, z: -132.21, w: 0.5, h: 6, d: 6.5, y: 3, color: '#b0a890' },
      { x: -189.74, z: -135.21, w: 1, h: 6, d: 0.5, y: 3, color: '#b0a890' },
      { x: -188.24, z: -134.96, w: 1, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: -185.99, z: -134.96, w: 0.5, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: -184.74, z: -135.21, w: 1, h: 6, d: 0.5, y: 3, color: '#b0a890' },
      { x: -178.74, z: -134.46, w: 1, h: 6, d: 2, y: 3, color: '#b0a890' },
      { x: -170.74, z: -135.21, w: 1, h: 6, d: 0.5, y: 3, color: '#b0a890' },
      { x: -164.99, z: -135.21, w: 0.5, h: 6, d: 0.5, y: 3, color: '#b0a890' },
      { x: -163.49, z: -134.96, w: 0.5, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: -161.24, z: -134.96, w: 1, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: -159.99, z: -135.21, w: 0.5, h: 6, d: 0.5, y: 3, color: '#b0a890' },
      { x: -149.49, z: -132.21, w: 0.5, h: 6, d: 6.5, y: 3, color: '#b0a890' },
      { x: -119.99, z: -133.71, w: 0.5, h: 6, d: 3.5, y: 3, color: '#b0a890' },
      { x: 19.01, z: -132.96, w: 0.5, h: 6, d: 5, y: 3, color: '#b0a890' },
      { x: 62.51, z: -130.96, w: 0.5, h: 6, d: 9, y: 3, color: '#b0a890' },
      { x: -229.99, z: -131.21, w: 0.5, h: 6, d: 7.5, y: 3, color: '#b0a890' },
      { x: -200.99, z: -131.96, w: 0.5, h: 6, d: 6, y: 3, color: '#b0a890' },
      { x: -177.99, z: -134.21, w: 0.5, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -174.74, z: -134.21, w: 4, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -171.24, z: -134.21, w: 1, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -148.99, z: -131.96, w: 0.5, h: 6, d: 6, y: 3, color: '#b0a890' },
      { x: -119.49, z: -131.21, w: 0.5, h: 6, d: 7.5, y: 3, color: '#b0a890' },
      { x: -230.49, z: -130.96, w: 0.5, h: 6, d: 7, y: 3, color: '#b0a890' },
      { x: -201.49, z: -131.71, w: 0.5, h: 6, d: 5.5, y: 3, color: '#b0a890' },
      { x: -148.49, z: -131.71, w: 0.5, h: 6, d: 5.5, y: 3, color: '#b0a890' },
      { x: -118.99, z: -130.96, w: 0.5, h: 6, d: 7, y: 3, color: '#b0a890' },
      { x: 18.51, z: -132.46, w: 0.5, h: 6, d: 4, y: 3, color: '#b0a890' },
      { x: -201.99, z: -131.46, w: 0.5, h: 6, d: 5, y: 3, color: '#b0a890' },
      { x: -147.99, z: -131.46, w: 0.5, h: 6, d: 5, y: 3, color: '#b0a890' },
      { x: -74.99, z: -132.71, w: 0.5, h: 6, d: 2.5, y: 3, color: '#b0a890' },
      { x: -230.99, z: -130.46, w: 0.5, h: 6, d: 6, y: 3, color: '#b0a890' },
      { x: -202.49, z: -131.21, w: 0.5, h: 6, d: 4.5, y: 3, color: '#b0a890' },
      { x: -147.49, z: -131.21, w: 0.5, h: 6, d: 4.5, y: 3, color: '#b0a890' },
      { x: 18.01, z: -129.46, w: 0.5, h: 6, d: 8, y: 3, color: '#b0a890' },
      { x: -231.49, z: -130.21, w: 0.5, h: 6, d: 5.5, y: 3, color: '#b0a890' },
      { x: -202.99, z: -130.96, w: 0.5, h: 6, d: 4, y: 3, color: '#b0a890' },
      { x: -146.99, z: -130.96, w: 0.5, h: 6, d: 4, y: 3, color: '#b0a890' },
      { x: -118.49, z: -130.21, w: 0.5, h: 6, d: 5.5, y: 3, color: '#b0a890' },
      { x: 62.01, z: -129.71, w: 0.5, h: 6, d: 6.5, y: 3, color: '#b0a890' },
      { x: -231.99, z: -129.96, w: 0.5, h: 6, d: 5, y: 3, color: '#b0a890' },
      { x: -203.49, z: -130.71, w: 0.5, h: 6, d: 3.5, y: 3, color: '#b0a890' },
      { x: -146.49, z: -130.71, w: 0.5, h: 6, d: 3.5, y: 3, color: '#b0a890' },
      { x: -117.99, z: -129.96, w: 0.5, h: 6, d: 5, y: 3, color: '#b0a890' },
      { x: -75.49, z: -131.96, w: 0.5, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: -73.99, z: -126.71, w: 0.5, h: 6, d: 11.5, y: 3, color: '#b0a890' },
      { x: 17.51, z: -128.96, w: 0.5, h: 6, d: 7, y: 3, color: '#b0a890' },
      { x: -232.49, z: -129.71, w: 0.5, h: 6, d: 4.5, y: 3, color: '#b0a890' },
      { x: -203.99, z: -130.46, w: 0.5, h: 6, d: 3, y: 3, color: '#b0a890' },
      { x: -145.99, z: -130.46, w: 0.5, h: 6, d: 3, y: 3, color: '#b0a890' },
      { x: -117.49, z: -129.71, w: 0.5, h: 6, d: 4.5, y: 3, color: '#b0a890' },
      { x: 17.01, z: -128.71, w: 0.5, h: 6, d: 6.5, y: 3, color: '#b0a890' },
      { x: 61.51, z: -129.21, w: 0.5, h: 6, d: 5.5, y: 3, color: '#b0a890' },
      { x: -232.99, z: -129.46, w: 0.5, h: 6, d: 4, y: 3, color: '#b0a890' },
      { x: -205.49, z: -127.71, w: 0.5, h: 6, d: 7.5, y: 3, color: '#b0a890' },
      { x: -204.49, z: -127.71, w: 0.5, h: 6, d: 7.5, y: 3, color: '#b0a890' },
      { x: -145.49, z: -130.21, w: 0.5, h: 6, d: 2.5, y: 3, color: '#b0a890' },
      { x: -143.99, z: -127.71, w: 0.5, h: 6, d: 7.5, y: 3, color: '#b0a890' },
      { x: -116.99, z: -129.46, w: 0.5, h: 6, d: 4, y: 3, color: '#b0a890' },
      { x: -233.49, z: -129.21, w: 0.5, h: 6, d: 3.5, y: 3, color: '#b0a890' },
      { x: -144.74, z: -127.46, w: 1, h: 6, d: 7, y: 3, color: '#b0a890' },
      { x: -116.49, z: -129.21, w: 0.5, h: 6, d: 3.5, y: 3, color: '#b0a890' },
      { x: -233.99, z: -128.96, w: 0.5, h: 6, d: 3, y: 3, color: '#b0a890' },
      { x: -204.99, z: -127.21, w: 0.5, h: 6, d: 6.5, y: 3, color: '#b0a890' },
      { x: -115.99, z: -128.96, w: 0.5, h: 6, d: 3, y: 3, color: '#b0a890' },
      { x: 16.51, z: -127.96, w: 0.5, h: 6, d: 5, y: 3, color: '#b0a890' },
      { x: -234.49, z: -128.21, w: 0.5, h: 6, d: 3.5, y: 3, color: '#b0a890' },
      { x: -205.99, z: -126.96, w: 0.5, h: 6, d: 6, y: 3, color: '#b0a890' },
      { x: -115.49, z: -128.71, w: 0.5, h: 6, d: 2.5, y: 3, color: '#b0a890' },
      { x: -75.99, z: -128.96, w: 0.5, h: 6, d: 2, y: 3, color: '#b0a890' },
      { x: 61.01, z: -126.21, w: 0.5, h: 6, d: 7.5, y: 3, color: '#b0a890' },
      { x: -234.99, z: -128.46, w: 0.5, h: 6, d: 2, y: 3, color: '#b0a890' },
      { x: -206.49, z: -126.71, w: 0.5, h: 6, d: 5.5, y: 3, color: '#b0a890' },
      { x: -143.49, z: -126.71, w: 0.5, h: 6, d: 5.5, y: 3, color: '#b0a890' },
      { x: -114.99, z: -127.96, w: 0.5, h: 6, d: 3, y: 3, color: '#b0a890' },
      { x: -14.74, z: -128.46, w: 3, h: 6, d: 2, y: 3, color: '#b0a890' },
      { x: 16.01, z: -125.46, w: 0.5, h: 6, d: 8, y: 3, color: '#b0a890' },
      { x: -235.74, z: -125.46, w: 1, h: 6, d: 7, y: 3, color: '#b0a890' },
      { x: -206.99, z: -126.46, w: 0.5, h: 6, d: 5, y: 3, color: '#b0a890' },
      { x: -142.99, z: -126.46, w: 0.5, h: 6, d: 5, y: 3, color: '#b0a890' },
      { x: -113.99, z: -125.46, w: 1.5, h: 6, d: 7, y: 3, color: '#b0a890' },
      { x: -74.99, z: -123.96, w: 0.5, h: 6, d: 10, y: 3, color: '#b0a890' },
      { x: -236.49, z: -125.21, w: 0.5, h: 6, d: 6.5, y: 3, color: '#b0a890' },
      { x: -207.49, z: -126.21, w: 0.5, h: 6, d: 4.5, y: 3, color: '#b0a890' },
      { x: -142.49, z: -126.21, w: 0.5, h: 6, d: 4.5, y: 3, color: '#b0a890' },
      { x: -112.99, z: -125.21, w: 0.5, h: 6, d: 6.5, y: 3, color: '#b0a890' },
      { x: 15.51, z: -124.96, w: 0.5, h: 6, d: 7, y: 3, color: '#b0a890' },
      { x: 60.51, z: -125.46, w: 0.5, h: 6, d: 6, y: 3, color: '#b0a890' },
      { x: -236.99, z: -124.96, w: 0.5, h: 6, d: 6, y: 3, color: '#b0a890' },
      { x: -207.99, z: -125.96, w: 0.5, h: 6, d: 4, y: 3, color: '#b0a890' },
      { x: -141.99, z: -125.96, w: 0.5, h: 6, d: 4, y: 3, color: '#b0a890' },
      { x: -112.49, z: -124.96, w: 0.5, h: 6, d: 6, y: 3, color: '#b0a890' },
      { x: 60.01, z: -125.21, w: 0.5, h: 6, d: 5.5, y: 3, color: '#b0a890' },
      { x: 94.76, z: -127.21, w: 29, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -237.49, z: -124.71, w: 0.5, h: 6, d: 5.5, y: 3, color: '#b0a890' },
      { x: -208.49, z: -125.71, w: 0.5, h: 6, d: 3.5, y: 3, color: '#b0a890' },
      { x: -141.49, z: -125.71, w: 0.5, h: 6, d: 3.5, y: 3, color: '#b0a890' },
      { x: -111.99, z: -124.71, w: 0.5, h: 6, d: 5.5, y: 3, color: '#b0a890' },
      { x: -13.99, z: -123.96, w: 1.5, h: 6, d: 7, y: 3, color: '#b0a890' },
      { x: 15.01, z: -124.46, w: 0.5, h: 6, d: 6, y: 3, color: '#b0a890' },
      { x: 136.51, z: -126.71, w: 40.5, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -237.99, z: -124.46, w: 0.5, h: 6, d: 5, y: 3, color: '#b0a890' },
      { x: -208.99, z: -125.46, w: 0.5, h: 6, d: 3, y: 3, color: '#b0a890' },
      { x: -140.99, z: -125.46, w: 0.5, h: 6, d: 3, y: 3, color: '#b0a890' },
      { x: -111.49, z: -124.46, w: 0.5, h: 6, d: 5, y: 3, color: '#b0a890' },
      { x: -238.49, z: -124.21, w: 0.5, h: 6, d: 4.5, y: 3, color: '#b0a890' },
      { x: -209.49, z: -122.21, w: 0.5, h: 6, d: 8.5, y: 3, color: '#b0a890' },
      { x: -140.49, z: -125.21, w: 0.5, h: 6, d: 2.5, y: 3, color: '#b0a890' },
      { x: -110.99, z: -124.21, w: 0.5, h: 6, d: 4.5, y: 3, color: '#b0a890' },
      { x: 80.01, z: -126.21, w: 0.5, h: 6, d: 0.5, y: 3, color: '#b0a890' },
      { x: 82.01, z: -126.21, w: 0.5, h: 6, d: 0.5, y: 3, color: '#b0a890' },
      { x: 90.76, z: -126.21, w: 1, h: 6, d: 0.5, y: 3, color: '#b0a890' },
      { x: 92.76, z: -126.21, w: 1, h: 6, d: 0.5, y: 3, color: '#b0a890' },
      { x: 107.01, z: -126.21, w: 0.5, h: 6, d: 0.5, y: 3, color: '#b0a890' },
      { x: 109.01, z: -126.21, w: 0.5, h: 6, d: 0.5, y: 3, color: '#b0a890' },
      { x: -238.99, z: -123.96, w: 0.5, h: 6, d: 4, y: 3, color: '#b0a890' },
      { x: -210.49, z: -121.96, w: 1.5, h: 6, d: 8, y: 3, color: '#b0a890' },
      { x: -139.99, z: -121.96, w: 0.5, h: 6, d: 8, y: 3, color: '#b0a890' },
      { x: -138.74, z: -121.96, w: 1, h: 6, d: 8, y: 3, color: '#b0a890' },
      { x: -110.49, z: -123.96, w: 0.5, h: 6, d: 4, y: 3, color: '#b0a890' },
      { x: 14.51, z: -121.46, w: 0.5, h: 6, d: 9, y: 3, color: '#b0a890' },
      { x: 59.51, z: -122.46, w: 0.5, h: 6, d: 7, y: 3, color: '#b0a890' },
      { x: 116.26, z: -125.71, w: 1, h: 6, d: 0.5, y: 3, color: '#b0a890' },
      { x: 119.01, z: -125.71, w: 0.5, h: 6, d: 0.5, y: 3, color: '#b0a890' },
      { x: 126.26, z: -125.71, w: 1, h: 6, d: 0.5, y: 3, color: '#b0a890' },
      { x: 129.01, z: -125.71, w: 0.5, h: 6, d: 0.5, y: 3, color: '#b0a890' },
      { x: 135.51, z: -125.71, w: 0.5, h: 6, d: 0.5, y: 3, color: '#b0a890' },
      { x: 138.26, z: -125.71, w: 1, h: 6, d: 0.5, y: 3, color: '#b0a890' },
      { x: 141.76, z: -125.71, w: 1, h: 6, d: 0.5, y: 3, color: '#b0a890' },
      { x: 145.51, z: -125.71, w: 0.5, h: 6, d: 0.5, y: 3, color: '#b0a890' },
      { x: 151.01, z: -125.71, w: 0.5, h: 6, d: 0.5, y: 3, color: '#b0a890' },
      { x: 153.76, z: -125.71, w: 1, h: 6, d: 0.5, y: 3, color: '#b0a890' },
      { x: -239.49, z: -123.71, w: 0.5, h: 6, d: 3.5, y: 3, color: '#b0a890' },
      { x: -139.49, z: -121.71, w: 0.5, h: 6, d: 7.5, y: 3, color: '#b0a890' },
      { x: -109.99, z: -123.71, w: 0.5, h: 6, d: 3.5, y: 3, color: '#b0a890' },
      { x: -239.99, z: -122.71, w: 0.5, h: 6, d: 4.5, y: 3, color: '#b0a890' },
      { x: -109.49, z: -122.71, w: 0.5, h: 6, d: 4.5, y: 3, color: '#b0a890' },
      { x: 14.01, z: -120.96, w: 0.5, h: 6, d: 8, y: 3, color: '#b0a890' },
      { x: 59.01, z: -121.96, w: 0.5, h: 6, d: 6, y: 3, color: '#b0a890' },
      { x: -240.49, z: -122.46, w: 0.5, h: 6, d: 4, y: 3, color: '#b0a890' },
      { x: -211.49, z: -121.21, w: 0.5, h: 6, d: 6.5, y: 3, color: '#b0a890' },
      { x: -108.99, z: -122.46, w: 0.5, h: 6, d: 4, y: 3, color: '#b0a890' },
      { x: -240.99, z: -122.21, w: 0.5, h: 6, d: 3.5, y: 3, color: '#b0a890' },
      { x: -211.99, z: -120.96, w: 0.5, h: 6, d: 6, y: 3, color: '#b0a890' },
      { x: -137.99, z: -120.96, w: 0.5, h: 6, d: 6, y: 3, color: '#b0a890' },
      { x: -108.49, z: -122.21, w: 0.5, h: 6, d: 3.5, y: 3, color: '#b0a890' },
      { x: 58.51, z: -121.46, w: 0.5, h: 6, d: 5, y: 3, color: '#b0a890' },
      { x: -253.24, z: -122.71, w: 9, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -241.49, z: -121.96, w: 0.5, h: 6, d: 3, y: 3, color: '#b0a890' },
      { x: -212.49, z: -120.71, w: 0.5, h: 6, d: 5.5, y: 3, color: '#b0a890' },
      { x: -137.49, z: -120.71, w: 0.5, h: 6, d: 5.5, y: 3, color: '#b0a890' },
      { x: -107.99, z: -121.96, w: 0.5, h: 6, d: 3, y: 3, color: '#b0a890' },
      { x: -96.24, z: -122.96, w: 9, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: 13.51, z: -120.21, w: 0.5, h: 6, d: 6.5, y: 3, color: '#b0a890' },
      { x: -259.74, z: -122.46, w: 4, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: -246.74, z: -122.46, w: 4, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: -241.99, z: -121.71, w: 0.5, h: 6, d: 2.5, y: 3, color: '#b0a890' },
      { x: -212.99, z: -120.46, w: 0.5, h: 6, d: 5, y: 3, color: '#b0a890' },
      { x: -136.99, z: -120.46, w: 0.5, h: 6, d: 5, y: 3, color: '#b0a890' },
      { x: -107.49, z: -121.71, w: 0.5, h: 6, d: 2.5, y: 3, color: '#b0a890' },
      { x: -104.24, z: -121.71, w: 1, h: 6, d: 2.5, y: 3, color: '#b0a890' },
      { x: -89.74, z: -121.71, w: 4, h: 6, d: 2.5, y: 3, color: '#b0a890' },
      { x: -213.49, z: -120.21, w: 0.5, h: 6, d: 4.5, y: 3, color: '#b0a890' },
      { x: -136.49, z: -120.21, w: 0.5, h: 6, d: 4.5, y: 3, color: '#b0a890' },
      { x: -105.99, z: -121.46, w: 2.5, h: 6, d: 2, y: 3, color: '#b0a890' },
      { x: -100.24, z: -121.46, w: 1, h: 6, d: 2, y: 3, color: '#b0a890' },
      { x: -92.24, z: -121.46, w: 1, h: 6, d: 2, y: 3, color: '#b0a890' },
      { x: 58.01, z: -120.71, w: 0.5, h: 6, d: 3.5, y: 3, color: '#b0a890' },
      { x: -261.24, z: -111.71, w: 1, h: 6, d: 20.5, y: 3, color: '#b0a890' },
      { x: -257.24, z: -121.21, w: 1, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -249.24, z: -121.21, w: 1, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -243.99, z: -121.21, w: 3.5, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -213.99, z: -119.96, w: 0.5, h: 6, d: 4, y: 3, color: '#b0a890' },
      { x: -135.99, z: -119.96, w: 0.5, h: 6, d: 4, y: 3, color: '#b0a890' },
      { x: -102.24, z: -121.21, w: 3, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -96.24, z: -121.21, w: 7, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -15.49, z: -121.21, w: 1.5, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: 13.01, z: -117.21, w: 0.5, h: 6, d: 9.5, y: 3, color: '#b0a890' },
      { x: 57.51, z: -118.71, w: 0.5, h: 6, d: 6.5, y: 3, color: '#b0a890' },
      { x: -214.49, z: -119.71, w: 0.5, h: 6, d: 3.5, y: 3, color: '#b0a890' },
      { x: -135.49, z: -119.71, w: 0.5, h: 6, d: 3.5, y: 3, color: '#b0a890' },
      { x: -214.99, z: -119.46, w: 0.5, h: 6, d: 3, y: 3, color: '#b0a890' },
      { x: -134.99, z: -119.46, w: 0.5, h: 6, d: 3, y: 3, color: '#b0a890' },
      { x: 57.01, z: -118.21, w: 0.5, h: 6, d: 5.5, y: 3, color: '#b0a890' },
      { x: -216.49, z: -116.71, w: 0.5, h: 6, d: 7.5, y: 3, color: '#b0a890' },
      { x: -215.49, z: -116.71, w: 0.5, h: 6, d: 7.5, y: 3, color: '#b0a890' },
      { x: -134.49, z: -119.21, w: 0.5, h: 6, d: 2.5, y: 3, color: '#b0a890' },
      { x: -132.99, z: -116.71, w: 0.5, h: 6, d: 7.5, y: 3, color: '#b0a890' },
      { x: -88.24, z: -110.96, w: 1, h: 6, d: 19, y: 3, color: '#b0a890' },
      { x: -13.74, z: -120.21, w: 1, h: 6, d: 0.5, y: 3, color: '#b0a890' },
      { x: 12.51, z: -116.46, w: 0.5, h: 6, d: 8, y: 3, color: '#b0a890' },
      { x: 56.51, z: -117.96, w: 0.5, h: 6, d: 5, y: 3, color: '#b0a890' },
      { x: -215.99, z: -116.46, w: 0.5, h: 6, d: 7, y: 3, color: '#b0a890' },
      { x: -133.74, z: -116.46, w: 1, h: 6, d: 7, y: 3, color: '#b0a890' },
      { x: -216.99, z: -115.96, w: 0.5, h: 6, d: 6, y: 3, color: '#b0a890' },
      { x: -73.99, z: -117.46, w: 0.5, h: 6, d: 3, y: 3, color: '#b0a890' },
      { x: 12.01, z: -114.21, w: 0.5, h: 6, d: 9.5, y: 3, color: '#b0a890' },
      { x: 56.01, z: -117.21, w: 0.5, h: 6, d: 3.5, y: 3, color: '#b0a890' },
      { x: -217.49, z: -115.71, w: 0.5, h: 6, d: 5.5, y: 3, color: '#b0a890' },
      { x: -132.49, z: -115.71, w: 0.5, h: 6, d: 5.5, y: 3, color: '#b0a890' },
      { x: -217.99, z: -115.46, w: 0.5, h: 6, d: 5, y: 3, color: '#b0a890' },
      { x: -131.99, z: -115.46, w: 0.5, h: 6, d: 5, y: 3, color: '#b0a890' },
      { x: 55.51, z: -115.21, w: 0.5, h: 6, d: 5.5, y: 3, color: '#b0a890' },
      { x: -218.49, z: -115.21, w: 0.5, h: 6, d: 4.5, y: 3, color: '#b0a890' },
      { x: -131.49, z: -115.21, w: 0.5, h: 6, d: 4.5, y: 3, color: '#b0a890' },
      { x: 55.01, z: -114.96, w: 0.5, h: 6, d: 5, y: 3, color: '#b0a890' },
      { x: -218.99, z: -114.96, w: 0.5, h: 6, d: 4, y: 3, color: '#b0a890' },
      { x: -130.99, z: -114.96, w: 0.5, h: 6, d: 4, y: 3, color: '#b0a890' },
      { x: -74.99, z: -115.71, w: 0.5, h: 6, d: 2.5, y: 3, color: '#b0a890' },
      { x: 11.51, z: -113.21, w: 0.5, h: 6, d: 7.5, y: 3, color: '#b0a890' },
      { x: 54.51, z: -114.71, w: 0.5, h: 6, d: 4.5, y: 3, color: '#b0a890' },
      { x: -219.49, z: -114.71, w: 0.5, h: 6, d: 3.5, y: 3, color: '#b0a890' },
      { x: -130.49, z: -114.71, w: 0.5, h: 6, d: 3.5, y: 3, color: '#b0a890' },
      { x: -219.99, z: -114.46, w: 0.5, h: 6, d: 3, y: 3, color: '#b0a890' },
      { x: -129.99, z: -114.46, w: 0.5, h: 6, d: 3, y: 3, color: '#b0a890' },
      { x: 54.01, z: -114.21, w: 0.5, h: 6, d: 3.5, y: 3, color: '#b0a890' },
      { x: -220.49, z: -111.21, w: 0.5, h: 6, d: 8.5, y: 3, color: '#b0a890' },
      { x: -129.49, z: -114.21, w: 0.5, h: 6, d: 2.5, y: 3, color: '#b0a890' },
      { x: -73.99, z: -113.96, w: 0.5, h: 6, d: 3, y: 3, color: '#b0a890' },
      { x: -221.49, z: -110.96, w: 1.5, h: 6, d: 8, y: 3, color: '#b0a890' },
      { x: -128.99, z: -110.96, w: 0.5, h: 6, d: 8, y: 3, color: '#b0a890' },
      { x: -127.74, z: -110.96, w: 1, h: 6, d: 8, y: 3, color: '#b0a890' },
      { x: 11.01, z: -110.71, w: 0.5, h: 6, d: 8.5, y: 3, color: '#b0a890' },
      { x: 53.51, z: -112.46, w: 0.5, h: 6, d: 5, y: 3, color: '#b0a890' },
      { x: -128.49, z: -110.71, w: 0.5, h: 6, d: 7.5, y: 3, color: '#b0a890' },
      { x: -87.49, z: -109.96, w: 0.5, h: 6, d: 9, y: 3, color: '#b0a890' },
      { x: 53.01, z: -112.21, w: 0.5, h: 6, d: 4.5, y: 3, color: '#b0a890' },
      { x: -262.74, z: -113.21, w: 2, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -170.99, z: -113.21, w: 10.5, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -86.99, z: -112.21, w: 0.5, h: 6, d: 3.5, y: 3, color: '#b0a890' },
      { x: 52.51, z: -111.96, w: 0.5, h: 6, d: 4, y: 3, color: '#b0a890' },
      { x: -222.49, z: -110.21, w: 0.5, h: 6, d: 6.5, y: 3, color: '#b0a890' },
      { x: -176.74, z: -112.96, w: 1, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: -222.99, z: -109.96, w: 0.5, h: 6, d: 6, y: 3, color: '#b0a890' },
      { x: -126.99, z: -109.96, w: 0.5, h: 6, d: 6, y: 3, color: '#b0a890' },
      { x: 10.51, z: -109.71, w: 0.5, h: 6, d: 6.5, y: 3, color: '#b0a890' },
      { x: 52.01, z: -111.46, w: 0.5, h: 6, d: 3, y: 3, color: '#b0a890' },
      { x: -262.24, z: -111.46, w: 1, h: 6, d: 2, y: 3, color: '#b0a890' },
      { x: -223.49, z: -109.71, w: 0.5, h: 6, d: 5.5, y: 3, color: '#b0a890' },
      { x: -126.49, z: -109.71, w: 0.5, h: 6, d: 5.5, y: 3, color: '#b0a890' },
      { x: 51.51, z: -109.71, w: 0.5, h: 6, d: 5.5, y: 3, color: '#b0a890' },
      { x: -223.99, z: -109.46, w: 0.5, h: 6, d: 5, y: 3, color: '#b0a890' },
      { x: -125.99, z: -109.46, w: 0.5, h: 6, d: 5, y: 3, color: '#b0a890' },
      { x: -73.99, z: -110.96, w: 0.5, h: 6, d: 2, y: 3, color: '#b0a890' },
      { x: -224.49, z: -109.21, w: 0.5, h: 6, d: 4.5, y: 3, color: '#b0a890' },
      { x: -125.49, z: -109.21, w: 0.5, h: 6, d: 4.5, y: 3, color: '#b0a890' },
      { x: 10.01, z: -108.96, w: 0.5, h: 6, d: 5, y: 3, color: '#b0a890' },
      { x: 50.76, z: -109.21, w: 1, h: 6, d: 4.5, y: 3, color: '#b0a890' },
      { x: -224.99, z: -108.96, w: 0.5, h: 6, d: 4, y: 3, color: '#b0a890' },
      { x: -124.99, z: -108.96, w: 0.5, h: 6, d: 4, y: 3, color: '#b0a890' },
      { x: -29.24, z: -110.21, w: 11, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -225.49, z: -108.71, w: 0.5, h: 6, d: 3.5, y: 3, color: '#b0a890' },
      { x: -124.49, z: -108.71, w: 0.5, h: 6, d: 3.5, y: 3, color: '#b0a890' },
      { x: -34.99, z: -108.96, w: 0.5, h: 6, d: 3, y: 3, color: '#b0a890' },
      { x: -20.49, z: -109.96, w: 6.5, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: 50.01, z: -108.71, w: 0.5, h: 6, d: 3.5, y: 3, color: '#b0a890' },
      { x: -225.99, z: -108.46, w: 0.5, h: 6, d: 3, y: 3, color: '#b0a890' },
      { x: -123.99, z: -108.46, w: 0.5, h: 6, d: 3, y: 3, color: '#b0a890' },
      { x: 9.51, z: -106.96, w: 0.5, h: 6, d: 6, y: 3, color: '#b0a890' },
      { x: 49.51, z: -108.46, w: 0.5, h: 6, d: 3, y: 3, color: '#b0a890' },
      { x: -227.49, z: -106.21, w: 0.5, h: 6, d: 6.5, y: 3, color: '#b0a890' },
      { x: -226.49, z: -108.21, w: 0.5, h: 6, d: 2.5, y: 3, color: '#b0a890' },
      { x: -123.49, z: -108.21, w: 0.5, h: 6, d: 2.5, y: 3, color: '#b0a890' },
      { x: -121.99, z: -106.21, w: 0.5, h: 6, d: 6.5, y: 3, color: '#b0a890' },
      { x: -34.49, z: -108.21, w: 0.5, h: 6, d: 2.5, y: 3, color: '#b0a890' },
      { x: -27.74, z: -108.96, w: 1, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: -23.99, z: -108.96, w: 1.5, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: -19.99, z: -108.96, w: 1.5, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: -17.49, z: -108.96, w: 0.5, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: -227.99, z: -105.96, w: 0.5, h: 6, d: 6, y: 3, color: '#b0a890' },
      { x: -226.99, z: -107.96, w: 0.5, h: 6, d: 2, y: 3, color: '#b0a890' },
      { x: -122.74, z: -108.21, w: 1, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -121.49, z: -105.96, w: 0.5, h: 6, d: 6, y: 3, color: '#b0a890' },
      { x: 9.01, z: -106.46, w: 0.5, h: 6, d: 5, y: 3, color: '#b0a890' },
      { x: 48.76, z: -106.71, w: 1, h: 6, d: 4.5, y: 3, color: '#b0a890' },
      { x: -228.74, z: -105.71, w: 1, h: 6, d: 5.5, y: 3, color: '#b0a890' },
      { x: -120.74, z: -105.71, w: 1, h: 6, d: 5.5, y: 3, color: '#b0a890' },
      { x: -33.74, z: -107.21, w: 1, h: 6, d: 2.5, y: 3, color: '#b0a890' },
      { x: -27.99, z: -106.96, w: 0.5, h: 6, d: 3, y: 3, color: '#b0a890' },
      { x: -23.74, z: -108.21, w: 1, h: 6, d: 0.5, y: 3, color: '#b0a890' },
      { x: -20.24, z: -108.21, w: 1, h: 6, d: 0.5, y: 3, color: '#b0a890' },
      { x: -229.49, z: -105.46, w: 0.5, h: 6, d: 5, y: 3, color: '#b0a890' },
      { x: -23.99, z: -106.71, w: 0.5, h: 6, d: 2.5, y: 3, color: '#b0a890' },
      { x: 8.51, z: -105.96, w: 0.5, h: 6, d: 4, y: 3, color: '#b0a890' },
      { x: 48.01, z: -106.21, w: 0.5, h: 6, d: 3.5, y: 3, color: '#b0a890' },
      { x: -229.99, z: -105.21, w: 0.5, h: 6, d: 4.5, y: 3, color: '#b0a890' },
      { x: -122.99, z: -107.21, w: 0.5, h: 6, d: 0.5, y: 3, color: '#b0a890' },
      { x: -119.74, z: -105.21, w: 1, h: 6, d: 4.5, y: 3, color: '#b0a890' },
      { x: -32.99, z: -104.46, w: 0.5, h: 6, d: 6, y: 3, color: '#b0a890' },
      { x: 47.51, z: -105.96, w: 0.5, h: 6, d: 3, y: 3, color: '#b0a890' },
      { x: -32.49, z: -104.46, w: 0.5, h: 6, d: 5, y: 3, color: '#b0a890' },
      { x: -27.49, z: -106.21, w: 0.5, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -24.49, z: -106.21, w: 0.5, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: 8.01, z: -104.46, w: 0.5, h: 6, d: 5, y: 3, color: '#b0a890' },
      { x: 47.01, z: -105.71, w: 0.5, h: 6, d: 2.5, y: 3, color: '#b0a890' },
      { x: -230.74, z: -104.71, w: 1, h: 6, d: 3.5, y: 3, color: '#b0a890' },
      { x: -118.74, z: -104.71, w: 1, h: 6, d: 3.5, y: 3, color: '#b0a890' },
      { x: -25.99, z: -105.96, w: 2.5, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: 7.51, z: -102.71, w: 0.5, h: 6, d: 7.5, y: 3, color: '#b0a890' },
      { x: 46.26, z: -104.21, w: 1, h: 6, d: 4.5, y: 3, color: '#b0a890' },
      { x: -231.49, z: -104.46, w: 0.5, h: 6, d: 3, y: 3, color: '#b0a890' },
      { x: -117.99, z: -104.46, w: 0.5, h: 6, d: 3, y: 3, color: '#b0a890' },
      { x: -33.49, z: -105.71, w: 0.5, h: 6, d: 0.5, y: 3, color: '#b0a890' },
      { x: -231.99, z: -104.21, w: 0.5, h: 6, d: 2.5, y: 3, color: '#b0a890' },
      { x: -117.49, z: -104.21, w: 0.5, h: 6, d: 2.5, y: 3, color: '#b0a890' },
      { x: 7.01, z: -103.71, w: 0.5, h: 6, d: 3.5, y: 3, color: '#b0a890' },
      { x: 45.51, z: -103.71, w: 0.5, h: 6, d: 3.5, y: 3, color: '#b0a890' },
      { x: -232.49, z: -103.96, w: 0.5, h: 6, d: 2, y: 3, color: '#b0a890' },
      { x: 45.01, z: -103.46, w: 0.5, h: 6, d: 3, y: 3, color: '#b0a890' },
      { x: -116.99, z: -103.71, w: 0.5, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: 6.51, z: -103.21, w: 0.5, h: 6, d: 2.5, y: 3, color: '#b0a890' },
      { x: 44.51, z: -103.21, w: 0.5, h: 6, d: 2.5, y: 3, color: '#b0a890' },
      { x: -243.49, z: -102.71, w: 6.5, h: 6, d: 2.5, y: 3, color: '#b0a890' },
      { x: -235.24, z: -103.46, w: 5, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: -102.74, z: -103.46, w: 28, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: -56.24, z: -103.21, w: 29, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: 5.76, z: -100.96, w: 1, h: 6, d: 6, y: 3, color: '#b0a890' },
      { x: 43.76, z: -102.21, w: 1, h: 6, d: 3.5, y: 3, color: '#b0a890' },
      { x: -72.49, z: -102.96, w: 3.5, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: -40.49, z: -102.96, w: 2.5, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: -33.49, z: -102.21, w: 0.5, h: 6, d: 2.5, y: 3, color: '#b0a890' },
      { x: 5.01, z: -100.21, w: 0.5, h: 6, d: 6.5, y: 3, color: '#b0a890' },
      { x: 43.01, z: -101.96, w: 0.5, h: 6, d: 3, y: 3, color: '#b0a890' },
      { x: -253.74, z: -102.21, w: 14, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -238.74, z: -102.21, w: 3, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -111.24, z: -102.21, w: 2, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -108.49, z: -101.21, w: 1.5, h: 6, d: 3.5, y: 3, color: '#b0a890' },
      { x: -103.74, z: -101.21, w: 2, h: 6, d: 3.5, y: 3, color: '#b0a890' },
      { x: -100.24, z: -102.21, w: 1, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -96.24, z: -100.96, w: 1, h: 6, d: 4, y: 3, color: '#b0a890' },
      { x: -92.24, z: -102.21, w: 1, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -89.24, z: -102.21, w: 1, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -38.99, z: -101.71, w: 0.5, h: 6, d: 2.5, y: 3, color: '#b0a890' },
      { x: -33.99, z: -101.96, w: 0.5, h: 6, d: 2, y: 3, color: '#b0a890' },
      { x: 13.01, z: -101.71, w: 0.5, h: 6, d: 2.5, y: 3, color: '#b0a890' },
      { x: 15.76, z: -101.96, w: 1, h: 6, d: 2, y: 3, color: '#b0a890' },
      { x: 18.51, z: -101.71, w: 0.5, h: 6, d: 2.5, y: 3, color: '#b0a890' },
      { x: 42.26, z: -101.71, w: 1, h: 6, d: 2.5, y: 3, color: '#b0a890' },
      { x: -109.74, z: -101.96, w: 1, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: -106.24, z: -100.96, w: 3, h: 6, d: 3, y: 3, color: '#b0a890' },
      { x: -101.74, z: -101.96, w: 2, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: -98.24, z: -101.96, w: 3, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: -94.24, z: -101.96, w: 3, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: -90.74, z: -101.96, w: 2, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: -73.99, z: -100.96, w: 0.5, h: 6, d: 3, y: 3, color: '#b0a890' },
      { x: -70.24, z: -100.96, w: 2, h: 6, d: 3, y: 3, color: '#b0a890' },
      { x: -63.24, z: -100.96, w: 1, h: 6, d: 3, y: 3, color: '#b0a890' },
      { x: -39.74, z: -101.96, w: 1, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: -38.49, z: -101.46, w: 0.5, h: 6, d: 2, y: 3, color: '#b0a890' },
      { x: -34.49, z: -101.46, w: 0.5, h: 6, d: 2, y: 3, color: '#b0a890' },
      { x: 9.01, z: -101.21, w: 0.5, h: 6, d: 2.5, y: 3, color: '#b0a890' },
      { x: 11.51, z: -101.46, w: 2.5, h: 6, d: 2, y: 3, color: '#b0a890' },
      { x: 14.26, z: -101.71, w: 2, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: 17.26, z: -101.71, w: 2, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: 19.51, z: -101.46, w: 1.5, h: 6, d: 2, y: 3, color: '#b0a890' },
      { x: 21.51, z: -101.21, w: 0.5, h: 6, d: 2.5, y: 3, color: '#b0a890' },
      { x: 41.01, z: -101.46, w: 1.5, h: 6, d: 2, y: 3, color: '#b0a890' },
      { x: -37.49, z: -101.21, w: 1.5, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -35.49, z: -101.21, w: 1.5, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: 8.51, z: -100.96, w: 0.5, h: 6, d: 2, y: 3, color: '#b0a890' },
      { x: 9.76, z: -101.21, w: 1, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: 20.76, z: -101.21, w: 1, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: 22.26, z: -100.96, w: 1, h: 6, d: 2, y: 3, color: '#b0a890' },
      { x: 40.01, z: -100.71, w: 0.5, h: 6, d: 2.5, y: 3, color: '#b0a890' },
      { x: -245.99, z: -100.71, w: 1.5, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -240.99, z: -100.71, w: 1.5, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -88.49, z: -100.21, w: 0.5, h: 6, d: 2.5, y: 3, color: '#b0a890' },
      { x: -66.49, z: -100.46, w: 5.5, h: 6, d: 2, y: 3, color: '#b0a890' },
      { x: -39.49, z: -101.21, w: 0.5, h: 6, d: 0.5, y: 3, color: '#b0a890' },
      { x: -36.49, z: -100.96, w: 0.5, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: 1.76, z: -100.21, w: 1, h: 6, d: 2.5, y: 3, color: '#b0a890' },
      { x: 4.51, z: -99.21, w: 0.5, h: 6, d: 4.5, y: 3, color: '#b0a890' },
      { x: 8.01, z: -100.21, w: 0.5, h: 6, d: 2.5, y: 3, color: '#b0a890' },
      { x: 23.76, z: -100.71, w: 2, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: 39.01, z: -100.46, w: 1.5, h: 6, d: 2, y: 3, color: '#b0a890' },
      { x: 6.76, z: -99.96, w: 1, h: 6, d: 2, y: 3, color: '#b0a890' },
      { x: 26.01, z: -99.96, w: 2.5, h: 6, d: 2, y: 3, color: '#b0a890' },
      { x: 37.26, z: -100.21, w: 2, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -92.24, z: -99.71, w: 7, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -72.49, z: -99.96, w: 2.5, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: 9.51, z: -100.21, w: 0.5, h: 6, d: 0.5, y: 3, color: '#b0a890' },
      { x: 21.01, z: -100.21, w: 0.5, h: 6, d: 0.5, y: 3, color: '#b0a890' },
      { x: 31.76, z: -99.46, w: 9, h: 6, d: 2, y: 3, color: '#b0a890' },
      { x: 40.76, z: -99.96, w: 1, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: -246.24, z: -99.71, w: 1, h: 6, d: 0.5, y: 3, color: '#b0a890' },
      { x: -240.74, z: -99.71, w: 1, h: 6, d: 0.5, y: 3, color: '#b0a890' },
      { x: -2.99, z: -97.71, w: 0.5, h: 6, d: 4.5, y: 3, color: '#b0a890' },
      { x: -1.49, z: -98.96, w: 1.5, h: 6, d: 2, y: 3, color: '#b0a890' },
      { x: 24.01, z: -99.46, w: 1.5, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: -3.49, z: -96.96, w: 0.5, h: 6, d: 5, y: 3, color: '#b0a890' },
      { x: -2.49, z: -98.71, w: 0.5, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: 3.76, z: -98.21, w: 1, h: 6, d: 2.5, y: 3, color: '#b0a890' },
      { x: 37.01, z: -98.96, w: 1.5, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: -4.24, z: -97.96, w: 1, h: 6, d: 2, y: 3, color: '#b0a890' },
      { x: 2.76, z: -97.96, w: 1, h: 6, d: 2, y: 3, color: '#b0a890' },
      { x: 6.51, z: -98.46, w: 0.5, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: 27.01, z: -98.71, w: 0.5, h: 6, d: 0.5, y: 3, color: '#b0a890' },
      { x: -5.49, z: -96.46, w: 1.5, h: 6, d: 4, y: 3, color: '#b0a890' },
      { x: 1.76, z: -97.21, w: 1, h: 6, d: 2.5, y: 3, color: '#b0a890' },
      { x: -6.74, z: -95.71, w: 1, h: 6, d: 4.5, y: 3, color: '#b0a890' },
      { x: -7.74, z: -94.96, w: 1, h: 6, d: 5, y: 3, color: '#b0a890' },
      { x: -8.74, z: -94.71, w: 1, h: 6, d: 4.5, y: 3, color: '#b0a890' },
      { x: -3.99, z: -95.71, w: 0.5, h: 6, d: 2.5, y: 3, color: '#b0a890' },
      { x: -1.24, z: -96.21, w: 1, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -10.24, z: -94.21, w: 2, h: 6, d: 4.5, y: 3, color: '#b0a890' },
      { x: -4.49, z: -95.46, w: 0.5, h: 6, d: 2, y: 3, color: '#b0a890' },
      { x: -11.99, z: -94.71, w: 1.5, h: 6, d: 2.5, y: 3, color: '#b0a890' },
      { x: -44.49, z: -94.71, w: 21.5, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -14.99, z: -94.46, w: 4.5, h: 6, d: 2, y: 3, color: '#b0a890' },
      { x: -55.99, z: -93.96, w: 1.5, h: 6, d: 2, y: 3, color: '#b0a890' },
      { x: -25.49, z: -94.21, w: 16.5, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -57.24, z: -92.96, w: 1, h: 6, d: 3, y: 3, color: '#b0a890' },
      { x: -5.74, z: -93.96, w: 1, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: -58.24, z: -92.71, w: 1, h: 6, d: 2.5, y: 3, color: '#b0a890' },
      { x: -54.49, z: -93.46, w: 1.5, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: -42.99, z: -93.71, w: 18.5, h: 6, d: 0.5, y: 3, color: '#b0a890' },
      { x: -59.24, z: -91.71, w: 1, h: 6, d: 3.5, y: 3, color: '#b0a890' },
      { x: -51.49, z: -93.21, w: 0.5, h: 6, d: 0.5, y: 3, color: '#b0a890' },
      { x: -29.74, z: -93.21, w: 1, h: 6, d: 0.5, y: 3, color: '#b0a890' },
      { x: -11.49, z: -92.21, w: 0.5, h: 6, d: 2.5, y: 3, color: '#b0a890' },
      { x: -59.99, z: -91.46, w: 0.5, h: 6, d: 3, y: 3, color: '#b0a890' },
      { x: -11.99, z: -91.21, w: 0.5, h: 6, d: 3.5, y: 3, color: '#b0a890' },
      { x: -60.74, z: -91.21, w: 1, h: 6, d: 2.5, y: 3, color: '#b0a890' },
      { x: -12.74, z: -90.96, w: 1, h: 6, d: 3, y: 3, color: '#b0a890' },
      { x: -61.49, z: -89.96, w: 0.5, h: 6, d: 4, y: 3, color: '#b0a890' },
      { x: -10.99, z: -91.46, w: 0.5, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: -61.99, z: -89.71, w: 0.5, h: 6, d: 3.5, y: 3, color: '#b0a890' },
      { x: -13.49, z: -89.21, w: 0.5, h: 6, d: 4.5, y: 3, color: '#b0a890' },
      { x: -62.49, z: -89.46, w: 0.5, h: 6, d: 3, y: 3, color: '#b0a890' },
      { x: -13.99, z: -88.96, w: 0.5, h: 6, d: 4, y: 3, color: '#b0a890' },
      { x: -62.99, z: -87.96, w: 0.5, h: 6, d: 5, y: 3, color: '#b0a890' },
      { x: -63.49, z: -87.71, w: 0.5, h: 6, d: 4.5, y: 3, color: '#b0a890' },
      { x: -60.99, z: -88.96, w: 0.5, h: 6, d: 2, y: 3, color: '#b0a890' },
      { x: -14.49, z: -87.46, w: 0.5, h: 6, d: 5, y: 3, color: '#b0a890' },
      { x: -12.99, z: -88.96, w: 0.5, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: -63.99, z: -85.96, w: 0.5, h: 6, d: 6, y: 3, color: '#b0a890' },
      { x: -14.99, z: -85.96, w: 0.5, h: 6, d: 6, y: 3, color: '#b0a890' },
      { x: -64.49, z: -81.71, w: 0.5, h: 6, d: 12.5, y: 3, color: '#b0a890' },
      { x: -15.49, z: -85.46, w: 0.5, h: 6, d: 5, y: 3, color: '#b0a890' },
      { x: -64.99, z: -81.46, w: 0.5, h: 6, d: 12, y: 3, color: '#b0a890' },
      { x: -15.99, z: -83.71, w: 0.5, h: 6, d: 5.5, y: 3, color: '#b0a890' },
      { x: -65.49, z: -81.96, w: 0.5, h: 6, d: 8, y: 3, color: '#b0a890' },
      { x: -16.49, z: -82.96, w: 0.5, h: 6, d: 4, y: 3, color: '#b0a890' },
      { x: -16.99, z: -81.71, w: 0.5, h: 6, d: 5.5, y: 3, color: '#b0a890' },
      { x: -17.49, z: -80.96, w: 0.5, h: 6, d: 4, y: 3, color: '#b0a890' },
      { x: -17.99, z: -80.46, w: 0.5, h: 6, d: 4, y: 3, color: '#b0a890' },
      { x: -18.49, z: -79.46, w: 0.5, h: 6, d: 4, y: 3, color: '#b0a890' },
      { x: -18.99, z: -78.96, w: 0.5, h: 6, d: 3, y: 3, color: '#b0a890' },
      { x: -19.49, z: -78.46, w: 0.5, h: 6, d: 3, y: 3, color: '#b0a890' },
      { x: -19.99, z: -77.46, w: 0.5, h: 6, d: 4, y: 3, color: '#b0a890' },
      { x: -63.99, z: -76.21, w: 0.5, h: 6, d: 5.5, y: 3, color: '#b0a890' },
      { x: -20.49, z: -77.21, w: 0.5, h: 6, d: 3.5, y: 3, color: '#b0a890' },
      { x: -222.99, z: -77.96, w: 2.5, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: -212.24, z: -77.96, w: 3, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: -202.49, z: -77.46, w: 3.5, h: 6, d: 2, y: 3, color: '#b0a890' },
      { x: -188.74, z: -77.96, w: 23, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: -163.74, z: -77.96, w: 25, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: -145.74, z: -77.46, w: 8, h: 6, d: 2, y: 3, color: '#b0a890' },
      { x: -135.24, z: -77.96, w: 12, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: -20.99, z: -76.96, w: 0.5, h: 6, d: 3, y: 3, color: '#b0a890' },
      { x: -220.99, z: -77.21, w: 1.5, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -219.49, z: -77.21, w: 0.5, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -218.49, z: -77.21, w: 0.5, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -217.49, z: -77.21, w: 0.5, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -216.49, z: -77.21, w: 0.5, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -214.74, z: -77.21, w: 2, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -150.49, z: -77.21, w: 1.5, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -21.49, z: -76.21, w: 0.5, h: 6, d: 3.5, y: 3, color: '#b0a890' },
      { x: -223.74, z: -71.46, w: 1, h: 6, d: 12, y: 3, color: '#b0a890' },
      { x: -222.24, z: -76.96, w: 1, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: -213.49, z: -76.96, w: 0.5, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: -208.49, z: -76.96, w: 8.5, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: -199.99, z: -76.96, w: 1.5, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: -188.49, z: -76.96, w: 19.5, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: -176.49, z: -76.96, w: 2.5, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: -173.99, z: -76.96, w: 0.5, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: -164.74, z: -77.21, w: 4, h: 6, d: 0.5, y: 3, color: '#b0a890' },
      { x: -155.24, z: -76.96, w: 1, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: -152.49, z: -76.96, w: 2.5, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: -140.99, z: -76.96, w: 1.5, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: -134.99, z: -77.21, w: 9.5, h: 6, d: 0.5, y: 3, color: '#b0a890' },
      { x: -129.49, z: -71.46, w: 0.5, h: 6, d: 12, y: 3, color: '#b0a890' },
      { x: -63.49, z: -75.46, w: 0.5, h: 6, d: 4, y: 3, color: '#b0a890' },
      { x: -21.99, z: -75.96, w: 0.5, h: 6, d: 3, y: 3, color: '#b0a890' },
      { x: -173.49, z: -76.71, w: 0.5, h: 6, d: 0.5, y: 3, color: '#b0a890' },
      { x: -166.24, z: -76.71, w: 1, h: 6, d: 0.5, y: 3, color: '#b0a890' },
      { x: -162.99, z: -76.71, w: 0.5, h: 6, d: 0.5, y: 3, color: '#b0a890' },
      { x: -137.49, z: -76.71, w: 4.5, h: 6, d: 0.5, y: 3, color: '#b0a890' },
      { x: -133.99, z: -76.71, w: 1.5, h: 6, d: 0.5, y: 3, color: '#b0a890' },
      { x: -131.49, z: -76.71, w: 2.5, h: 6, d: 0.5, y: 3, color: '#b0a890' },
      { x: -62.99, z: -75.21, w: 0.5, h: 6, d: 3.5, y: 3, color: '#b0a890' },
      { x: -22.49, z: -75.71, w: 0.5, h: 6, d: 2.5, y: 3, color: '#b0a890' },
      { x: -23.24, z: -75.46, w: 1, h: 6, d: 2, y: 3, color: '#b0a890' },
      { x: -23.99, z: -74.71, w: 0.5, h: 6, d: 2.5, y: 3, color: '#b0a890' },
      { x: -62.49, z: -73.71, w: 0.5, h: 6, d: 3.5, y: 3, color: '#b0a890' },
      { x: -24.74, z: -74.46, w: 1, h: 6, d: 2, y: 3, color: '#b0a890' },
      { x: -61.99, z: -73.46, w: 0.5, h: 6, d: 3, y: 3, color: '#b0a890' },
      { x: -25.74, z: -73.46, w: 1, h: 6, d: 3, y: 3, color: '#b0a890' },
      { x: -61.49, z: -73.21, w: 0.5, h: 6, d: 2.5, y: 3, color: '#b0a890' },
      { x: -26.49, z: -73.21, w: 0.5, h: 6, d: 2.5, y: 3, color: '#b0a890' },
      { x: -23.49, z: -73.96, w: 0.5, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: -60.74, z: -72.46, w: 1, h: 6, d: 3, y: 3, color: '#b0a890' },
      { x: -27.49, z: -72.46, w: 1.5, h: 6, d: 3, y: 3, color: '#b0a890' },
      { x: -59.99, z: -72.21, w: 0.5, h: 6, d: 2.5, y: 3, color: '#b0a890' },
      { x: -28.49, z: -72.21, w: 0.5, h: 6, d: 2.5, y: 3, color: '#b0a890' },
      { x: -24.99, z: -72.71, w: 0.5, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -59.24, z: -71.46, w: 1, h: 6, d: 3, y: 3, color: '#b0a890' },
      { x: -29.49, z: -71.71, w: 1.5, h: 6, d: 2.5, y: 3, color: '#b0a890' },
      { x: -30.49, z: -71.46, w: 0.5, h: 6, d: 2, y: 3, color: '#b0a890' },
      { x: -57.99, z: -70.96, w: 1.5, h: 6, d: 2, y: 3, color: '#b0a890' },
      { x: -31.49, z: -70.71, w: 1.5, h: 6, d: 2.5, y: 3, color: '#b0a890' },
      { x: -56.99, z: -70.21, w: 0.5, h: 6, d: 2.5, y: 3, color: '#b0a890' },
      { x: -32.99, z: -70.46, w: 1.5, h: 6, d: 2, y: 3, color: '#b0a890' },
      { x: -56.24, z: -69.71, w: 1, h: 6, d: 2.5, y: 3, color: '#b0a890' },
      { x: -34.24, z: -69.96, w: 1, h: 6, d: 2, y: 3, color: '#b0a890' },
      { x: -54.99, z: -69.46, w: 1.5, h: 6, d: 2, y: 3, color: '#b0a890' },
      { x: -35.49, z: -69.71, w: 1.5, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -57.74, z: -69.71, w: 1, h: 6, d: 0.5, y: 3, color: '#b0a890' },
      { x: -53.49, z: -68.96, w: 1.5, h: 6, d: 2, y: 3, color: '#b0a890' },
      { x: -37.24, z: -68.96, w: 2, h: 6, d: 2, y: 3, color: '#b0a890' },
      { x: -51.74, z: -68.46, w: 2, h: 6, d: 2, y: 3, color: '#b0a890' },
      { x: -39.49, z: -68.46, w: 2.5, h: 6, d: 2, y: 3, color: '#b0a890' },
      { x: -33.24, z: -69.21, w: 1, h: 6, d: 0.5, y: 3, color: '#b0a890' },
      { x: -48.99, z: -67.96, w: 3.5, h: 6, d: 2, y: 3, color: '#b0a890' },
      { x: -45.99, z: -67.96, w: 0.5, h: 6, d: 2, y: 3, color: '#b0a890' },
      { x: -42.74, z: -68.21, w: 4, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -35.74, z: -68.46, w: 1, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: -54.74, z: -68.21, w: 1, h: 6, d: 0.5, y: 3, color: '#b0a890' },
      { x: -46.74, z: -67.71, w: 1, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -45.24, z: -67.71, w: 1, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -118.49, z: -54.96, w: 1.5, h: 6, d: 26, y: 3, color: '#b0a890' },
      { x: -53.24, z: -67.71, w: 1, h: 6, d: 0.5, y: 3, color: '#b0a890' },
      { x: -37.74, z: -67.71, w: 1, h: 6, d: 0.5, y: 3, color: '#b0a890' },
      { x: -226.74, z: -66.71, w: 5, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -222.74, z: -59.46, w: 1, h: 6, d: 16, y: 3, color: '#b0a890' },
      { x: -130.24, z: -59.46, w: 1, h: 6, d: 16, y: 3, color: '#b0a890' },
      { x: -126.49, z: -66.71, w: 5.5, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -51.24, z: -67.21, w: 1, h: 6, d: 0.5, y: 3, color: '#b0a890' },
      { x: -43.24, z: -67.21, w: 3, h: 6, d: 0.5, y: 3, color: '#b0a890' },
      { x: -227.24, z: -64.21, w: 4, h: 6, d: 3.5, y: 3, color: '#b0a890' },
      { x: -125.74, z: -64.21, w: 4, h: 6, d: 3.5, y: 3, color: '#b0a890' },
      { x: -223.49, z: -52.46, w: 0.5, h: 6, d: 26, y: 3, color: '#b0a890' },
      { x: -223.99, z: -63.46, w: 0.5, h: 6, d: 2, y: 3, color: '#b0a890' },
      { x: -129.49, z: -63.46, w: 0.5, h: 6, d: 2, y: 3, color: '#b0a890' },
      { x: -224.74, z: -63.46, w: 1, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: -128.49, z: -63.21, w: 1.5, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -224.99, z: -62.71, w: 0.5, h: 6, d: 0.5, y: 3, color: '#b0a890' },
      { x: -176.74, z: -62.46, w: 47, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: -199.74, z: -58.46, w: 1, h: 6, d: 7, y: 3, color: '#b0a890' },
      { x: -153.49, z: -58.46, w: 0.5, h: 6, d: 7, y: 3, color: '#b0a890' },
      { x: -85.49, z: -53.46, w: 1.5, h: 6, d: 17, y: 3, color: '#b0a890' },
      { x: -126.74, z: -56.21, w: 6, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -223.99, z: -54.96, w: 0.5, h: 6, d: 2, y: 3, color: '#b0a890' },
      { x: -176.49, z: -55.46, w: 45.5, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: -226.74, z: -54.71, w: 5, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -129.24, z: -54.71, w: 1, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -125.74, z: -53.21, w: 4, h: 6, d: 4.5, y: 3, color: '#b0a890' },
      { x: -227.24, z: -52.46, w: 4, h: 6, d: 3, y: 3, color: '#b0a890' },
      { x: -224.49, z: -51.71, w: 1.5, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -129.49, z: -45.96, w: 0.5, h: 6, d: 13, y: 3, color: '#b0a890' },
      { x: -127.99, z: -46.46, w: 0.5, h: 6, d: 12, y: 3, color: '#b0a890' },
      { x: -128.74, z: -46.21, w: 1, h: 6, d: 11.5, y: 3, color: '#b0a890' },
      { x: -223.99, z: -45.21, w: 0.5, h: 6, d: 11.5, y: 3, color: '#b0a890' },
      { x: -209.24, z: -44.46, w: 7, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: -144.24, z: -44.21, w: 7, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -140.49, z: -39.46, w: 0.5, h: 6, d: 10, y: 3, color: '#b0a890' },
      { x: -212.24, z: -39.71, w: 1, h: 6, d: 8.5, y: 3, color: '#b0a890' },
      { x: -205.99, z: -39.46, w: 0.5, h: 6, d: 9, y: 3, color: '#b0a890' },
      { x: -147.24, z: -39.21, w: 1, h: 6, d: 8.5, y: 3, color: '#b0a890' },
      { x: -140.99, z: -39.21, w: 0.5, h: 6, d: 8.5, y: 3, color: '#b0a890' },
      { x: -177.74, z: -38.96, w: 1, h: 6, d: 8, y: 3, color: '#b0a890' },
      { x: -175.24, z: -38.71, w: 1, h: 6, d: 8.5, y: 3, color: '#b0a890' },
      { x: -199.49, z: -40.96, w: 0.5, h: 6, d: 3, y: 3, color: '#b0a890' },
      { x: -176.49, z: -41.46, w: 1.5, h: 6, d: 2, y: 3, color: '#b0a890' },
      { x: -153.49, z: -40.96, w: 0.5, h: 6, d: 3, y: 3, color: '#b0a890' },
      { x: -203.24, z: -41.21, w: 5, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -199.99, z: -40.71, w: 0.5, h: 6, d: 2.5, y: 3, color: '#b0a890' },
      { x: -188.49, z: -41.21, w: 19.5, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -164.49, z: -40.71, w: 19.5, h: 6, d: 2.5, y: 3, color: '#b0a890' },
      { x: -150.49, z: -41.21, w: 5.5, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -217.74, z: -40.46, w: 10, h: 6, d: 2, y: 3, color: '#b0a890' },
      { x: -134.99, z: -40.96, w: 9.5, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: -222.99, z: -40.21, w: 0.5, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -200.49, z: -40.46, w: 0.5, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: -198.74, z: -40.21, w: 1, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -178.49, z: -40.21, w: 0.5, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -174.49, z: -40.21, w: 0.5, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -154.24, z: -40.21, w: 1, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -139.99, z: -39.21, w: 0.5, h: 6, d: 3.5, y: 3, color: '#b0a890' },
      { x: -129.99, z: -40.21, w: 0.5, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -205.49, z: -37.71, w: 0.5, h: 6, d: 5.5, y: 3, color: '#b0a890' },
      { x: -201.74, z: -39.96, w: 2, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: -197.99, z: -39.96, w: 0.5, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: -188.49, z: -40.21, w: 1.5, h: 6, d: 0.5, y: 3, color: '#b0a890' },
      { x: -179.24, z: -39.96, w: 1, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: -175.99, z: -39.96, w: 0.5, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: -151.49, z: -39.96, w: 1.5, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: -139.49, z: -38.96, w: 0.5, h: 6, d: 3, y: 3, color: '#b0a890' },
      { x: -130.74, z: -39.96, w: 1, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: -197.49, z: -39.71, w: 0.5, h: 6, d: 0.5, y: 3, color: '#b0a890' },
      { x: -213.24, z: -38.46, w: 1, h: 6, d: 2, y: 3, color: '#b0a890' },
      { x: -202.24, z: -38.46, w: 1, h: 6, d: 2, y: 3, color: '#b0a890' },
      { x: -151.24, z: -38.46, w: 1, h: 6, d: 2, y: 3, color: '#b0a890' },
      { x: -208.99, z: -37.96, w: 5.5, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: -203.99, z: -37.96, w: 2.5, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: -149.24, z: -37.96, w: 3, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: -143.99, z: -37.96, w: 5.5, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: -212.99, z: -36.21, w: 0.5, h: 6, d: 2.5, y: 3, color: '#b0a890' },
      { x: -212.49, z: -35.21, w: 0.5, h: 6, d: 0.5, y: 3, color: '#b0a890' },
      { x: -177.99, z: -34.71, w: 0.5, h: 6, d: 0.5, y: 3, color: '#b0a890' },
      { x: -147.49, z: -34.71, w: 0.5, h: 6, d: 0.5, y: 3, color: '#b0a890' },
      { x: -117.74, z: -24.21, w: 1, h: 6, d: 13.5, y: 3, color: '#b0a890' },
      { x: -110.24, z: -29.21, w: 11, h: 6, d: 3.5, y: 3, color: '#b0a890' },
      { x: -116.49, z: -23.71, w: 1.5, h: 6, d: 12.5, y: 3, color: '#b0a890' },
      { x: -72.99, z: -27.96, w: 63.5, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: 76.01, z: -27.21, w: 4.5, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -114.99, z: -26.96, w: 1.5, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: -81.49, z: -27.21, w: 54.5, h: 6, d: 0.5, y: 3, color: '#b0a890' },
      { x: -48.24, z: -27.21, w: 5, h: 6, d: 0.5, y: 3, color: '#b0a890' },
      { x: -41.74, z: -21.21, w: 1, h: 6, d: 12.5, y: 3, color: '#b0a890' },
      { x: 78.51, z: -25.71, w: 0.5, h: 6, d: 3.5, y: 3, color: '#b0a890' },
      { x: -109.74, z: -26.46, w: 9, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: -115.49, z: -21.46, w: 0.5, h: 6, d: 10, y: 3, color: '#b0a890' },
      { x: -114.49, z: -22.21, w: 0.5, h: 6, d: 8.5, y: 3, color: '#b0a890' },
      { x: 74.26, z: -25.21, w: 1, h: 6, d: 2.5, y: 3, color: '#b0a890' },
      { x: 78.01, z: -25.21, w: 0.5, h: 6, d: 2.5, y: 3, color: '#b0a890' },
      { x: -113.99, z: -21.96, w: 0.5, h: 6, d: 8, y: 3, color: '#b0a890' },
      { x: -164.99, z: -24.96, w: 62.5, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: 76.26, z: -24.46, w: 3, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: -195.99, z: -17.46, w: 0.5, h: 6, d: 14, y: 3, color: '#b0a890' },
      { x: -133.99, z: -10.21, w: 0.5, h: 6, d: 28.5, y: 3, color: '#b0a890' },
      { x: -114.99, z: -20.46, w: 0.5, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: -114.99, z: -18.46, w: 0.5, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: -94.24, z: -17.21, w: 5, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -87.49, z: -17.21, w: 1.5, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -82.99, z: -17.21, w: 1.5, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -78.24, z: -17.21, w: 1, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -73.49, z: -17.21, w: 1.5, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -68.99, z: -17.21, w: 1.5, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -64.24, z: -17.21, w: 1, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -59.74, z: -17.21, w: 1, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -44.99, z: -17.21, w: 5.5, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -113.74, z: -16.96, w: 3, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: -97.24, z: -16.96, w: 1, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: -89.99, z: -16.96, w: 3.5, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: -85.24, z: -16.96, w: 3, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: -80.49, z: -16.96, w: 3.5, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: -75.99, z: -16.96, w: 3.5, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: -71.24, z: -16.96, w: 3, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: -66.49, z: -16.96, w: 3.5, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: -61.99, z: -16.96, w: 3.5, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: -58.99, z: -16.96, w: 0.5, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: -51.74, z: -16.96, w: 8, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: -111.99, z: -4.71, w: 0.5, h: 6, d: 24.5, y: 3, color: '#b0a890' },
      { x: -112.49, z: -4.46, w: 0.5, h: 6, d: 24, y: 3, color: '#b0a890' },
      { x: -96.74, z: -4.46, w: 1, h: 6, d: 24, y: 3, color: '#b0a890' },
      { x: -91.74, z: -15.46, w: 2, h: 6, d: 2, y: 3, color: '#b0a890' },
      { x: -60.74, z: -4.46, w: 1, h: 6, d: 24, y: 3, color: '#b0a890' },
      { x: -48.74, z: -15.71, w: 3, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -42.74, z: -15.71, w: 1, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -134.74, z: -13.71, w: 1, h: 6, d: 4.5, y: 3, color: '#b0a890' },
      { x: -133.24, z: -13.71, w: 1, h: 6, d: 4.5, y: 3, color: '#b0a890' },
      { x: -97.49, z: -4.96, w: 0.5, h: 6, d: 22, y: 3, color: '#b0a890' },
      { x: -199.74, z: -14.96, w: 7, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: -93.74, z: -14.96, w: 2, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: -76.49, z: -14.96, w: 28.5, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: -49.74, z: -3.71, w: 1, h: 6, d: 22.5, y: 3, color: '#b0a890' },
      { x: -48.24, z: -14.71, w: 1, h: 6, d: 0.5, y: 3, color: '#b0a890' },
      { x: -42.24, z: -14.71, w: 1, h: 6, d: 0.5, y: 3, color: '#b0a890' },
      { x: -202.74, z: -9.46, w: 1, h: 6, d: 10, y: 3, color: '#b0a890' },
      { x: -196.74, z: -14.21, w: 1, h: 6, d: 0.5, y: 3, color: '#b0a890' },
      { x: -94.49, z: -4.46, w: 0.5, h: 6, d: 20, y: 3, color: '#b0a890' },
      { x: -62.74, z: -4.71, w: 1, h: 6, d: 19.5, y: 3, color: '#b0a890' },
      { x: -196.49, z: -8.71, w: 0.5, h: 6, d: 10.5, y: 3, color: '#b0a890' },
      { x: -196.99, z: -8.21, w: 0.5, h: 6, d: 9.5, y: 3, color: '#b0a890' },
      { x: -204.49, z: -11.46, w: 2.5, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: -201.99, z: -8.21, w: 0.5, h: 6, d: 7.5, y: 3, color: '#b0a890' },
      { x: -194.74, z: -11.46, w: 2, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: -193.49, z: -7.46, w: 0.5, h: 6, d: 8, y: 3, color: '#b0a890' },
      { x: -205.24, z: -7.71, w: 1, h: 6, d: 6.5, y: 3, color: '#b0a890' },
      { x: -194.24, z: -7.21, w: 1, h: 6, d: 7.5, y: 3, color: '#b0a890' },
      { x: -95.49, z: -7.21, w: 1.5, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -61.74, z: -7.21, w: 1, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -203.99, z: -5.21, w: 1.5, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -201.49, z: -5.21, w: 0.5, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -199.24, z: -4.96, w: 4, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: -195.49, z: -4.46, w: 1.5, h: 6, d: 2, y: 3, color: '#b0a890' },
      { x: -198.74, z: -4.21, w: 3, h: 6, d: 0.5, y: 3, color: '#b0a890' },
      { x: -95.49, z: -2.46, w: 1.5, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: -61.74, z: -2.46, w: 1, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: -78.74, z: 4.54, w: 31, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: -95.49, z: 5.04, w: 1.5, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: -45.99, z: 6.04, w: 6.5, h: 6, d: 3, y: 3, color: '#b0a890' },
      { x: -114.24, z: 5.54, w: 3, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: -92.74, z: 5.29, w: 3, h: 6, d: 0.5, y: 3, color: '#b0a890' },
      { x: -91.74, z: 6.54, w: 1, h: 6, d: 2, y: 3, color: '#b0a890' },
      { x: -115.24, z: 9.29, w: 1, h: 6, d: 6.5, y: 3, color: '#b0a890' },
      { x: -94.24, z: 6.79, w: 4, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -76.24, z: 6.79, w: 30, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -55.24, z: 6.79, w: 10, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -33.99, z: 6.79, w: 17.5, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -32.74, z: 14.79, w: 1, h: 6, d: 14.5, y: 3, color: '#b0a890' },
      { x: -25.49, z: 14.04, w: 0.5, h: 6, d: 13, y: 3, color: '#b0a890' },
      { x: -107.74, z: 12.04, w: 14, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: -110.24, z: 12.79, w: 9, h: 6, d: 0.5, y: 3, color: '#b0a890' },
      { x: -101.24, z: 17.29, w: 1, h: 6, d: 9.5, y: 3, color: '#b0a890' },
      { x: -111.99, z: 13.79, w: 4.5, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -112.99, z: 18.04, w: 2.5, h: 6, d: 7, y: 3, color: '#b0a890' },
      { x: -110.49, z: 16.29, w: 1.5, h: 6, d: 3.5, y: 3, color: '#b0a890' },
      { x: -111.49, z: 15.79, w: 0.5, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -111.49, z: 17.79, w: 0.5, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -105.74, z: 17.54, w: 8, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: -80.74, z: 17.79, w: 40, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -58.24, z: 17.79, w: 4, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -53.74, z: 17.79, w: 4, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -42.24, z: 17.54, w: 18, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: -60.49, z: 18.04, w: 0.5, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: -55.99, z: 18.04, w: 0.5, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: -51.49, z: 18.04, w: 0.5, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: -110.99, z: 20.04, w: 0.5, h: 6, d: 4, y: 3, color: '#b0a890' },
      { x: -48.74, z: 18.29, w: 5, h: 6, d: 0.5, y: 3, color: '#b0a890' },
      { x: -38.24, z: 18.29, w: 10, h: 6, d: 0.5, y: 3, color: '#b0a890' },
      { x: -110.24, z: 20.29, w: 1, h: 6, d: 3.5, y: 3, color: '#b0a890' },
      { x: -96.24, z: 19.79, w: 1, h: 6, d: 2.5, y: 3, color: '#b0a890' },
      { x: -91.74, z: 19.79, w: 1, h: 6, d: 2.5, y: 3, color: '#b0a890' },
      { x: -87.24, z: 19.79, w: 1, h: 6, d: 2.5, y: 3, color: '#b0a890' },
      { x: -78.24, z: 19.29, w: 10, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -72.24, z: 19.29, w: 1, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -111.49, z: 20.54, w: 0.5, h: 6, d: 3, y: 3, color: '#b0a890' },
      { x: -105.74, z: 20.54, w: 8, h: 6, d: 3, y: 3, color: '#b0a890' },
      { x: -98.74, z: 20.04, w: 4, h: 6, d: 2, y: 3, color: '#b0a890' },
      { x: -93.99, z: 20.04, w: 3.5, h: 6, d: 2, y: 3, color: '#b0a890' },
      { x: -89.49, z: 20.04, w: 3.5, h: 6, d: 2, y: 3, color: '#b0a890' },
      { x: -84.99, z: 20.04, w: 3.5, h: 6, d: 2, y: 3, color: '#b0a890' },
      { x: -72.99, z: 19.54, w: 0.5, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: -28.99, z: 20.04, w: 6.5, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: -81.74, z: 20.29, w: 3, h: 6, d: 0.5, y: 3, color: '#b0a890' },
      { x: -82.49, z: 20.79, w: 1.5, h: 6, d: 0.5, y: 3, color: '#b0a890' },
      { x: -80.74, z: 21.29, w: 1, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -29.74, z: 21.04, w: 1, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: -100.49, z: 21.29, w: 0.5, h: 6, d: 0.5, y: 3, color: '#b0a890' },
      { x: -98.74, z: 21.29, w: 1, h: 6, d: 0.5, y: 3, color: '#b0a890' },
      { x: -96.74, z: 21.29, w: 1, h: 6, d: 0.5, y: 3, color: '#b0a890' },
      { x: -94.74, z: 21.29, w: 1, h: 6, d: 0.5, y: 3, color: '#b0a890' },
      { x: -92.74, z: 21.29, w: 1, h: 6, d: 0.5, y: 3, color: '#b0a890' },
      { x: -90.74, z: 21.29, w: 1, h: 6, d: 0.5, y: 3, color: '#b0a890' },
      { x: -88.74, z: 21.29, w: 1, h: 6, d: 0.5, y: 3, color: '#b0a890' },
      { x: -86.74, z: 21.29, w: 1, h: 6, d: 0.5, y: 3, color: '#b0a890' },
      { x: -84.49, z: 21.29, w: 1.5, h: 6, d: 0.5, y: 3, color: '#b0a890' },
      { x: -81.99, z: 21.29, w: 1.5, h: 6, d: 0.5, y: 3, color: '#b0a890' },
      { x: -112.24, z: 21.79, w: 1, h: 6, d: 0.5, y: 3, color: '#b0a890' },
      { x: -81.49, z: 21.79, w: 0.5, h: 6, d: 0.5, y: 3, color: '#b0a890' },
      { x: -29.49, z: 21.79, w: 0.5, h: 6, d: 0.5, y: 3, color: '#b0a890' },
      { x: -2.49, z: 35.54, w: 5.5, h: 6, d: 2, y: 3, color: '#b0a890' },
      { x: -4.24, z: 39.04, w: 2, h: 6, d: 5, y: 3, color: '#b0a890' },
      { x: -2.49, z: 36.79, w: 0.5, h: 6, d: 0.5, y: 3, color: '#b0a890' },
      { x: -0.74, z: 39.04, w: 2, h: 6, d: 5, y: 3, color: '#b0a890' },
      { x: -2.49, z: 40.04, w: 0.5, h: 6, d: 3, y: 3, color: '#b0a890' },
      { x: -2.99, z: 40.54, w: 0.5, h: 6, d: 2, y: 3, color: '#b0a890' },
      { x: -1.99, z: 40.54, w: 0.5, h: 6, d: 2, y: 3, color: '#b0a890' },
      { x: -107.49, z: 53.54, w: 2.5, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: -59.24, z: 53.79, w: 3, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -108.99, z: 54.79, w: 0.5, h: 6, d: 2.5, y: 3, color: '#b0a890' },
      { x: -105.99, z: 56.04, w: 0.5, h: 6, d: 5, y: 3, color: '#b0a890' },
      { x: -60.99, z: 58.29, w: 0.5, h: 6, d: 9.5, y: 3, color: '#b0a890' },
      { x: -57.49, z: 56.29, w: 0.5, h: 6, d: 5.5, y: 3, color: '#b0a890' },
      { x: -109.49, z: 58.29, w: 0.5, h: 6, d: 8.5, y: 3, color: '#b0a890' },
      { x: -108.24, z: 54.29, w: 1, h: 6, d: 0.5, y: 3, color: '#b0a890' },
      { x: -106.74, z: 54.29, w: 1, h: 6, d: 0.5, y: 3, color: '#b0a890' },
      { x: -108.49, z: 54.79, w: 0.5, h: 6, d: 0.5, y: 3, color: '#b0a890' },
      { x: -106.49, z: 55.04, w: 0.5, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: -105.49, z: 56.54, w: 0.5, h: 6, d: 4, y: 3, color: '#b0a890' },
      { x: -60.24, z: 54.79, w: 1, h: 6, d: 0.5, y: 3, color: '#b0a890' },
      { x: -57.99, z: 55.04, w: 0.5, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: -56.99, z: 56.79, w: 0.5, h: 6, d: 4.5, y: 3, color: '#b0a890' },
      { x: -70.74, z: 56.29, w: 4, h: 6, d: 2.5, y: 3, color: '#b0a890' },
      { x: -61.49, z: 59.04, w: 0.5, h: 6, d: 8, y: 3, color: '#b0a890' },
      { x: -60.49, z: 55.29, w: 0.5, h: 6, d: 0.5, y: 3, color: '#b0a890' },
      { x: -81.49, z: 56.04, w: 17.5, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: -66.24, z: 56.54, w: 5, h: 6, d: 2, y: 3, color: '#b0a890' },
      { x: -103.99, z: 57.29, w: 2.5, h: 6, d: 2.5, y: 3, color: '#b0a890' },
      { x: -89.99, z: 58.79, w: 0.5, h: 6, d: 4.5, y: 3, color: '#b0a890' },
      { x: -80.99, z: 57.04, w: 16.5, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: -55.74, z: 57.79, w: 2, h: 6, d: 2.5, y: 3, color: '#b0a890' },
      { x: -98.74, z: 57.79, w: 8, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -88.49, z: 59.29, w: 1.5, h: 6, d: 3.5, y: 3, color: '#b0a890' },
      { x: -66.24, z: 62.79, w: 1, h: 6, d: 10.5, y: 3, color: '#b0a890' },
      { x: -50.74, z: 58.29, w: 8, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -95.24, z: 71.04, w: 1, h: 6, d: 25, y: 3, color: '#b0a890' },
      { x: -47.24, z: 76.54, w: 1, h: 6, d: 35, y: 3, color: '#b0a890' },
      { x: -89.49, z: 60.54, w: 0.5, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: -87.49, z: 62.04, w: 0.5, h: 6, d: 3, y: 3, color: '#b0a890' },
      { x: -88.24, z: 64.54, w: 1, h: 6, d: 7, y: 3, color: '#b0a890' },
      { x: -111.74, z: 62.04, w: 4, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: -113.99, z: 62.79, w: 0.5, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -58.99, z: 62.54, w: 3.5, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: -113.24, z: 75.04, w: 1, h: 6, d: 25, y: 3, color: '#b0a890' },
      { x: -89.49, z: 63.29, w: 1.5, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -57.49, z: 69.29, w: 0.5, h: 6, d: 12.5, y: 3, color: '#b0a890' },
      { x: -89.99, z: 73.79, w: 0.5, h: 6, d: 19.5, y: 3, color: '#b0a890' },
      { x: -88.99, z: 69.79, w: 0.5, h: 6, d: 11.5, y: 3, color: '#b0a890' },
      { x: -77.24, z: 67.04, w: 21, h: 6, d: 2, y: 3, color: '#b0a890' },
      { x: -83.74, z: 69.04, w: 1, h: 6, d: 2, y: 3, color: '#b0a890' },
      { x: -79.74, z: 69.04, w: 1, h: 6, d: 2, y: 3, color: '#b0a890' },
      { x: -81.74, z: 69.54, w: 3, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: -113.99, z: 70.29, w: 0.5, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -113.99, z: 74.79, w: 0.5, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -92.49, z: 74.79, w: 4.5, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -78.49, z: 74.79, w: 19.5, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -63.49, z: 74.79, w: 1.5, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -57.99, z: 74.79, w: 0.5, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -89.49, z: 75.04, w: 0.5, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: -88.49, z: 75.04, w: 0.5, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: -66.49, z: 75.04, w: 4.5, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: -60.49, z: 75.04, w: 4.5, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: -92.74, z: 75.79, w: 4, h: 6, d: 0.5, y: 3, color: '#b0a890' },
      { x: -73.49, z: 75.79, w: 2.5, h: 6, d: 0.5, y: 3, color: '#b0a890' },
      { x: -94.49, z: 79.79, w: 0.5, h: 6, d: 7.5, y: 3, color: '#b0a890' },
      { x: -91.49, z: 76.54, w: 1.5, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: -91.24, z: 80.29, w: 1, h: 6, d: 6.5, y: 3, color: '#b0a890' },
      { x: -113.99, z: 82.79, w: 0.5, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -92.99, z: 82.79, w: 2.5, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -90.49, z: 83.04, w: 0.5, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: -48.99, z: 83.04, w: 2.5, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: -46.49, z: 84.04, w: 0.5, h: 6, d: 3, y: 3, color: '#b0a890' },
      { x: -49.99, z: 84.54, w: 0.5, h: 6, d: 2, y: 3, color: '#b0a890' },
      { x: -48.74, z: 85.04, w: 2, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: -113.99, z: 86.79, w: 0.5, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -90.99, z: 91.79, w: 0.5, h: 6, d: 11.5, y: 3, color: '#b0a890' },
      { x: -110.99, z: 87.04, w: 3.5, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: -91.49, z: 92.04, w: 0.5, h: 6, d: 11, y: 3, color: '#b0a890' },
      { x: -90.49, z: 91.79, w: 0.5, h: 6, d: 10.5, y: 3, color: '#b0a890' },
      { x: -109.49, z: 90.04, w: 0.5, h: 6, d: 5, y: 3, color: '#b0a890' },
      { x: -111.74, z: 92.04, w: 4, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: -49.49, z: 92.79, w: 3.5, h: 6, d: 2.5, y: 3, color: '#b0a890' },
      { x: -113.99, z: 94.04, w: 0.5, h: 6, d: 4, y: 3, color: '#b0a890' },
      { x: -69.24, z: 93.04, w: 36, h: 6, d: 2, y: 3, color: '#b0a890' },
      { x: -112.99, z: 92.79, w: 1.5, h: 6, d: 0.5, y: 3, color: '#b0a890' },
      { x: -113.24, z: 93.29, w: 1, h: 6, d: 0.5, y: 3, color: '#b0a890' },
      { x: -100.74, z: 93.54, w: 11, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: -114.49, z: 94.29, w: 0.5, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -113.49, z: 94.79, w: 0.5, h: 6, d: 2.5, y: 3, color: '#b0a890' },
      { x: -105.74, z: 95.79, w: 1, h: 6, d: 3.5, y: 3, color: '#b0a890' },
      { x: -104.49, z: 95.79, w: 0.5, h: 6, d: 3.5, y: 3, color: '#b0a890' },
      { x: -96.74, z: 95.79, w: 1, h: 6, d: 3.5, y: 3, color: '#b0a890' },
      { x: -95.49, z: 95.79, w: 0.5, h: 6, d: 3.5, y: 3, color: '#b0a890' },
      { x: -86.99, z: 95.29, w: 0.5, h: 6, d: 2.5, y: 3, color: '#b0a890' },
      { x: -109.74, z: 95.79, w: 7, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -88.74, z: 95.79, w: 3, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -93.49, z: 96.54, w: 3.5, h: 6, d: 2, y: 3, color: '#b0a890' },
      { x: -104.99, z: 96.79, w: 0.5, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -100.74, z: 96.79, w: 7, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -95.99, z: 96.79, w: 0.5, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -107.24, z: 96.79, w: 2, h: 6, d: 0.5, y: 3, color: '#b0a890' },
      { x: -96.99, z: 111.79, w: 2.5, h: 6, d: 3.5, y: 3, color: '#b0a890' },
      { x: -89.99, z: 110.54, w: 5.5, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: -98.49, z: 111.79, w: 0.5, h: 6, d: 2.5, y: 3, color: '#b0a890' },
      { x: -95.49, z: 111.79, w: 0.5, h: 6, d: 2.5, y: 3, color: '#b0a890' },
      { x: -92.24, z: 112.29, w: 1, h: 6, d: 2.5, y: 3, color: '#b0a890' },
      { x: -87.74, z: 112.29, w: 1, h: 6, d: 2.5, y: 3, color: '#b0a890' },
      { x: -89.99, z: 112.79, w: 3.5, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: 115.51, z: 117.29, w: 8.5, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: 111.76, z: 120.04, w: 1, h: 6, d: 4, y: 3, color: '#b0a890' },
      { x: 119.51, z: 120.04, w: 0.5, h: 6, d: 4, y: 3, color: '#b0a890' },
      { x: 115.76, z: 121.54, w: 7, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: 11.51, z: 128.54, w: 4.5, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: 9.76, z: 149.29, w: 1, h: 6, d: 40.5, y: 3, color: '#b0a890' },
      { x: 13.26, z: 149.29, w: 1, h: 6, d: 40.5, y: 3, color: '#b0a890' },
      { x: 0.26, z: 151.04, w: 1, h: 6, d: 2, y: 3, color: '#b0a890' },
      { x: -6.49, z: 151.29, w: 12.5, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: 4.26, z: 151.29, w: 7, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -12.24, z: 159.54, w: 1, h: 6, d: 15, y: 3, color: '#b0a890' },
      { x: 7.26, z: 155.04, w: 1, h: 6, d: 6, y: 3, color: '#b0a890' },
      { x: 0.51, z: 157.29, w: 12.5, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -5.24, z: 162.54, w: 1, h: 6, d: 9, y: 3, color: '#b0a890' },
      { x: -126.49, z: 162.29, w: 12.5, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -132.99, z: 165.54, w: 0.5, h: 6, d: 7, y: 3, color: '#b0a890' },
      { x: -132.49, z: 166.04, w: 0.5, h: 6, d: 6, y: 3, color: '#b0a890' },
      { x: -120.49, z: 166.04, w: 0.5, h: 6, d: 6, y: 3, color: '#b0a890' },
      { x: -8.74, z: 166.29, w: 6, h: 6, d: 1.5, y: 3, color: '#b0a890' },
      { x: -126.49, z: 168.54, w: 11.5, h: 6, d: 1, y: 3, color: '#b0a890' },
      { x: 11.51, z: 168.79, w: 2.5, h: 6, d: 1.5, y: 3, color: '#b0a890' },
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
