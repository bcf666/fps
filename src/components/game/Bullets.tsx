import { useRef, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { useGameStore } from '../../stores/gameStore'
import { network } from '../../network/websocket'
import { checkLineWallIntersection, BULLET_RADIUS, ALL_COLLIDERS } from '../../config/mapConfig'
import { WEAPONS } from '../../config/weapons'
import { applyHit } from '../../game/solo/soloCombat'

interface ActiveBullet {
  id: string
  ownerId: string
  px: number
  py: number
  pz: number
  dx: number
  dy: number
  dz: number
  damage: number
  createdAt: number
  mesh: THREE.Mesh
}

const BULLET_SPEED = 100
const BULLET_LIFETIME = 3000
const HIT_RADIUS = 0.9

function segmentCapsuleIntersection(
  sx: number, sy: number, sz: number,
  dirX: number, dirY: number, dirZ: number,
  maxLen: number,
  capSx: number, capSy: number, capSz: number,
  capEx: number, capEy: number, capEz: number,
  radius: number
): number | null {
  const abX = capEx - capSx
  const abY = capEy - capSy
  const abZ = capEz - capSz
  const abLenSq = abX * abX + abY * abY + abZ * abZ

  if (abLenSq < 0.000001) {
    const aoX = sx - capSx
    const aoY = sy - capSy
    const aoZ = sz - capSz
    const a = dirX * dirX + dirY * dirY + dirZ * dirZ
    const b = 2 * (aoX * dirX + aoY * dirY + aoZ * dirZ)
    const c = aoX * aoX + aoY * aoY + aoZ * aoZ - radius * radius
    const disc = b * b - 4 * a * c
    if (disc < 0) return null
    const t = (-b - Math.sqrt(disc)) / (2 * a)
    return (t >= 0 && t <= maxLen) ? t : null
  }

  const abLen = Math.sqrt(abLenSq)
  const abNormX = abX / abLen
  const abNormY = abY / abLen
  const abNormZ = abZ / abLen

  const aoX = sx - capSx
  const aoY = sy - capSy
  const aoZ = sz - capSz
  const abDoA = aoX * abNormX + aoY * abNormY + aoZ * abNormZ
  const projA = Math.max(0, Math.min(abLen, abDoA))
  const closestX = capSx + abNormX * projA
  const closestY = capSy + abNormY * projA
  const closestZ = capSz + abNormZ * projA
  const distX = sx - closestX
  const distY = sy - closestY
  const distZ = sz - closestZ
  const distToAxisSq = distX * distX + distY * distY + distZ * distZ
  if (distToAxisSq > (radius + maxLen) * (radius + maxLen)) return null

  const a = dirX * dirX + dirY * dirY + dirZ * dirZ
  const b = 2 * (aoX * dirX + aoY * dirY + aoZ * dirZ)
  const c = aoX * aoX + aoY * aoY + aoZ * aoZ - radius * radius
  const disc = b * b - 4 * a * c
  if (disc < 0) return null
  const sqrtDisc = Math.sqrt(disc)
  const t1 = (-b - sqrtDisc) / (2 * a)
  const t2 = (-b + sqrtDisc) / (2 * a)

  for (const t of [t1, t2]) {
    if (t < 0 || t > maxLen) continue
    const hitX = sx + dirX * t
    const hitY = sy + dirY * t
    const hitZ = sz + dirZ * t
    const hToAX = hitX - capSx
    const hToAY = hitY - capSy
    const hToAZ = hitZ - capSz
    const projH = Math.max(0, Math.min(abLen, hToAX * abNormX + hToAY * abNormY + hToAZ * abNormZ))
    const chX = capSx + abNormX * projH
    const chY = capSy + abNormY * projH
    const chZ = capSz + abNormZ * projH
    const dX = hitX - chX
    const dY = hitY - chY
    const dZ = hitZ - chZ
    if (dX * dX + dY * dY + dZ * dZ <= radius * radius + 0.02) {
      return t
    }
  }
  return null
}

const BULLET_GEOMETRY = new THREE.SphereGeometry(BULLET_RADIUS, 4, 4)
const BULLET_MATERIAL = new THREE.MeshBasicMaterial({ color: 0xffdd00 })

export default function Bullets() {
  const { scene, camera } = useThree()
  const activeBullets = useRef<Map<string, ActiveBullet>>(new Map())
  const playerIdRef = useRef<string>('')
  const currentRoomRef = useRef(useGameStore.getState().currentRoom)

  const _muzzleOffset = useRef(new THREE.Vector3())
  const _spawnPos = useRef(new THREE.Vector3())
  const _dir = useRef(new THREE.Vector3())

  useEffect(() => {
    const unsub = useGameStore.subscribe(state => {
      playerIdRef.current = state.playerId
      currentRoomRef.current = state.currentRoom
    })
    playerIdRef.current = useGameStore.getState().playerId
    currentRoomRef.current = useGameStore.getState().currentRoom
    return unsub
  }, [])

  useEffect(() => {
    const handlePlayerShot = (data: unknown) => {
      const shotData = data as { playerId: string; direction: { x: number; y: number; z: number; damage?: number } }
      if (shotData.playerId === playerIdRef.current) return

      const player = currentRoomRef.current?.players.find(p => p.id === shotData.playerId)
      if (!player) return

      const cos = Math.cos(player.rotation.y)
      const sin = Math.sin(player.rotation.y)
      const mx = 0.2 * cos + 0.5 * sin
      const my = -0.3
      const mz = -0.2 * sin + 0.5 * cos
      const spawnX = player.position.x + mx
      const spawnY = player.position.y + my - 1.0
      const spawnZ = player.position.z + mz

      const dirLen = Math.sqrt(
        shotData.direction.x * shotData.direction.x +
        shotData.direction.y * shotData.direction.y +
        shotData.direction.z * shotData.direction.z
      ) || 1

      const damage = shotData.direction.damage || 25

      spawnBullet(
        shotData.playerId,
        spawnX, spawnY, spawnZ,
        shotData.direction.x / dirLen,
        shotData.direction.y / dirLen,
        shotData.direction.z / dirLen,
        damage
      )
    }

    network.on('player_shot', handlePlayerShot)

    const unsubscribe = useGameStore.subscribe((state, prevState) => {
      if (state.localShootEvent <= (prevState.localShootEvent || 0)) return

      _muzzleOffset.current.set(0.18, -0.28, -0.42)
      _muzzleOffset.current.applyQuaternion(camera.quaternion)
      _spawnPos.current.copy(camera.position).add(_muzzleOffset.current)

      _dir.current.set(0, 0, -100)
      _dir.current.applyQuaternion(camera.quaternion)
      _dir.current.add(camera.position)
      _dir.current.sub(_spawnPos.current).normalize()

      const weaponDamage = WEAPONS[state.currentWeaponIndex]?.damage || 25

      spawnBullet(
        playerIdRef.current,
        _spawnPos.current.x, _spawnPos.current.y, _spawnPos.current.z,
        _dir.current.x, _dir.current.y, _dir.current.z,
        weaponDamage
      )
    })

    return () => {
      network.off('player_shot', handlePlayerShot)
      unsubscribe()
      for (const ab of activeBullets.current.values()) {
        scene.remove(ab.mesh)
      }
      activeBullets.current.clear()
    }
  }, [scene, camera])

  function spawnBullet(ownerId: string, px: number, py: number, pz: number, dx: number, dy: number, dz: number, damage: number) {
    const mesh = new THREE.Mesh(BULLET_GEOMETRY, BULLET_MATERIAL)
    mesh.position.set(px, py, pz)
    scene.add(mesh)

    const bullet: ActiveBullet = {
      id: Math.random().toString(36).substring(2, 15),
      ownerId,
      px, py, pz,
      dx, dy, dz,
      damage,
      createdAt: Date.now(),
      mesh,
    }
    activeBullets.current.set(bullet.id, bullet)
  }

  function removeBullet(bullet: ActiveBullet) {
    scene.remove(bullet.mesh)
    activeBullets.current.delete(bullet.id)
  }

  useFrame((_, delta) => {
    const room = currentRoomRef.current
    const roomPlaying = room?.status === 'playing'
    const now = Date.now()
    const step = BULLET_SPEED * delta

    const toRemove: ActiveBullet[] = []

    for (const bullet of activeBullets.current.values()) {
      if (now - bullet.createdAt > BULLET_LIFETIME) {
        toRemove.push(bullet)
        continue
      }

      const nx = bullet.px + bullet.dx * step
      const ny = bullet.py + bullet.dy * step
      const nz = bullet.pz + bullet.dz * step

      if (
        Math.abs(nx) > 80 ||
        Math.abs(nz) > 80 ||
        ny < -5 ||
        ny > 30
      ) {
        toRemove.push(bullet)
        continue
      }

      const wallHit = checkLineWallIntersection(
        bullet.px, bullet.py, bullet.pz,
        nx, ny, nz,
        ALL_COLLIDERS
      )
      if (wallHit.hit) {
        toRemove.push(bullet)
        continue
      }

      if (roomPlaying && room) {
        let closestT = step
        let hitPlayerId: string | undefined

        for (const player of room.players) {
          if (player.id === bullet.ownerId || !player.isAlive) continue

          const footY = player.position.y - 1.5
          const headY = player.position.y

          const t = segmentCapsuleIntersection(
            bullet.px, bullet.py, bullet.pz,
            bullet.dx, bullet.dy, bullet.dz,
            step,
            player.position.x, headY, player.position.z,
            player.position.x, footY, player.position.z,
            HIT_RADIUS
          )
          if (t !== null && t < closestT) {
            closestT = t
            hitPlayerId = player.id
          }
        }
        if (hitPlayerId) {
          if (bullet.ownerId === playerIdRef.current) {
            console.log(`Hit detected: [${hitPlayerId}] damage: ${bullet.damage}`)
            if (useGameStore.getState().isSolo) {
              applyHit(hitPlayerId, bullet.damage)
            } else {
              network.sendHit(hitPlayerId, bullet.damage)
            }
          }
          toRemove.push(bullet)
          continue
        }
      }

      bullet.px = nx
      bullet.py = ny
      bullet.pz = nz
      bullet.mesh.position.set(nx, ny, nz)
    }

    for (const b of toRemove) {
      removeBullet(b)
    }
  })

  return null
}
