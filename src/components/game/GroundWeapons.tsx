import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useGameStore } from '../../stores/gameStore'
import { WEAPONS } from '../../config/weapons'

const WEAPON_COLORS = ['#ff6644', '#4488ff', '#ff44ff', '#ffaa00']

export default function GroundWeapons() {
  const containerRef = useRef<THREE.Group>(null)
  const meshesRef = useRef<{ ref: THREE.Group; id: string; floatOffset: number; baseY: number }[]>([])
  const prevDataRef = useRef<string>('')

  useFrame(() => {
    const room = useGameStore.getState().currentRoom
    if (!room || room.status !== 'playing') {
      if (containerRef.current) {
        while (containerRef.current.children.length) {
          containerRef.current.remove(containerRef.current.children[0])
        }
        meshesRef.current = []
      }
      return
    }

    const groundWeapons = useGameStore.getState().groundWeapons
    const dataKey = JSON.stringify(groundWeapons)

    if (dataKey !== prevDataRef.current) {
      prevDataRef.current = dataKey
      if (containerRef.current) {
        while (containerRef.current.children.length) {
          containerRef.current.remove(containerRef.current.children[0])
        }
      }
      meshesRef.current = []

      if (!groundWeapons) return

      for (const gw of groundWeapons) {
        if (!gw.available) continue
        const weapon = WEAPONS[gw.weaponIndex]
        if (!weapon) continue

        const group = new THREE.Group()
        group.position.set(gw.position.x, gw.position.y, gw.position.z)

        const color = WEAPON_COLORS[gw.weaponIndex] || '#ffffff'

        const bodyGeo = new THREE.BoxGeometry(0.12, 0.05, 0.4)
        const bodyMat = new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: 0.4 })
        const body = new THREE.Mesh(bodyGeo, bodyMat)
        body.position.z = -0.1
        group.add(body)

        const barrelGeo = new THREE.CylinderGeometry(0.015, 0.012, 0.35, 6)
        const barrelMat = new THREE.MeshStandardMaterial({ color: '#333', metalness: 0.8, roughness: 0.3 })
        const barrel = new THREE.Mesh(barrelGeo, barrelMat)
        barrel.rotation.x = Math.PI / 2
        barrel.position.z = -0.3
        group.add(barrel)

        const stockGeo = new THREE.BoxGeometry(0.08, 0.04, 0.15)
        const stockMat = new THREE.MeshStandardMaterial({ color: '#5c3a21', roughness: 0.8 })
        const stock = new THREE.Mesh(stockGeo, stockMat)
        stock.position.z = 0.1
        group.add(stock)

        const glowGeo = new THREE.CircleGeometry(0.2, 12)
        const glowMat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.3, depthWrite: false, side: THREE.DoubleSide })
        const glow = new THREE.Mesh(glowGeo, glowMat)
        glow.rotation.x = -Math.PI / 2
        glow.position.y = -0.03
        group.add(glow)

        const labelGeo = new THREE.SphereGeometry(0.04, 6, 6)
        const labelMat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.8 })
        const label = new THREE.Mesh(labelGeo, labelMat)
        label.position.y = 0.06
        group.add(label)

        const floatOffset = Math.random() * Math.PI * 2
        const baseY = gw.position.y

        containerRef.current?.add(group)
        meshesRef.current.push({ ref: group, id: gw.id, floatOffset, baseY })
      }
    }

    for (const m of meshesRef.current) {
      m.ref.position.y = m.baseY + Math.sin(Date.now() * 0.003 + m.floatOffset) * 0.03
    }
  })

  return <group ref={containerRef} />
}
