import { useMemo } from 'react'
import { ALL_COLLIDERS } from '../../config/mapConfig'

// 调试用：把当前地图所有碰撞盒渲染成红色半透明线框，方便核对碰撞与可见模型是否对齐。
// 通过 URL ?debug=1 开启。
export default function ColliderDebug() {
  const show = typeof window !== 'undefined' &&
    new URLSearchParams(window.location.search).get('debug') === '1'

  const boxes = useMemo(() => {
    if (!show) return []
    return ALL_COLLIDERS.filter(w => !w.ramp && w.h > 0.05)
  }, [show])

  if (!show) return null

  return (
    <group>
      {boxes.map((w, i) => {
        const wy = w.y ?? w.h / 2
        return (
          <mesh key={i} position={[w.x, wy, w.z]}>
            <boxGeometry args={[w.w, w.h, w.d]} />
            <meshBasicMaterial color={'#ff2244'} wireframe transparent opacity={0.5} />
          </mesh>
        )
      })}
    </group>
  )
}
