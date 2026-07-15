import { useMemo } from 'react'
import * as THREE from 'three'
import { setCurrentMap, WallConfig, DecorationConfig } from '../../config/mapConfig'
import CampusMapLoader from './CampusMapLoader'
import ColliderDebug from './ColliderDebug'

// 程序化纹理生成
function createGroundTexture(): THREE.Texture {
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 512
  const ctx = canvas.getContext('2d')!

  // 基础沙土色
  ctx.fillStyle = '#b8956a'
  ctx.fillRect(0, 0, 512, 512)

  // 添加噪点纹理
  const imageData = ctx.getImageData(0, 0, 512, 512)
  const data = imageData.data
  for (let i = 0; i < data.length; i += 4) {
    const noise = (Math.random() - 0.5) * 30
    data[i] = Math.max(0, Math.min(255, data[i] + noise))
    data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + noise))
    data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + noise))
  }
  ctx.putImageData(imageData, 0, 0)

  // 添加沙地裂纹
  ctx.strokeStyle = 'rgba(100, 80, 50, 0.3)'
  ctx.lineWidth = 1
  for (let i = 0; i < 30; i++) {
    ctx.beginPath()
    const x = Math.random() * 512
    const y = Math.random() * 512
    ctx.moveTo(x, y)
    let cx = x, cy = y
    for (let j = 0; j < 5; j++) {
      cx += (Math.random() - 0.5) * 60
      cy += (Math.random() - 0.5) * 60
      ctx.lineTo(cx, cy)
    }
    ctx.stroke()
  }

  // 添加深色斑块
  for (let i = 0; i < 50; i++) {
    const x = Math.random() * 512
    const y = Math.random() * 512
    const r = 3 + Math.random() * 12
    const grad = ctx.createRadialGradient(x, y, 0, x, y, r)
    grad.addColorStop(0, 'rgba(80, 60, 35, 0.4)')
    grad.addColorStop(1, 'rgba(80, 60, 35, 0)')
    ctx.fillStyle = grad
    ctx.beginPath()
    ctx.arc(x, y, r, 0, Math.PI * 2)
    ctx.fill()
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping
  texture.repeat.set(30, 30)
  return texture
}

function createGrassTexture(): THREE.Texture {
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 512
  const ctx = canvas.getContext('2d')!

  // 基础草绿色
  ctx.fillStyle = '#4a7c3a'
  ctx.fillRect(0, 0, 512, 512)

  // 草地噪点
  const imageData = ctx.getImageData(0, 0, 512, 512)
  const data = imageData.data
  for (let i = 0; i < data.length; i += 4) {
    const noise = (Math.random() - 0.5) * 35
    data[i] = Math.max(0, Math.min(255, data[i] + noise))
    data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + noise * 0.8))
    data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + noise * 0.5))
  }
  ctx.putImageData(imageData, 0, 0)

  // 草丛斑块
  for (let i = 0; i < 80; i++) {
    const x = Math.random() * 512
    const y = Math.random() * 512
    const r = 2 + Math.random() * 8
    const grad = ctx.createRadialGradient(x, y, 0, x, y, r)
    grad.addColorStop(0, 'rgba(30, 60, 20, 0.5)')
    grad.addColorStop(1, 'rgba(30, 60, 20, 0)')
    ctx.fillStyle = grad
    ctx.beginPath()
    ctx.arc(x, y, r, 0, Math.PI * 2)
    ctx.fill()
  }

  // 浅色草尖
  for (let i = 0; i < 40; i++) {
    const x = Math.random() * 512
    const y = Math.random() * 512
    const grad = ctx.createRadialGradient(x, y, 0, x, y, 6)
    grad.addColorStop(0, 'rgba(120, 160, 80, 0.35)')
    grad.addColorStop(1, 'rgba(120, 160, 80, 0)')
    ctx.fillStyle = grad
    ctx.beginPath()
    ctx.arc(x, y, 6, 0, Math.PI * 2)
    ctx.fill()
  }

  // 泥土斑
  for (let i = 0; i < 15; i++) {
    const x = Math.random() * 512
    const y = Math.random() * 512
    const r = 4 + Math.random() * 10
    const grad = ctx.createRadialGradient(x, y, 0, x, y, r)
    grad.addColorStop(0, 'rgba(90, 70, 45, 0.4)')
    grad.addColorStop(1, 'rgba(90, 70, 45, 0)')
    ctx.fillStyle = grad
    ctx.beginPath()
    ctx.arc(x, y, r, 0, Math.PI * 2)
    ctx.fill()
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping
  texture.repeat.set(30, 30)
  return texture
}

function createWallTexture(color: string): THREE.Texture {
  const canvas = document.createElement('canvas')
  canvas.width = 256
  canvas.height = 256
  const ctx = canvas.getContext('2d')!

  // 基础色
  ctx.fillStyle = color
  ctx.fillRect(0, 0, 256, 256)

  // 砖块纹理
  const brickW = 64
  const brickH = 24
  const mortar = 2
  ctx.strokeStyle = 'rgba(0, 0, 0, 0.25)'
  ctx.lineWidth = mortar

  for (let row = 0; row < 256 / brickH + 1; row++) {
    const offsetY = row * brickH
    const offset = row % 2 === 0 ? 0 : brickW / 2
    for (let col = -1; col < 256 / brickW + 1; col++) {
      const offsetX = col * brickW + offset
      // 砖块颜色变化
      const variation = (Math.random() - 0.5) * 20
      const r = parseInt(color.slice(1, 3), 16) + variation
      const g = parseInt(color.slice(3, 5), 16) + variation
      const b = parseInt(color.slice(5, 7), 16) + variation
      ctx.fillStyle = `rgb(${Math.max(0, Math.min(255, r))}, ${Math.max(0, Math.min(255, g))}, ${Math.max(0, Math.min(255, b))})`
      ctx.fillRect(offsetX + mortar, offsetY + mortar, brickW - mortar, brickH - mortar)
      ctx.strokeRect(offsetX + mortar, offsetY + mortar, brickW - mortar, brickH - mortar)
    }
  }

  // 添加污渍
  for (let i = 0; i < 15; i++) {
    const x = Math.random() * 256
    const y = Math.random() * 256
    const r = 5 + Math.random() * 15
    const grad = ctx.createRadialGradient(x, y, 0, x, y, r)
    grad.addColorStop(0, 'rgba(40, 30, 15, 0.3)')
    grad.addColorStop(1, 'rgba(40, 30, 15, 0)')
    ctx.fillStyle = grad
    ctx.beginPath()
    ctx.arc(x, y, r, 0, Math.PI * 2)
    ctx.fill()
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping
  return texture
}

function createWoodTexture(baseColor: string): THREE.Texture {
  const canvas = document.createElement('canvas')
  canvas.width = 256
  canvas.height = 256
  const ctx = canvas.getContext('2d')!

  ctx.fillStyle = baseColor
  ctx.fillRect(0, 0, 256, 256)

  // 木纹
  for (let i = 0; i < 20; i++) {
    const y = i * 13 + Math.random() * 5
    ctx.strokeStyle = `rgba(${60 + Math.random() * 30}, ${40 + Math.random() * 20}, ${20 + Math.random() * 15}, 0.4)`
    ctx.lineWidth = 1 + Math.random() * 2
    ctx.beginPath()
    ctx.moveTo(0, y)
    for (let x = 0; x < 256; x += 10) {
      ctx.lineTo(x, y + Math.sin(x * 0.05 + i) * 3)
    }
    ctx.stroke()
  }

  // 木节
  for (let i = 0; i < 5; i++) {
    const x = Math.random() * 256
    const y = Math.random() * 256
    const grad = ctx.createRadialGradient(x, y, 0, x, y, 8)
    grad.addColorStop(0, 'rgba(50, 30, 10, 0.5)')
    grad.addColorStop(1, 'rgba(50, 30, 10, 0)')
    ctx.fillStyle = grad
    ctx.beginPath()
    ctx.arc(x, y, 8, 0, Math.PI * 2)
    ctx.fill()
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping
  return texture
}

function createMetalTexture(baseColor: string): THREE.Texture {
  const canvas = document.createElement('canvas')
  canvas.width = 128
  canvas.height = 128
  const ctx = canvas.getContext('2d')!

  ctx.fillStyle = baseColor
  ctx.fillRect(0, 0, 128, 128)

  // 锈迹斑点
  for (let i = 0; i < 40; i++) {
    const x = Math.random() * 128
    const y = Math.random() * 128
    const r = 1 + Math.random() * 6
    ctx.fillStyle = `rgba(${100 + Math.random() * 50}, ${50 + Math.random() * 30}, ${20 + Math.random() * 20}, ${0.2 + Math.random() * 0.3})`
    ctx.beginPath()
    ctx.arc(x, y, r, 0, Math.PI * 2)
    ctx.fill()
  }

  // 划痕
  for (let i = 0; i < 15; i++) {
    ctx.strokeStyle = `rgba(${200 + Math.random() * 55}, ${200 + Math.random() * 55}, ${200 + Math.random() * 55}, ${0.1 + Math.random() * 0.15})`
    ctx.lineWidth = 0.5
    ctx.beginPath()
    const x = Math.random() * 128
    const y = Math.random() * 128
    ctx.moveTo(x, y)
    ctx.lineTo(x + (Math.random() - 0.5) * 30, y + (Math.random() - 0.5) * 30)
    ctx.stroke()
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping
  return texture
}

const woodTexture = createWoodTexture('#c49a6c')

function Crate({ x, z, y = 0.5, scale = 1 }: { x: number; z: number; y?: number; scale?: number }) {
  return (
    <group position={[x, 0, z]} scale={scale}>
      <mesh position={[0, y, 0]} castShadow receiveShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial map={woodTexture} color="#ffffff" metalness={0.1} roughness={0.85} />
      </mesh>
      <mesh position={[0, y, 0.51]}>
        <boxGeometry args={[0.9, 0.15, 0.02]} />
        <meshStandardMaterial color="#8b6914" roughness={0.9} />
      </mesh>
      <mesh position={[0, y, -0.51]}>
        <boxGeometry args={[0.9, 0.15, 0.02]} />
        <meshStandardMaterial color="#8b6914" roughness={0.9} />
      </mesh>
      <mesh position={[0.51, y, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[0.9, 0.15, 0.02]} />
        <meshStandardMaterial color="#8b6914" roughness={0.9} />
      </mesh>
      <mesh position={[-0.51, y, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[0.9, 0.15, 0.02]} />
        <meshStandardMaterial color="#8b6914" roughness={0.9} />
      </mesh>
    </group>
  )
}

function CrateStack({ x, z }: { x: number; z: number }) {
  return (
    <group position={[x, 0, z]}>
      <Crate x={-0.6} z={0} y={0.5} />
      <Crate x={0.6} z={0} y={0.5} />
      <Crate x={0} z={0} y={1.5} />
    </group>
  )
}

const barrelMetalTexture = createMetalTexture('#5c4033')

function Barrel({ x, z }: { x: number; z: number }) {
  return (
    <group position={[x, 0, z]}>
      <mesh position={[0, 0.6, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.45, 0.45, 1.2, 16]} />
        <meshStandardMaterial map={barrelMetalTexture} color="#ffffff" metalness={0.4} roughness={0.55} />
      </mesh>
      <mesh position={[0, 0.25, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.48, 0.48, 0.05, 16]} />
        <meshStandardMaterial color="#3d2817" metalness={0.6} roughness={0.4} />
      </mesh>
      <mesh position={[0, 0.95, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.48, 0.48, 0.05, 16]} />
        <meshStandardMaterial color="#3d2817" metalness={0.6} roughness={0.4} />
      </mesh>
      <mesh position={[0, 1.2, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.15, 0.15, 0.1, 8]} />
        <meshStandardMaterial color="#2d1810" metalness={0.7} roughness={0.3} />
      </mesh>
    </group>
  )
}

function createStoneTexture(baseColor: string): THREE.Texture {
  const canvas = document.createElement('canvas')
  canvas.width = 128
  canvas.height = 128
  const ctx = canvas.getContext('2d')!

  ctx.fillStyle = baseColor
  ctx.fillRect(0, 0, 128, 128)

  // 石材噪点
  const imageData = ctx.getImageData(0, 0, 128, 128)
  const data = imageData.data
  for (let i = 0; i < data.length; i += 4) {
    const noise = (Math.random() - 0.5) * 25
    data[i] = Math.max(0, Math.min(255, data[i] + noise))
    data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + noise))
    data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + noise))
  }
  ctx.putImageData(imageData, 0, 0)

  // 石材裂纹
  for (let i = 0; i < 10; i++) {
    ctx.strokeStyle = 'rgba(50, 40, 30, 0.3)'
    ctx.lineWidth = 0.5 + Math.random()
    ctx.beginPath()
    const x = Math.random() * 128
    const y = Math.random() * 128
    ctx.moveTo(x, y)
    let cx = x, cy = y
    for (let j = 0; j < 4; j++) {
      cx += (Math.random() - 0.5) * 30
      cy += (Math.random() - 0.5) * 30
      ctx.lineTo(cx, cy)
    }
    ctx.stroke()
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping
  return texture
}

const stoneTexture = createStoneTexture('#a89070')
stoneTexture.repeat.set(1, 3)

function Pillar({ x, z }: { x: number; z: number }) {
  return (
    <group position={[x, 0, z]}>
      <mesh position={[0, 1.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.8, 3, 0.8]} />
        <meshStandardMaterial map={stoneTexture} color="#ffffff" metalness={0.1} roughness={0.9} />
      </mesh>
      <mesh position={[0, 3.1, 0]}>
        <boxGeometry args={[1, 0.2, 1]} />
        <meshStandardMaterial color="#8b7355" metalness={0.2} roughness={0.8} />
      </mesh>
      <mesh position={[0, 0.1, 0]}>
        <boxGeometry args={[1, 0.2, 1]} />
        <meshStandardMaterial color="#8b7355" metalness={0.2} roughness={0.8} />
      </mesh>
    </group>
  )
}

function Sandbag({ x, z, rotation = 0 }: { x: number; z: number; rotation?: number }) {
  return (
    <group position={[x, 0, z]} rotation={[0, rotation, 0]}>
      <mesh position={[0, 0.2, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.2, 0.4, 0.6]} />
        <meshStandardMaterial color="#9a8b6a" metalness={0.05} roughness={0.95} />
      </mesh>
      <mesh position={[0, 0.38, 0]}>
        <boxGeometry args={[1, 0.05, 0.5]} />
        <meshStandardMaterial color="#7a6b4a" roughness={0.9} />
      </mesh>
    </group>
  )
}

const boxMetalTexture = createMetalTexture('#6b7280')

function Box({ x, z }: { x: number; z: number }) {
  return (
    <group position={[x, 0, z]}>
      <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.4, 1, 1]} />
        <meshStandardMaterial map={boxMetalTexture} color="#ffffff" metalness={0.3} roughness={0.65} />
      </mesh>
      <mesh position={[0, 0.95, 0]}>
        <boxGeometry args={[1.3, 0.08, 0.9]} />
        <meshStandardMaterial color="#4b5563" metalness={0.5} roughness={0.5} />
      </mesh>
      <mesh position={[0, 0.5, 0.51]}>
        <boxGeometry args={[0.3, 0.15, 0.02]} />
        <meshStandardMaterial color="#374151" metalness={0.6} roughness={0.4} />
      </mesh>
    </group>
  )
}

const palletWoodTexture = createWoodTexture('#a0826d')

function Pallet({ x, z }: { x: number; z: number }) {
  return (
    <group position={[x, 0, z]}>
      <mesh position={[0, 0.07, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.6, 0.14, 1.2]} />
        <meshStandardMaterial map={palletWoodTexture} color="#ffffff" roughness={0.9} />
      </mesh>
      <mesh position={[-0.5, 0.02, 0]}>
        <boxGeometry args={[0.1, 0.04, 1.2]} />
        <meshStandardMaterial color="#8b6914" roughness={0.95} />
      </mesh>
      <mesh position={[0, 0.02, 0]}>
        <boxGeometry args={[0.1, 0.04, 1.2]} />
        <meshStandardMaterial color="#8b6914" roughness={0.95} />
      </mesh>
      <mesh position={[0.5, 0.02, 0]}>
        <boxGeometry args={[0.1, 0.04, 1.2]} />
        <meshStandardMaterial color="#8b6914" roughness={0.95} />
      </mesh>
    </group>
  )
}

function Decoration({ decoration }: { decoration: DecorationConfig }) {
  const { type, x, z, rotation } = decoration
  
  switch (type) {
    case 'crate':
      return <Crate x={x} z={z} />
    case 'crateStack':
      return <CrateStack x={x} z={z} />
    case 'barrel':
      return <Barrel x={x} z={z} />
    case 'pillar':
      return <Pillar x={x} z={z} />
    case 'sandbag':
      return <Sandbag x={x} z={z} rotation={rotation} />
    case 'box':
      return <Box x={x} z={z} />
    case 'pallet':
      return <Pallet x={x} z={z} />
    default:
      return null
  }
}

const wallTextureCache = new Map<string, THREE.Texture>()

function getWallTexture(color: string, w: number, h: number, d: number): THREE.Texture {
  const key = `${color}_${w}_${h}_${d}`
  if (!wallTextureCache.has(key)) {
    const tex = createWallTexture(color)
    // 根据墙体最大面调整纹理重复，确保砖块大小一致
    const longSide = Math.max(w, d)
    const repeatX = Math.max(1, Math.round(longSide / 3))
    const repeatY = Math.max(1, Math.round(h / 1.5))
    tex.repeat.set(repeatX, repeatY)
    tex.needsUpdate = true
    wallTextureCache.set(key, tex)
  }
  return wallTextureCache.get(key)!
}

function Wall({ wall, index }: { wall: WallConfig; index: number }) {
  const color = wall.color || '#a89070'
  const texture = useMemo(() => getWallTexture(color, wall.w, wall.h, wall.d), [color, wall.w, wall.h, wall.d])
  const wallY = wall.y ?? wall.h / 2

  return (
    <group key={`wall-${index}`} position={[wall.x, wallY, wall.z]}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[wall.w, wall.h, wall.d]} />
        <meshStandardMaterial map={texture} color="#ffffff" metalness={0.1} roughness={0.9} />
      </mesh>
      <mesh position={[0, wall.h / 2 + 0.01, 0]}>
        <boxGeometry args={[wall.w + 0.04, 0.02, wall.d + 0.04]} />
        <meshStandardMaterial color="#6b5a45" roughness={0.85} />
      </mesh>
    </group>
  )
}

function Ramp({ wall, index }: { wall: WallConfig; index: number }) {
  const stepColor = wall.color || '#8a8a8a'
  const riserColor = '#6a6050'  // 踢面稍深色
  const edgeColor = '#3a3530'   // 踏面边缘高亮
  const wallY = wall.y ?? wall.h / 2
  const lowY = wallY - wall.h / 2

  const isXAxis = wall.ramp === 'east' || wall.ramp === 'west'
  const slopeLen = isXAxis ? wall.w : wall.d
  const slopeWidth = isXAxis ? wall.d : wall.w
  const halfSlope = slopeLen / 2
  // 台阶数：每级约0.4米高，至少12级
  const stepCount = Math.max(12, Math.round(wall.h / 0.4))
  const stepDepth = slopeLen / stepCount
  const stepHeight = wall.h / stepCount

  // sign=+1 表示低端在 +轴 方向（west/south）；sign=-1 表示低端在 -轴 方向（east/north）
  const sign = (wall.ramp === 'west' || wall.ramp === 'south') ? 1 : -1

  const parts = []

  // 底部斜板：封闭楼梯底部，让楼梯看起来是实心结构（而不是悬空台阶）
  const slopeAngle = Math.atan2(wall.h, slopeLen)
  const slopeLength = Math.sqrt(slopeLen * slopeLen + wall.h * wall.h)
  const slopeThickness = 0.1
  let slopeRotation: [number, number, number]
  let slopeSize: [number, number, number]
  if (isXAxis) {
    slopeRotation = wall.ramp === 'east' ? [0, 0, slopeAngle] : [0, 0, -slopeAngle]
    slopeSize = [slopeLength, slopeThickness, slopeWidth]
  } else {
    slopeRotation = wall.ramp === 'north' ? [-slopeAngle, 0, 0] : [slopeAngle, 0, 0]
    slopeSize = [slopeWidth, slopeThickness, slopeLength]
  }
  parts.push(
    <mesh key="slope-bottom" position={[wall.x, wallY, wall.z]} rotation={slopeRotation} castShadow receiveShadow>
      <boxGeometry args={slopeSize} />
      <meshStandardMaterial color={stepColor} metalness={0.2} roughness={0.85} />
    </mesh>
  )

  // 台阶：每级只占 stepHeight 高度（不再从地面堆到顶），看起来像真正的楼梯踏步
  for (let i = 0; i < stepCount; i++) {
    // i=0 在低端（最低阶），i=stepCount-1 在高端（最高阶）
    const offset = halfSlope - (i + 0.5) * stepDepth
    const stepBottomY = lowY + i * stepHeight
    const stepTopY = lowY + (i + 1) * stepHeight
    const boxHeight = stepHeight
    const boxCenterY = (stepBottomY + stepTopY) / 2

    let posX = wall.x, posZ = wall.z
    if (isXAxis) {
      posX = wall.x + sign * offset
    } else {
      posZ = wall.z + sign * offset
    }

    // 台阶主体（踏面）
    parts.push(
      <mesh key={`step-${i}`} position={[posX, boxCenterY, posZ]} castShadow receiveShadow>
        <boxGeometry args={isXAxis ? [stepDepth, boxHeight, slopeWidth] : [slopeWidth, boxHeight, stepDepth]} />
        <meshStandardMaterial color={stepColor} metalness={0.2} roughness={0.8} />
      </mesh>
    )

    // 踢面装饰板（朝低端方向的垂直面，稍深色）
    const riserX = isXAxis ? posX - sign * (stepDepth / 2 - 0.01) : posX
    const riserZ = !isXAxis ? posZ - sign * (stepDepth / 2 - 0.01) : posZ
    parts.push(
      <mesh key={`riser-${i}`} position={[riserX, boxCenterY, riserZ]} castShadow>
        <boxGeometry args={isXAxis ? [0.02, boxHeight, slopeWidth] : [slopeWidth, boxHeight, 0.02]} />
        <meshStandardMaterial color={riserColor} metalness={0.3} roughness={0.7} />
      </mesh>
    )

    // 踏面前缘高亮条（深色细条，让台阶边缘清晰）
    const edgeY = stepTopY + 0.005
    const edgeX = isXAxis ? posX - sign * (stepDepth / 2 - 0.025) : posX
    const edgeZ = !isXAxis ? posZ - sign * (stepDepth / 2 - 0.025) : posZ
    parts.push(
      <mesh key={`edge-${i}`} position={[edgeX, edgeY, edgeZ]}>
        <boxGeometry args={isXAxis ? [0.05, 0.02, slopeWidth] : [slopeWidth, 0.02, 0.05]} />
        <meshStandardMaterial color={edgeColor} metalness={0.4} roughness={0.5} />
      </mesh>
    )
  }

  return <group key={`ramp-${index}`}>{parts}</group>
}

function createSkyTexture(): THREE.Texture {
  const canvas = document.createElement('canvas')
  canvas.width = 16
  canvas.height = 256
  const ctx = canvas.getContext('2d')!

  // 纯垂直渐变：顶部深蓝 → 地平线暖色
  const grad = ctx.createLinearGradient(0, 0, 0, 256)
  grad.addColorStop(0, '#1a3a5c')
  grad.addColorStop(0.3, '#3d6a9c')
  grad.addColorStop(0.6, '#7ba8cc')
  grad.addColorStop(0.8, '#c4a882')
  grad.addColorStop(1, '#e8c89a')
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, 16, 256)

  const texture = new THREE.CanvasTexture(canvas)
  return texture
}

function CloudPuff({ pos, scale }: { pos: [number, number, number]; scale: number }) {
  return (
    <mesh position={pos} scale={scale}>
      <sphereGeometry args={[1, 12, 8]} />
      <meshStandardMaterial color="#ffffff" transparent opacity={0.9} roughness={1} metalness={0} />
    </mesh>
  )
}

function Cloud({ position, scale, seed }: { position: [number, number, number]; scale: number; seed: number }) {
  const puffs = useMemo(() => {
    // 用伪随机种子保证每朵云形状稳定
    let s = seed
    const rand = () => {
      s = (s * 9301 + 49297) % 233280
      return s / 233280
    }

    const puffs: { pos: [number, number, number]; scale: number }[] = []
    const count = 8 + Math.floor(rand() * 6)
    // 底层：水平铺开的大球
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2
      const dist = rand() * 3
      puffs.push({
        pos: [Math.cos(angle) * dist, rand() * 0.8, Math.sin(angle) * dist],
        scale: 2.5 + rand() * 1.5,
      })
    }
    // 中层
    for (let i = 0; i < count - 2; i++) {
      const angle = (i / (count - 2)) * Math.PI * 2 + 0.3
      const dist = rand() * 2
      puffs.push({
        pos: [Math.cos(angle) * dist, 1.5 + rand() * 1, Math.sin(angle) * dist],
        scale: 2 + rand() * 1.2,
      })
    }
    // 顶部小凸起
    for (let i = 0; i < 3; i++) {
      puffs.push({
        pos: [(rand() - 0.5) * 3, 2.5 + rand() * 1, (rand() - 0.5) * 3],
        scale: 1.5 + rand() * 1,
      })
    }
    return puffs
  }, [seed])

  return (
    <group position={position} scale={scale}>
      {puffs.map((p, i) => (
        <CloudPuff key={i} pos={p.pos} scale={p.scale} />
      ))}
    </group>
  )
}

function Clouds() {
  const clouds = useMemo(() => {
    const list: { pos: [number, number, number]; scale: number; rot: number; seed: number }[] = []
    for (let i = 0; i < 22; i++) {
      const x = (Math.random() - 0.5) * 700
      const z = (Math.random() - 0.5) * 700
      const y = 50 + Math.random() * 60
      const scale = 3 + Math.random() * 3
      const rot = Math.random() * Math.PI
      const seed = Math.floor(Math.random() * 100000)
      list.push({ pos: [x, y, z], scale, rot, seed })
    }
    return list
  }, [])

  return (
    <group>
      {clouds.map((c, i) => (
        <group key={i} position={c.pos} rotation={[0, c.rot, 0]}>
          <Cloud position={[0, 0, 0]} scale={c.scale} seed={c.seed} />
        </group>
      ))}
    </group>
  )
}

function Window({ position, rotation }: { position: [number, number, number]; rotation: [number, number, number] }) {
  const frameColor = '#2a2a2a'
  const metalness = 0.35
  const roughness = 0.6

  return (
    <group position={position} rotation={rotation}>
      <mesh position={[0, 0.85, 0]}>
        <boxGeometry args={[2.2, 0.08, 0.08]} />
        <meshStandardMaterial color={frameColor} metalness={metalness} roughness={roughness} />
      </mesh>
      <mesh position={[0, -0.85, 0]}>
        <boxGeometry args={[2.2, 0.08, 0.08]} />
        <meshStandardMaterial color={frameColor} metalness={metalness} roughness={roughness} />
      </mesh>
      <mesh position={[-1.1, 0, 0]}>
        <boxGeometry args={[0.08, 1.7, 0.08]} />
        <meshStandardMaterial color={frameColor} metalness={metalness} roughness={roughness} />
      </mesh>
      <mesh position={[1.1, 0, 0]}>
        <boxGeometry args={[0.08, 1.7, 0.08]} />
        <meshStandardMaterial color={frameColor} metalness={metalness} roughness={roughness} />
      </mesh>
      <mesh>
        <boxGeometry args={[1.9, 0.06, 0.06]} />
        <meshStandardMaterial color={frameColor} metalness={metalness} roughness={roughness} />
      </mesh>
      <mesh>
        <boxGeometry args={[0.06, 1.45, 0.06]} />
        <meshStandardMaterial color={frameColor} metalness={metalness} roughness={roughness} />
      </mesh>
    </group>
  )
}

function BuildingWindows({
  centerX,
  centerZ,
  wallDist,
  side = 'west',
}: {
  centerX: number
  centerZ: number
  wallDist: number
  side?: 'west' | 'east'
}) {
  // wallDist = 从中心到墙外表的距离（含墙厚）
  const winY1 = 2.5
  const winY2 = 5.5
  const winOffsets = [-5, 0, 5]  // 窗户沿墙间隔

  const windows: { pos: [number, number, number]; rot: [number, number, number] }[] = []

  // 北墙 (z = centerZ - wallDist, 朝 -z)：窗户在墙外侧 z = centerZ - wallDist - 0.06
  for (const dx of winOffsets) {
    windows.push({ pos: [centerX + dx, winY1, centerZ - wallDist - 0.06], rot: [0, 0, 0] })
    windows.push({ pos: [centerX + dx, winY2, centerZ - wallDist - 0.06], rot: [0, 0, 0] })
  }
  // 南墙 (z = centerZ + wallDist, 朝 +z)
  for (const dx of winOffsets) {
    windows.push({ pos: [centerX + dx, winY1, centerZ + wallDist + 0.06], rot: [0, Math.PI, 0] })
    windows.push({ pos: [centerX + dx, winY2, centerZ + wallDist + 0.06], rot: [0, Math.PI, 0] })
  }
  // 侧墙
  for (const dz of winOffsets) {
    if (side === 'west') {
      windows.push({ pos: [centerX - wallDist - 0.06, winY1, centerZ + dz], rot: [0, -Math.PI / 2, 0] })
      windows.push({ pos: [centerX - wallDist - 0.06, winY2, centerZ + dz], rot: [0, -Math.PI / 2, 0] })
    } else {
      windows.push({ pos: [centerX + wallDist + 0.06, winY1, centerZ + dz], rot: [0, Math.PI / 2, 0] })
      windows.push({ pos: [centerX + wallDist + 0.06, winY2, centerZ + dz], rot: [0, Math.PI / 2, 0] })
    }
  }

  return (
    <group>
      {windows.map((w, i) => (
        <Window key={i} position={w.pos} rotation={w.rot} />
      ))}
    </group>
  )
}

export default function GameMap({ mapId = 'classic' }: { mapId?: string }) {
  // 切换当前地图（更新碰撞体 ALL_COLLIDERS 和 CURRENT_RAMPS）
  const map = useMemo(() => setCurrentMap(mapId), [mapId])
  const mapSize = map.mapSize

  const isGrass = mapId === 'dust' || mapId === 'campus'
  const isCampus = mapId === 'campus'
  const groundTexture = useMemo(() => (isGrass ? createGrassTexture() : createGroundTexture()), [isGrass])
  const skyTexture = useMemo(() => createSkyTexture(), [])

  const solidWalls = useMemo(() => map.walls.filter(w => !w.ramp), [map])
  const ramps = useMemo(() => map.walls.filter(w => w.ramp) as WallConfig[], [map])
  const decorations = useMemo(() => map.decorations, [map])

  return (
    <group>
      {/* 天空穹顶 */}
      <mesh>
        <sphereGeometry args={[isCampus ? 1500 : 500, 32, 16]} />
        <meshBasicMaterial map={skyTexture} side={THREE.BackSide} fog={false} />
      </mesh>

      {/* 太阳 */}
      <mesh position={[-80, 120, -100]}>
        <sphereGeometry args={[15, 16, 16]} />
        <meshBasicMaterial color="#fff5d4" fog={false} />
      </mesh>
      <pointLight position={[-80, 120, -100]} intensity={isCampus ? 3 : 2} color="#fff5d4" distance={isCampus ? 1000 : 500} />

      {/* 3D云朵 */}
      <Clouds />

      {/* 地面 */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[mapSize * 2, mapSize * 2]} />
        <meshStandardMaterial map={groundTexture} color="#ffffff" metalness={0.05} roughness={0.95} />
      </mesh>

      <gridHelper args={[mapSize * 2, isCampus ? 200 : 100, '#8b7355', '#a89070']} position={[0, 0.01, 0]} />

      {/* 校园地图渲染3D模型 */}
      {isCampus && <CampusMapLoader />}

      {/* 调试：碰撞盒线框（?debug=1） */}
      <ColliderDebug />

      {/* 非校园地图渲染墙体和装饰 */}
      {!isCampus && (
        <>
          {solidWalls.map((wall, i) => (
            <Wall key={`wall-${i}`} wall={wall} index={i} />
          ))}

          {ramps.map((wall, i) => (
            <Ramp key={`ramp-${i}`} wall={wall} index={i} />
          ))}

          {/* 建筑窗户（仅dust地图） */}
          {isGrass && (
            <>
              <BuildingWindows centerX={-35} centerZ={-35} wallDist={8.5} side="west" />
              <BuildingWindows centerX={35} centerZ={35} wallDist={8.5} side="east" />
            </>
          )}

          {decorations.map((decoration, i) => (
            <Decoration key={`deco-${i}`} decoration={decoration} />
          ))}
        </>
      )}

      <ambientLight intensity={isCampus ? 0.6 : 0.55} color="#fff8e7" />
      <directionalLight
        position={[-20, isCampus ? 80 : 40, -30]}
        intensity={isCampus ? 1.5 : 1.2}
        color="#fff5e1"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-left={isCampus ? -150 : -60}
        shadow-camera-right={isCampus ? 150 : 60}
        shadow-camera-top={isCampus ? 150 : 60}
        shadow-camera-bottom={isCampus ? -150 : -60}
      />

      <pointLight position={[-35, 6, -30]} intensity={0.8} color="#ffd700" distance={25} />
      <pointLight position={[35, 6, -30]} intensity={0.8} color="#ffd700" distance={25} />
      <pointLight position={[-35, 6, 30]} intensity={0.8} color="#ffd700" distance={25} />
      <pointLight position={[35, 6, 30]} intensity={0.8} color="#ffd700" distance={25} />

      <pointLight position={[0, 5, 0]} intensity={1} color="#ffe4b5" distance={isCampus ? 100 : 40} />

      {/* 出生点标记圆盘 */}
      {map.spawnPoints.red.map((sp, i) => (
        <mesh key={`spawn-red-${i}`} position={[sp.x, 0.1, sp.z]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[1.1, 20]} />
          <meshStandardMaterial color="#dc2626" emissive="#dc2626" emissiveIntensity={0.6} transparent opacity={0.85} />
        </mesh>
      ))}
      {map.spawnPoints.blue.map((sp, i) => (
        <mesh key={`spawn-blue-${i}`} position={[sp.x, 0.1, sp.z]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[1.1, 20]} />
          <meshStandardMaterial color="#2563eb" emissive="#2563eb" emissiveIntensity={0.6} transparent opacity={0.85} />
        </mesh>
      ))}
    </group>
  )
}
