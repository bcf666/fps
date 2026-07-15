import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { updateBots, onBotShot, BotShot } from './soloCombat'

const TRACER_LIFE = 0.12
const TRACER_COLOR = 0xff5533

export default function SoloManager() {
  const groupRef = useRef<THREE.Group>(null)
  const tracers = useRef<{ line: THREE.Line; mat: THREE.LineBasicMaterial; born: number }[]>([])

  useEffect(() => {
    const off = onBotShot((d: BotShot) => {
      const g = groupRef.current
      if (!g) return
      const geo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(d.fromX, d.fromY, d.fromZ),
        new THREE.Vector3(d.toX, d.toY, d.toZ),
      ])
      const mat = new THREE.LineBasicMaterial({ color: TRACER_COLOR, transparent: true, opacity: 0.9 })
      const line = new THREE.Line(geo, mat)
      g.add(line)
      tracers.current.push({ line, mat, born: performance.now() / 1000 })
    })
    return () => {
      off()
      const g = groupRef.current
      for (const t of tracers.current) {
        g?.remove(t.line)
        t.line.geometry.dispose()
        t.mat.dispose()
      }
      tracers.current = []
    }
  }, [])

  useFrame((_, delta) => {
    updateBots(delta)

    const now = performance.now() / 1000
    const g = groupRef.current
    if (!g) return
    for (let i = tracers.current.length - 1; i >= 0; i--) {
      const t = tracers.current[i]
      const age = now - t.born
      if (age > TRACER_LIFE) {
        g.remove(t.line)
        t.line.geometry.dispose()
        t.mat.dispose()
        tracers.current.splice(i, 1)
      } else {
        t.mat.opacity = 0.9 * (1 - age / TRACER_LIFE)
      }
    }
  })

  return <group ref={groupRef} />
}
