import { useEffect, useRef, useState } from 'react'
import { useGameStore } from '../../stores/gameStore'
import { ALL_COLLIDERS, MAPS, WallConfig } from '../../config/mapConfig'
import { localPlayer } from './playerTracker'

const VIEW_PADDING = 0.92
const MAP_BG = 'rgba(10,14,20,0.72)'
const WALL_FILL = 'rgba(220,80,60,0.30)'
const WALL_BORDER = 'rgba(255,120,90,0.95)'
const PERIM_FILL = 'rgba(120,130,160,0.16)'
const PERIM_BORDER = 'rgba(160,175,205,0.6)'
const RED_TEAM = '#ff5a5a'
const BLUE_TEAM = '#5aa0ff'

function isPerimeter(w: WallConfig): boolean {
  // 地图外围边界墙：很大且很长（仅真正的地图边界，避免校园大建筑被误判成边界样式）
  return !!w.h && w.h >= 5 && (w.w >= 150 || w.d >= 150)
}

// 画一个指向“上”的三角箭头，ang 为屏幕旋转角（上=0，右=π/2）
function drawArrow(ctx: CanvasRenderingContext2D, x: number, y: number, ang: number, color: string) {
  const len = 7
  ctx.save()
  ctx.translate(x, y)
  ctx.rotate(ang)
  ctx.fillStyle = color
  ctx.beginPath()
  ctx.moveTo(0, -len)
  ctx.lineTo(4, 4)
  ctx.lineTo(-4, 4)
  ctx.closePath()
  ctx.fill()
  ctx.restore()
}

export default function MiniMap() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [rotate, setRotate] = useState(false)
  const rotateRef = useRef(rotate)
  rotateRef.current = rotate
  const sizeRef = useRef(184)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    let raf = 0

    const draw = () => {
      const dpr = window.devicePixelRatio || 1
      const size = sizeRef.current
      if (canvas.width !== size * dpr) {
        canvas.width = size * dpr
        canvas.height = size * dpr
        canvas.style.width = size + 'px'
        canvas.style.height = size + 'px'
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const W = size
      const H = size
      ctx.clearRect(0, 0, W, H)

      ctx.fillStyle = MAP_BG
      ctx.fillRect(0, 0, W, H)
      ctx.strokeStyle = 'rgba(120,160,200,0.5)'
      ctx.lineWidth = 1
      ctx.strokeRect(0.5, 0.5, W - 1, H - 1)

      const state = useGameStore.getState()
      const room = state.currentRoom
      const playerId = state.playerId
      const walls = ALL_COLLIDERS.filter((w) => !w.ramp)

      // 世界包围盒（含玩家，避免玩家在盒外时丢失自身）
      let minX = Infinity, minZ = Infinity, maxX = -Infinity, maxZ = -Infinity
      for (const w of walls) {
        minX = Math.min(minX, w.x - w.w / 2)
        maxX = Math.max(maxX, w.x + w.w / 2)
        minZ = Math.min(minZ, w.z - w.d / 2)
        maxZ = Math.max(maxZ, w.z + w.d / 2)
      }
      const lx = localPlayer.active ? localPlayer.x : 0
      const lz = localPlayer.active ? localPlayer.z : 0
      minX = Math.min(minX, lx); maxX = Math.max(maxX, lx)
      minZ = Math.min(minZ, lz); maxZ = Math.max(maxZ, lz)
      if (!isFinite(minX)) { minX = -50; maxX = 50; minZ = -50; maxZ = 50 }
      const worldW = maxX - minX || 1
      const worldH = maxZ - minZ || 1
      const scale = Math.min(W / worldW, H / worldH) * VIEW_PADDING

      const rotate = rotateRef.current && localPlayer.active
      const yaw = localPlayer.rotationY

      const toScreen = (wx: number, wz: number): [number, number] => {
        if (rotate) {
          const dx = wx - lx, dz = wz - lz
          const cos = Math.cos(yaw), sin = Math.sin(yaw)
          // 旋转使前向(-sin,-cos)映射到屏幕上方(-Y)
          const rdx = dx * cos - dz * sin
          const rdz = dx * sin + dz * cos
          return [W / 2 + rdx * scale, H / 2 + rdz * scale]
        }
        return [
          (wx - minX) * scale + (W - worldW * scale) / 2,
          (wz - minZ) * scale + (H - worldH * scale) / 2,
        ]
      }

      // 碰撞箱
      for (const w of walls) {
        const [sx, sy] = toScreen(w.x - w.w / 2, w.z - w.d / 2)
        const [sx2, sy2] = toScreen(w.x + w.w / 2, w.z + w.d / 2)
        const rx = Math.min(sx, sx2)
        const ry = Math.min(sy, sy2)
        const rw = Math.abs(sx2 - sx)
        const rh = Math.abs(sy2 - sy)
        if (rw < 0.3 && rh < 0.3) continue
        const perim = isPerimeter(w)
        // 薄墙/小地物在小地图上缩放后过小会被吞掉，给一个最小可见尺寸
        const drawW = Math.max(rw, 0.8)
        const drawH = Math.max(rh, 0.8)
        ctx.fillStyle = perim ? PERIM_FILL : WALL_FILL
        ctx.fillRect(rx, ry, drawW, drawH)
        ctx.strokeStyle = perim ? PERIM_BORDER : WALL_BORDER
        ctx.lineWidth = 1
        ctx.strokeRect(rx + 0.5, ry + 0.5, drawW - 1, drawH - 1)
      }

      // 玩家
      if (room && room.players) {
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        for (const p of room.players) {
          if (!p.isAlive) continue
          const [px, py] = toScreen(p.position.x, p.position.z)
          const isSelf = p.id === playerId
          if (isSelf) {
            const fwd = rotate
              ? { x: 0, z: -1 }
              : { x: -Math.sin(p.rotation.y), z: -Math.cos(p.rotation.y) }
            const ang = Math.atan2(fwd.x, -fwd.z)
            drawArrow(ctx, px, py, ang, '#ffffff')
          } else {
            const color = p.team === 'red' ? RED_TEAM : BLUE_TEAM
            ctx.fillStyle = color
            ctx.beginPath()
            ctx.arc(px, py, 3.2, 0, Math.PI * 2)
            ctx.fill()
            ctx.strokeStyle = 'rgba(0,0,0,0.65)'
            ctx.lineWidth = 1
            ctx.stroke()
            ctx.fillStyle = 'rgba(255,255,255,0.85)'
            ctx.font = '8px sans-serif'
            ctx.fillText(p.name.slice(0, 8), px, py - 7)
          }
        }
      }

      // 标题 / 模式（置顶）
      ctx.textAlign = 'left'
      ctx.textBaseline = 'top'
      ctx.fillStyle = 'rgba(180,210,240,0.95)'
      ctx.font = 'bold 11px sans-serif'
      const mapName = (state.currentRoom?.mapId && MAPS[state.currentRoom.mapId]?.name) || '地图'
      ctx.fillText(mapName, 6, 5)
      ctx.fillStyle = 'rgba(150,170,200,0.75)'
      ctx.font = '8px sans-serif'
      ctx.fillText(rotate ? '跟随视角' : '全局视图', 6, 20)

      raf = requestAnimationFrame(draw)
    }

    raf = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(raf)
  }, [])

  const toggle = () => { setRotate((r) => !r) }

  return (
    <div className="absolute bottom-4 right-4 flex flex-col items-end gap-1 pointer-events-none select-none">
      <div className="pointer-events-auto flex gap-1">
        <button
          onClick={toggle}
          className="glass-panel rounded px-2 py-0.5 text-[10px] text-gray-300 hover:text-white"
        >
          {rotate ? '全局' : '跟随'}
        </button>
      </div>
      <canvas ref={canvasRef} className="rounded-lg border border-white/10 shadow-lg" />
    </div>
  )
}
