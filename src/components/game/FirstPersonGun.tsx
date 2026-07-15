import { useRef, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { useGameStore } from '../../stores/gameStore'
import { WEAPONS } from '../../config/weapons'

function createAK47() {
  return (
    <group>
      {/* 枪管 */}
      <mesh position={[0, 0, -0.42]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.032, 0.028, 0.58, 12]} />
        <meshStandardMaterial color="#2d2d2d" metalness={0.85} roughness={0.15} emissive="#444" emissiveIntensity={0.3} />
      </mesh>
      {/* 枪口制退器 */}
      <mesh position={[0, 0, -0.72]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.045, 0.04, 0.12, 12]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.1} emissive="#555" emissiveIntensity={0.3} />
      </mesh>
      {/* 准星 */}
      <mesh position={[0, 0.06, -0.68]}>
        <boxGeometry args={[0.015, 0.04, 0.015]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} emissive="#555" emissiveIntensity={0.3} />
      </mesh>
      <mesh position={[0, 0.085, -0.68]}>
        <cylinderGeometry args={[0.012, 0.012, 0.008, 8]} />
        <meshStandardMaterial color="#ffd700" emissive="#ffd700" emissiveIntensity={0.4} />
      </mesh>
      {/* 导气管 */}
      <mesh position={[0, -0.05, -0.38]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.015, 0.015, 0.52, 8]} />
        <meshStandardMaterial color="#3a3a3a" metalness={0.8} roughness={0.2} emissive="#555" emissiveIntensity={0.3} />
      </mesh>
      {/* 准星座 */}
      <mesh position={[0, -0.02, -0.62]}>
        <boxGeometry args={[0.04, 0.03, 0.04]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.8} roughness={0.2} emissive="#555" emissiveIntensity={0.3} />
      </mesh>
      {/* 护木上盖 */}
      <mesh position={[0, 0.045, -0.35]}>
        <boxGeometry args={[0.05, 0.025, 0.45]} />
        <meshStandardMaterial color="#7a3d1a" metalness={0.1} roughness={0.75} emissive="#3a1a08" emissiveIntensity={0.3} />
      </mesh>
      {/* 护木下盖 */}
      <mesh position={[0, -0.025, -0.35]}>
        <boxGeometry args={[0.055, 0.035, 0.45]} />
        <meshStandardMaterial color="#6b3410" metalness={0.1} roughness={0.75} emissive="#3a1a08" emissiveIntensity={0.3} />
      </mesh>
      {/* 护木散热槽 */}
      {[-0.5, -0.4, -0.3, -0.2].map((z, i) => (
        <mesh key={`slot-top-${i}`} position={[0, 0.058, z]}>
          <boxGeometry args={[0.04, 0.006, 0.015]} />
          <meshStandardMaterial color="#3a1a0a" metalness={0.05} roughness={0.8} emissive="#3a1a08" emissiveIntensity={0.3} />
        </mesh>
      ))}
      {/* 机匣 */}
      <mesh position={[0, 0.02, -0.05]}>
        <boxGeometry args={[0.09, 0.08, 0.28]} />
        <meshStandardMaterial color="#3a3a3a" metalness={0.8} roughness={0.2} emissive="#555" emissiveIntensity={0.3} />
      </mesh>
      {/* 机匣盖 */}
      <mesh position={[0, 0.065, -0.06]}>
        <boxGeometry args={[0.08, 0.015, 0.3]} />
        <meshStandardMaterial color="#4a4a4a" metalness={0.85} roughness={0.15} emissive="#555" emissiveIntensity={0.3} />
      </mesh>
      {/* 照门 */}
      <mesh position={[0, 0.085, 0.06]}>
        <boxGeometry args={[0.03, 0.025, 0.015]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.8} roughness={0.2} emissive="#555" emissiveIntensity={0.3} />
      </mesh>
      <mesh position={[0, 0.095, 0.06]}>
        <boxGeometry args={[0.012, 0.008, 0.008]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.1} emissive="#555" emissiveIntensity={0.3} />
      </mesh>
      {/* 拉机柄 */}
      <mesh position={[0.05, 0.05, 0.02]}>
        <cylinderGeometry args={[0.012, 0.012, 0.025, 8]} />
        <meshStandardMaterial color="#5a5a5a" metalness={0.9} roughness={0.1} emissive="#555" emissiveIntensity={0.3} />
      </mesh>
      <mesh position={[0.062, 0.05, 0.02]}>
        <sphereGeometry args={[0.012, 8, 8]} />
        <meshStandardMaterial color="#6a6a6a" metalness={0.9} roughness={0.1} emissive="#555" emissiveIntensity={0.3} />
      </mesh>
      {/* 弹匣 */}
      <mesh position={[0, -0.08, 0.02]} rotation={[-0.15, 0, 0]}>
        <boxGeometry args={[0.05, 0.18, 0.07]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.85} roughness={0.2} emissive="#555" emissiveIntensity={0.3} />
      </mesh>
      <mesh position={[0, -0.16, 0.025]} rotation={[-0.15, 0, 0]}>
        <boxGeometry args={[0.045, 0.02, 0.065]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.15} emissive="#555" emissiveIntensity={0.3} />
      </mesh>
      {/* 扳机护圈 */}
      <mesh position={[0, -0.06, 0.12]}>
        <torusGeometry args={[0.025, 0.008, 8, 12, Math.PI]} />
        <meshStandardMaterial color="#333" metalness={0.8} roughness={0.2} emissive="#555" emissiveIntensity={0.3} />
      </mesh>
      {/* 扳机 */}
      <mesh position={[0, -0.05, 0.12]}>
        <boxGeometry args={[0.008, 0.02, 0.015]} />
        <meshStandardMaterial color="#222" metalness={0.85} roughness={0.15} emissive="#555" emissiveIntensity={0.3} />
      </mesh>
      {/* 握把 */}
      <mesh position={[0, -0.18, 0.16]} rotation={[-0.25, 0, 0]}>
        <boxGeometry args={[0.07, 0.22, 0.08]} />
        <meshStandardMaterial color="#7a3d1a" metalness={0.1} roughness={0.75} emissive="#3a1a08" emissiveIntensity={0.3} />
      </mesh>
      {/* 握把防滑纹 */}
      {[-0.22, -0.18, -0.14, -0.1, -0.06].map((y, i) => (
        <mesh key={`grip-l-${i}`} position={[-0.036, y, 0.16]} rotation={[-0.25, 0, 0]}>
          <boxGeometry args={[0.002, 0.015, 0.06]} />
          <meshStandardMaterial color="#4a2008" metalness={0.05} roughness={0.8} emissive="#3a1a08" emissiveIntensity={0.3} />
        </mesh>
      ))}
      {[-0.22, -0.18, -0.14, -0.1, -0.06].map((y, i) => (
        <mesh key={`grip-r-${i}`} position={[0.036, y, 0.16]} rotation={[-0.25, 0, 0]}>
          <boxGeometry args={[0.002, 0.015, 0.06]} />
          <meshStandardMaterial color="#4a2008" metalness={0.05} roughness={0.8} emissive="#3a1a08" emissiveIntensity={0.3} />
        </mesh>
      ))}
      {/* 枪托 */}
      <mesh position={[0, -0.02, 0.28]} rotation={[-0.08, 0, 0]}>
        <boxGeometry args={[0.06, 0.12, 0.28]} />
        <meshStandardMaterial color="#7a3d1a" metalness={0.1} roughness={0.75} emissive="#3a1a08" emissiveIntensity={0.3} />
      </mesh>
      {/* 枪托底板 */}
      <mesh position={[0, -0.02, 0.42]} rotation={[-0.08, 0, 0]}>
        <boxGeometry args={[0.065, 0.13, 0.025]} />
        <meshStandardMaterial color="#2a1a0a" metalness={0.05} roughness={0.85} emissive="#3a1a08" emissiveIntensity={0.3} />
      </mesh>
      {/* 枪托颈 */}
      <mesh position={[0, 0.01, 0.18]}>
        <boxGeometry args={[0.05, 0.06, 0.1]} />
        <meshStandardMaterial color="#6b3410" metalness={0.1} roughness={0.75} emissive="#3a1a08" emissiveIntensity={0.3} />
      </mesh>
      {/* 选择杆 */}
      <mesh position={[0.05, 0.01, 0.08]}>
        <boxGeometry args={[0.015, 0.02, 0.008]} />
        <meshStandardMaterial color="#5a5a5a" metalness={0.9} roughness={0.1} emissive="#555" emissiveIntensity={0.3} />
      </mesh>
    </group>
  )
}

function createM4A1() {
  return (
    <group>
      {/* 枪管 */}
      <mesh position={[0, 0, -0.45]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.022, 0.02, 0.55, 12]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.9} roughness={0.1} emissive="#555" emissiveIntensity={0.3} />
      </mesh>
      {/* 消焰器 */}
      <mesh position={[0, 0, -0.75]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.035, 0.03, 0.12, 12]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.95} roughness={0.05} emissive="#555" emissiveIntensity={0.3} />
      </mesh>
      {/* 消焰器开槽 */}
      {[0, 1, 2, 3].map((i) => (
        <mesh
          key={`fh-slot-${i}`}
          position={[
            Math.cos((i * Math.PI) / 2) * 0.032,
            Math.sin((i * Math.PI) / 2) * 0.032,
            -0.75,
          ]}
          rotation={[Math.PI / 2, 0, (i * Math.PI) / 2]}
        >
          <boxGeometry args={[0.006, 0.04, 0.015]} />
          <meshStandardMaterial color="#0a0a0a" metalness={1} roughness={0.05} emissive="#555" emissiveIntensity={0.3} />
        </mesh>
      ))}
      {/* 准星座 */}
      <mesh position={[0, 0.04, -0.65]}>
        <boxGeometry args={[0.04, 0.05, 0.03]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.85} roughness={0.15} emissive="#555" emissiveIntensity={0.3} />
      </mesh>
      {/* 准星柱 */}
      <mesh position={[0, 0.07, -0.65]}>
        <cylinderGeometry args={[0.006, 0.006, 0.02, 8]} />
        <meshStandardMaterial color="#ffd700" emissive="#ffd700" emissiveIntensity={0.4} />
      </mesh>
      {/* 护木 - RIS导轨系统 */}
      <mesh position={[0, 0.02, -0.35]}>
        <boxGeometry args={[0.07, 0.06, 0.35]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.85} roughness={0.15} emissive="#555" emissiveIntensity={0.3} />
      </mesh>
      {/* 顶部导轨 */}
      <mesh position={[0, 0.055, -0.35]}>
        <boxGeometry args={[0.05, 0.012, 0.38]} />
        <meshStandardMaterial color="#3a3a3a" metalness={0.9} roughness={0.1} emissive="#555" emissiveIntensity={0.3} />
      </mesh>
      {/* 导轨齿 - 顶部 */}
      {[-0.5, -0.45, -0.4, -0.35, -0.3, -0.25, -0.2].map((z, i) => (
        <mesh key={`rail-top-${i}`} position={[0, 0.062, z]}>
          <boxGeometry args={[0.04, 0.006, 0.008]} />
          <meshStandardMaterial color="#4a4a4a" metalness={0.9} roughness={0.1} emissive="#555" emissiveIntensity={0.3} />
        </mesh>
      ))}
      {/* 底部导轨 */}
      <mesh position={[0, -0.02, -0.35]}>
        <boxGeometry args={[0.05, 0.012, 0.38]} />
        <meshStandardMaterial color="#3a3a3a" metalness={0.9} roughness={0.1} emissive="#555" emissiveIntensity={0.3} />
      </mesh>
      {/* 导轨齿 - 底部 */}
      {[-0.5, -0.45, -0.4, -0.35, -0.3, -0.25, -0.2].map((z, i) => (
        <mesh key={`rail-bot-${i}`} position={[0, -0.027, z]}>
          <boxGeometry args={[0.04, 0.006, 0.008]} />
          <meshStandardMaterial color="#4a4a4a" metalness={0.9} roughness={0.1} emissive="#555" emissiveIntensity={0.3} />
        </mesh>
      ))}
      {/* 左侧导轨 */}
      <mesh position={[-0.038, 0.02, -0.35]}>
        <boxGeometry args={[0.012, 0.05, 0.38]} />
        <meshStandardMaterial color="#3a3a3a" metalness={0.9} roughness={0.1} emissive="#555" emissiveIntensity={0.3} />
      </mesh>
      {/* 右侧导轨 */}
      <mesh position={[0.038, 0.02, -0.35]}>
        <boxGeometry args={[0.012, 0.05, 0.38]} />
        <meshStandardMaterial color="#3a3a3a" metalness={0.9} roughness={0.1} emissive="#555" emissiveIntensity={0.3} />
      </mesh>
      {/* 前握把安装座 */}
      <mesh position={[0, -0.04, -0.3]}>
        <boxGeometry args={[0.02, 0.02, 0.04]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.85} roughness={0.15} emissive="#555" emissiveIntensity={0.3} />
      </mesh>
      {/* 机匣上盖 */}
      <mesh position={[0, 0.05, 0.02]}>
        <boxGeometry args={[0.07, 0.025, 0.32]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.85} roughness={0.15} emissive="#555" emissiveIntensity={0.3} />
      </mesh>
      {/* 提把 */}
      <mesh position={[0, 0.09, 0.02]}>
        <boxGeometry args={[0.02, 0.05, 0.15]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.85} roughness={0.15} emissive="#555" emissiveIntensity={0.3} />
      </mesh>
      <mesh position={[0, 0.11, -0.06]}>
        <boxGeometry args={[0.02, 0.015, 0.02]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.85} roughness={0.15} emissive="#555" emissiveIntensity={0.3} />
      </mesh>
      <mesh position={[0, 0.11, 0.1]}>
        <boxGeometry args={[0.02, 0.015, 0.02]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.85} roughness={0.15} emissive="#555" emissiveIntensity={0.3} />
      </mesh>
      {/* 照门 */}
      <mesh position={[0, 0.085, 0.1]}>
        <boxGeometry args={[0.025, 0.025, 0.015]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.1} emissive="#555" emissiveIntensity={0.3} />
      </mesh>
      {/* 机匣主体 */}
      <mesh position={[0, 0.015, 0.05]}>
        <boxGeometry args={[0.08, 0.055, 0.28]} />
        <meshStandardMaterial color="#3a3a3a" metalness={0.85} roughness={0.15} emissive="#555" emissiveIntensity={0.3} />
      </mesh>
      {/* 弹匣井 */}
      <mesh position={[0, -0.035, 0.08]}>
        <boxGeometry args={[0.06, 0.025, 0.1]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.85} roughness={0.15} emissive="#555" emissiveIntensity={0.3} />
      </mesh>
      {/* 弹匣 */}
      <mesh position={[0, -0.12, 0.08]} rotation={[-0.1, 0, 0]}>
        <boxGeometry args={[0.05, 0.14, 0.08]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.85} roughness={0.2} emissive="#555" emissiveIntensity={0.3} />
      </mesh>
      {/* 弹匣底部 */}
      <mesh position={[0, -0.185, 0.082]} rotation={[-0.1, 0, 0]}>
        <boxGeometry args={[0.048, 0.015, 0.078]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.1} emissive="#555" emissiveIntensity={0.3} />
      </mesh>
      {/* 弹匣纹理 */}
      {[-0.16, -0.13, -0.1, -0.07].map((y, i) => (
        <mesh key={`mag-l-${i}`} position={[-0.026, y, 0.08]} rotation={[-0.1, 0, 0]}>
          <boxGeometry args={[0.002, 0.01, 0.06]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.1} emissive="#555" emissiveIntensity={0.3} />
        </mesh>
      ))}
      {/* 扳机护圈 */}
      <mesh position={[0, -0.045, 0.17]}>
        <torusGeometry args={[0.022, 0.007, 8, 12, Math.PI]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.85} roughness={0.15} emissive="#555" emissiveIntensity={0.3} />
      </mesh>
      {/* 扳机 */}
      <mesh position={[0, -0.038, 0.17]}>
        <boxGeometry args={[0.006, 0.018, 0.012]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.1} emissive="#555" emissiveIntensity={0.3} />
      </mesh>
      {/* 握把 */}
      <mesh position={[0, -0.15, 0.22]} rotation={[-0.2, 0, 0]}>
        <boxGeometry args={[0.06, 0.18, 0.07]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.3} roughness={0.6} emissive="#555" emissiveIntensity={0.3} />
      </mesh>
      {/* 握把防滑纹 */}
      {[-0.2, -0.16, -0.12, -0.08].map((y, i) => (
        <mesh key={`m4-grip-l-${i}`} position={[-0.031, y, 0.22]} rotation={[-0.2, 0, 0]}>
          <boxGeometry args={[0.002, 0.012, 0.05]} />
          <meshStandardMaterial color="#0a0a0a" metalness={0.2} roughness={0.7} emissive="#555" emissiveIntensity={0.3} />
        </mesh>
      ))}
      {[-0.2, -0.16, -0.12, -0.08].map((y, i) => (
        <mesh key={`m4-grip-r-${i}`} position={[0.031, y, 0.22]} rotation={[-0.2, 0, 0]}>
          <boxGeometry args={[0.002, 0.012, 0.05]} />
          <meshStandardMaterial color="#0a0a0a" metalness={0.2} roughness={0.7} emissive="#555" emissiveIntensity={0.3} />
        </mesh>
      ))}
      {/* 下机匣 */}
      <mesh position={[0, -0.01, 0.18]}>
        <boxGeometry args={[0.075, 0.04, 0.15]} />
        <meshStandardMaterial color="#3a3a3a" metalness={0.85} roughness={0.15} emissive="#555" emissiveIntensity={0.3} />
      </mesh>
      {/* 枪托缓冲管 */}
      <mesh position={[0, 0.03, 0.22]} rotation={[0, 0, 0]}>
        <cylinderGeometry args={[0.018, 0.018, 0.22, 12]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.9} roughness={0.1} emissive="#555" emissiveIntensity={0.3} />
      </mesh>
      {/* 伸缩枪托 */}
      <mesh position={[0, 0.03, 0.35]}>
        <boxGeometry args={[0.06, 0.1, 0.12]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.7} roughness={0.3} emissive="#555" emissiveIntensity={0.3} />
      </mesh>
      {/* 枪托腮托 */}
      <mesh position={[0, 0.075, 0.35]}>
        <boxGeometry args={[0.055, 0.02, 0.14]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.5} roughness={0.5} emissive="#555" emissiveIntensity={0.3} />
      </mesh>
      {/* 枪托底板 */}
      <mesh position={[0, 0.03, 0.41]}>
        <boxGeometry args={[0.065, 0.11, 0.02]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.3} roughness={0.6} emissive="#555" emissiveIntensity={0.3} />
      </mesh>
      {/* 枪托调节杆 */}
      <mesh position={[0, -0.015, 0.34]}>
        <boxGeometry args={[0.02, 0.015, 0.04]} />
        <meshStandardMaterial color="#4a4a4a" metalness={0.9} roughness={0.1} emissive="#555" emissiveIntensity={0.3} />
      </mesh>
      {/* 抛壳窗 */}
      <mesh position={[0.042, 0.025, 0.02]}>
        <boxGeometry args={[0.002, 0.02, 0.08]} />
        <meshStandardMaterial color="#0a0a0a" metalness={0.5} roughness={0.5} emissive="#555" emissiveIntensity={0.3} />
      </mesh>
      {/* 拉机柄 */}
      <mesh position={[0.045, 0.055, -0.06]}>
        <boxGeometry args={[0.01, 0.012, 0.04]} />
        <meshStandardMaterial color="#4a4a4a" metalness={0.9} roughness={0.1} emissive="#555" emissiveIntensity={0.3} />
      </mesh>
    </group>
  )
}

function createAWP() {
  return (
    <group>
      {/* 长枪管 */}
      <mesh position={[0, 0, -0.55]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.028, 0.025, 0.75, 12]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.95} roughness={0.05} emissive="#555" emissiveIntensity={0.3} />
      </mesh>
      {/* 枪口制退器 */}
      <mesh position={[0, 0, -0.98]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.04, 0.035, 0.15, 12]} />
        <meshStandardMaterial color="#0a0a0a" metalness={1} roughness={0.05} emissive="#555" emissiveIntensity={0.3} />
      </mesh>
      {/* 制退器两侧开孔 */}
      <mesh position={[0.038, 0, -0.98]}>
        <boxGeometry args={[0.008, 0.025, 0.06]} />
        <meshStandardMaterial color="#050505" metalness={1} roughness={0.05} emissive="#555" emissiveIntensity={0.3} />
      </mesh>
      <mesh position={[-0.038, 0, -0.98]}>
        <boxGeometry args={[0.008, 0.025, 0.06]} />
        <meshStandardMaterial color="#050505" metalness={1} roughness={0.05} emissive="#555" emissiveIntensity={0.3} />
      </mesh>
      {/* 枪管加强环 */}
      <mesh position={[0, 0, -0.3]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.035, 0.032, 0.04, 12]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.9} roughness={0.1} emissive="#555" emissiveIntensity={0.3} />
      </mesh>
      {/* 准星座 */}
      <mesh position={[0, 0.035, -0.85]}>
        <boxGeometry args={[0.03, 0.04, 0.025]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.1} emissive="#555" emissiveIntensity={0.3} />
      </mesh>
      <mesh position={[0, 0.06, -0.85]}>
        <boxGeometry args={[0.01, 0.015, 0.008]} />
        <meshStandardMaterial color="#ffd700" emissive="#ffd700" emissiveIntensity={0.4} />
      </mesh>
      {/* 护木 */}
      <mesh position={[0, -0.01, -0.18]}>
        <boxGeometry args={[0.07, 0.06, 0.35]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.85} roughness={0.15} emissive="#555" emissiveIntensity={0.3} />
      </mesh>
      {/* 护木散热槽 - 左侧 */}
      {[-0.3, -0.25, -0.2, -0.15, -0.1].map((z, i) => (
        <mesh key={`awp-vent-l-${i}`} position={[-0.036, -0.01, z]}>
          <boxGeometry args={[0.002, 0.04, 0.012]} />
          <meshStandardMaterial color="#0a0a0a" metalness={0.5} roughness={0.3} emissive="#555" emissiveIntensity={0.3} />
        </mesh>
      ))}
      {/* 护木散热槽 - 右侧 */}
      {[-0.3, -0.25, -0.2, -0.15, -0.1].map((z, i) => (
        <mesh key={`awp-vent-r-${i}`} position={[0.036, -0.01, z]}>
          <boxGeometry args={[0.002, 0.04, 0.012]} />
          <meshStandardMaterial color="#0a0a0a" metalness={0.5} roughness={0.3} emissive="#555" emissiveIntensity={0.3} />
        </mesh>
      ))}
      {/* 两脚架安装座 */}
      <mesh position={[0, -0.045, -0.1]}>
        <boxGeometry args={[0.03, 0.015, 0.04]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.1} emissive="#555" emissiveIntensity={0.3} />
      </mesh>
      {/* 两脚架 - 左 */}
      <mesh position={[-0.025, -0.07, -0.08]} rotation={[0.3, 0, -0.4]}>
        <cylinderGeometry args={[0.006, 0.004, 0.08, 6]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.1} emissive="#555" emissiveIntensity={0.3} />
      </mesh>
      {/* 两脚架 - 右 */}
      <mesh position={[0.025, -0.07, -0.08]} rotation={[0.3, 0, 0.4]}>
        <cylinderGeometry args={[0.006, 0.004, 0.08, 6]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.1} emissive="#555" emissiveIntensity={0.3} />
      </mesh>
      {/* 机匣主体 */}
      <mesh position={[0, 0.01, 0.05]}>
        <boxGeometry args={[0.075, 0.065, 0.3]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.85} roughness={0.15} emissive="#555" emissiveIntensity={0.3} />
      </mesh>
      {/* 机匣顶部导轨 */}
      <mesh position={[0, 0.05, 0.05]}>
        <boxGeometry args={[0.05, 0.015, 0.35]} />
        <meshStandardMaterial color="#3a3a3a" metalness={0.9} roughness={0.1} emissive="#555" emissiveIntensity={0.3} />
      </mesh>
      {/* 导轨齿 */}
      {[-0.1, -0.05, 0, 0.05, 0.1, 0.15, 0.2].map((z, i) => (
        <mesh key={`awp-rail-${i}`} position={[0, 0.058, z]}>
          <boxGeometry args={[0.04, 0.006, 0.008]} />
          <meshStandardMaterial color="#4a4a4a" metalness={0.9} roughness={0.1} emissive="#555" emissiveIntensity={0.3} />
        </mesh>
      ))}
      {/* 瞄准镜底座 */}
      <mesh position={[0, 0.065, -0.05]}>
        <boxGeometry args={[0.04, 0.02, 0.1]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.1} emissive="#555" emissiveIntensity={0.3} />
      </mesh>
      <mesh position={[0, 0.065, 0.1]}>
        <boxGeometry args={[0.04, 0.02, 0.1]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.1} emissive="#555" emissiveIntensity={0.3} />
      </mesh>
      {/* 瞄准镜镜筒 */}
      <mesh position={[0, 0.095, 0.02]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.035, 0.035, 0.32, 12]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.1} emissive="#555" emissiveIntensity={0.3} />
      </mesh>
      {/* 瞄准镜物镜 */}
      <mesh position={[0, 0.095, -0.14]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.04, 0.038, 0.04, 12]} />
        <meshStandardMaterial color="#0a0a0a" metalness={0.95} roughness={0.05} emissive="#555" emissiveIntensity={0.3} />
      </mesh>
      {/* 瞄准镜镜片 */}
      <mesh position={[0, 0.095, -0.16]}>
        <circleGeometry args={[0.032, 16]} />
        <meshStandardMaterial color="#1a3a5a" metalness={0.2} roughness={0.1} transparent opacity={0.8} side={THREE.DoubleSide} emissive="#2a3a5c" emissiveIntensity={0.3} />
      </mesh>
      {/* 瞄准镜目镜 */}
      <mesh position={[0, 0.095, 0.18]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.032, 0.03, 0.035, 12]} />
        <meshStandardMaterial color="#0a0a0a" metalness={0.95} roughness={0.05} emissive="#555" emissiveIntensity={0.3} />
      </mesh>
      {/* 目镜橡胶罩 */}
      <mesh position={[0, 0.095, 0.2]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.038, 0.028, 0.025, 12]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.2} roughness={0.8} emissive="#555" emissiveIntensity={0.3} />
      </mesh>
      {/* 瞄准镜调节旋钮 - 顶部 */}
      <mesh position={[0, 0.13, 0]}>
        <cylinderGeometry args={[0.012, 0.012, 0.02, 8]} />
        <meshStandardMaterial color="#3a3a3a" metalness={0.9} roughness={0.1} emissive="#555" emissiveIntensity={0.3} />
      </mesh>
      <mesh position={[0, 0.142, 0]}>
        <cylinderGeometry args={[0.008, 0.008, 0.008, 8]} />
        <meshStandardMaterial color="#5a5a5a" metalness={0.95} roughness={0.05} emissive="#555" emissiveIntensity={0.3} />
      </mesh>
      {/* 瞄准镜调节旋钮 - 侧面 */}
      <mesh position={[0.045, 0.095, 0.05]}>
        <cylinderGeometry args={[0.01, 0.01, 0.018, 8]} />
        <meshStandardMaterial color="#3a3a3a" metalness={0.9} roughness={0.1} emissive="#555" emissiveIntensity={0.3} />
      </mesh>
      {/* 拉机柄 */}
      <mesh position={[-0.05, 0.03, 0.08]}>
        <boxGeometry args={[0.015, 0.01, 0.05]} />
        <meshStandardMaterial color="#4a4a4a" metalness={0.9} roughness={0.1} emissive="#555" emissiveIntensity={0.3} />
      </mesh>
      <mesh position={[-0.06, 0.03, 0.08]}>
        <sphereGeometry args={[0.01, 8, 8]} />
        <meshStandardMaterial color="#5a5a5a" metalness={0.95} roughness={0.05} emissive="#555" emissiveIntensity={0.3} />
      </mesh>
      {/* 弹匣 */}
      <mesh position={[0, -0.05, 0.12]}>
        <boxGeometry args={[0.05, 0.08, 0.09]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.1} emissive="#555" emissiveIntensity={0.3} />
      </mesh>
      <mesh position={[0, -0.092, 0.12]}>
        <boxGeometry args={[0.048, 0.01, 0.088]} />
        <meshStandardMaterial color="#0a0a0a" metalness={0.95} roughness={0.05} emissive="#555" emissiveIntensity={0.3} />
      </mesh>
      {/* 扳机护圈 */}
      <mesh position={[0, -0.045, 0.2]}>
        <torusGeometry args={[0.02, 0.006, 8, 12, Math.PI]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.1} emissive="#555" emissiveIntensity={0.3} />
      </mesh>
      {/* 扳机 */}
      <mesh position={[0, -0.038, 0.2]}>
        <boxGeometry args={[0.005, 0.015, 0.01]} />
        <meshStandardMaterial color="#0a0a0a" metalness={0.95} roughness={0.05} emissive="#555" emissiveIntensity={0.3} />
      </mesh>
      {/* 握把 */}
      <mesh position={[0, -0.14, 0.25]} rotation={[-0.25, 0, 0]}>
        <boxGeometry args={[0.055, 0.18, 0.065]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.3} roughness={0.7} emissive="#555" emissiveIntensity={0.3} />
      </mesh>
      {/* 握把防滑纹 */}
      {[-0.19, -0.15, -0.11, -0.07].map((y, i) => (
        <mesh key={`awp-grip-l-${i}`} position={[-0.029, y, 0.25]} rotation={[-0.25, 0, 0]}>
          <boxGeometry args={[0.002, 0.012, 0.045]} />
          <meshStandardMaterial color="#0a0a0a" metalness={0.2} roughness={0.8} emissive="#555" emissiveIntensity={0.3} />
        </mesh>
      ))}
      {[-0.19, -0.15, -0.11, -0.07].map((y, i) => (
        <mesh key={`awp-grip-r-${i}`} position={[0.029, y, 0.25]} rotation={[-0.25, 0, 0]}>
          <boxGeometry args={[0.002, 0.012, 0.045]} />
          <meshStandardMaterial color="#0a0a0a" metalness={0.2} roughness={0.8} emissive="#555" emissiveIntensity={0.3} />
        </mesh>
      ))}
      {/* 枪托主体 */}
      <mesh position={[0, 0, 0.35]} rotation={[-0.05, 0, 0]}>
        <boxGeometry args={[0.065, 0.12, 0.28]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.7} roughness={0.3} emissive="#555" emissiveIntensity={0.3} />
      </mesh>
      {/* 枪托腮托 */}
      <mesh position={[0, 0.07, 0.32]}>
        <boxGeometry args={[0.06, 0.025, 0.22]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.4} roughness={0.6} emissive="#555" emissiveIntensity={0.3} />
      </mesh>
      {/* 枪托底板 */}
      <mesh position={[0, 0, 0.49]} rotation={[-0.05, 0, 0]}>
        <boxGeometry args={[0.07, 0.13, 0.025]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.2} roughness={0.8} emissive="#555" emissiveIntensity={0.3} />
      </mesh>
      {/* 枪托调节旋钮 */}
      <mesh position={[0, -0.05, 0.4]}>
        <cylinderGeometry args={[0.008, 0.008, 0.015, 8]} />
        <meshStandardMaterial color="#4a4a4a" metalness={0.9} roughness={0.1} emissive="#555" emissiveIntensity={0.3} />
      </mesh>
      {/* 照门 */}
      <mesh position={[0, 0.065, 0.18]}>
        <boxGeometry args={[0.025, 0.02, 0.012]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.1} emissive="#555" emissiveIntensity={0.3} />
      </mesh>
    </group>
  )
}

function createDeagle() {
  return (
    <group>
      {/* 枪管 */}
      <mesh position={[0, 0.01, -0.28]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.022, 0.02, 0.38, 12]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.95} roughness={0.05} emissive="#555" emissiveIntensity={0.3} />
      </mesh>
      {/* 枪口 */}
      <mesh position={[0, 0.01, -0.48]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.025, 0.024, 0.02, 12]} />
        <meshStandardMaterial color="#1a1a1a" metalness={1} roughness={0.05} emissive="#555" emissiveIntensity={0.3} />
      </mesh>
      {/* 枪口内孔 */}
      <mesh position={[0, 0.01, -0.49]}>
        <circleGeometry args={[0.008, 8]} />
        <meshStandardMaterial color="#0a0a0a" metalness={0.5} roughness={0.5} side={THREE.DoubleSide} emissive="#555" emissiveIntensity={0.3} />
      </mesh>
      {/* 套筒 */}
      <mesh position={[0, 0.035, -0.15]}>
        <boxGeometry args={[0.05, 0.045, 0.35]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.95} roughness={0.05} emissive="#555" emissiveIntensity={0.3} />
      </mesh>
      {/* 套筒顶部纹路 */}
      {[-0.28, -0.26, -0.24, -0.22, -0.2, -0.18].map((z, i) => (
        <mesh key={`deagle-slide-f-${i}`} position={[0, 0.058, z]}>
          <boxGeometry args={[0.04, 0.005, 0.006]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.1} emissive="#555" emissiveIntensity={0.3} />
        </mesh>
      ))}
      {[-0.1, -0.08, -0.06, -0.04, -0.02, 0].map((z, i) => (
        <mesh key={`deagle-slide-b-${i}`} position={[0, 0.058, z]}>
          <boxGeometry args={[0.04, 0.005, 0.006]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.1} emissive="#555" emissiveIntensity={0.3} />
        </mesh>
      ))}
      {/* 准星 */}
      <mesh position={[0, 0.062, -0.3]}>
        <boxGeometry args={[0.012, 0.015, 0.008]} />
        <meshStandardMaterial color="#ffd700" emissive="#ffd700" emissiveIntensity={0.4} />
      </mesh>
      {/* 照门 */}
      <mesh position={[0, 0.06, 0.02]}>
        <boxGeometry args={[0.025, 0.018, 0.01]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.1} emissive="#555" emissiveIntensity={0.3} />
      </mesh>
      <mesh position={[0, 0.068, 0.02]}>
        <boxGeometry args={[0.008, 0.006, 0.006]} />
        <meshStandardMaterial color="#0a0a0a" metalness={0.5} roughness={0.3} emissive="#555" emissiveIntensity={0.3} />
      </mesh>
      {/* 抛壳口 */}
      <mesh position={[0.026, 0.045, -0.1]}>
        <boxGeometry args={[0.002, 0.015, 0.06]} />
        <meshStandardMaterial color="#0a0a0a" metalness={0.5} roughness={0.3} emissive="#555" emissiveIntensity={0.3} />
      </mesh>
      {/* 枪身主体 */}
      <mesh position={[0, -0.005, 0.04]}>
        <boxGeometry args={[0.06, 0.06, 0.28]} />
        <meshStandardMaterial color="#3a3a3a" metalness={0.9} roughness={0.1} emissive="#555" emissiveIntensity={0.3} />
      </mesh>
      {/* 枪管底座 */}
      <mesh position={[0, 0.005, -0.08]}>
        <boxGeometry args={[0.055, 0.025, 0.1]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.95} roughness={0.05} emissive="#555" emissiveIntensity={0.3} />
      </mesh>
      {/* 扳机护圈 */}
      <mesh position={[0, -0.04, 0.14]}>
        <torusGeometry args={[0.018, 0.006, 8, 12, Math.PI]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.9} roughness={0.1} emissive="#555" emissiveIntensity={0.3} />
      </mesh>
      {/* 扳机 */}
      <mesh position={[0, -0.032, 0.14]}>
        <boxGeometry args={[0.005, 0.014, 0.01]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.95} roughness={0.05} emissive="#555" emissiveIntensity={0.3} />
      </mesh>
      {/* 击锤 */}
      <mesh position={[0, 0.03, 0.16]}>
        <boxGeometry args={[0.02, 0.02, 0.025]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.95} roughness={0.05} emissive="#555" emissiveIntensity={0.3} />
      </mesh>
      <mesh position={[0, 0.045, 0.17]}>
        <sphereGeometry args={[0.01, 8, 8]} />
        <meshStandardMaterial color="#3a3a3a" metalness={0.95} roughness={0.05} emissive="#555" emissiveIntensity={0.3} />
      </mesh>
      {/* 保险 */}
      <mesh position={[0.032, 0.01, 0.12]}>
        <boxGeometry args={[0.008, 0.012, 0.015]} />
        <meshStandardMaterial color="#4a4a4a" metalness={0.9} roughness={0.1} emissive="#555" emissiveIntensity={0.3} />
      </mesh>
      {/* 握把 */}
      <mesh position={[0, -0.12, 0.16]} rotation={[-0.25, 0, 0]}>
        <boxGeometry args={[0.055, 0.16, 0.06]} />
        <meshStandardMaterial color="#2a1a0a" metalness={0.15} roughness={0.7} emissive="#3a1a08" emissiveIntensity={0.3} />
      </mesh>
      {/* 握把防滑纹 - 左侧 */}
      {[-0.18, -0.14, -0.1, -0.06].map((y, i) => (
        <mesh key={`deagle-grip-l-${i}`} position={[-0.029, y, 0.16]} rotation={[-0.25, 0, 0]}>
          <boxGeometry args={[0.002, 0.012, 0.04]} />
          <meshStandardMaterial color="#1a0a00" metalness={0.1} roughness={0.8} emissive="#3a1a08" emissiveIntensity={0.3} />
        </mesh>
      ))}
      {/* 握把防滑纹 - 右侧 */}
      {[-0.18, -0.14, -0.1, -0.06].map((y, i) => (
        <mesh key={`deagle-grip-r-${i}`} position={[0.029, y, 0.16]} rotation={[-0.25, 0, 0]}>
          <boxGeometry args={[0.002, 0.012, 0.04]} />
          <meshStandardMaterial color="#1a0a00" metalness={0.1} roughness={0.8} emissive="#3a1a08" emissiveIntensity={0.3} />
        </mesh>
      ))}
      {/* 握把底部 */}
      <mesh position={[0, -0.2, 0.175]} rotation={[-0.25, 0, 0]}>
        <boxGeometry args={[0.05, 0.012, 0.05]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.1} emissive="#555" emissiveIntensity={0.3} />
      </mesh>
      {/* 弹匣底板 */}
      <mesh position={[0, -0.205, 0.178]} rotation={[-0.25, 0, 0]}>
        <boxGeometry args={[0.048, 0.006, 0.048]} />
        <meshStandardMaterial color="#0a0a0a" metalness={0.95} roughness={0.05} emissive="#555" emissiveIntensity={0.3} />
      </mesh>
      {/* 弹匣释放钮 */}
      <mesh position={[0.03, -0.025, 0.1]}>
        <cylinderGeometry args={[0.008, 0.008, 0.006, 8]} />
        <meshStandardMaterial color="#5a5a5a" metalness={0.95} roughness={0.05} emissive="#555" emissiveIntensity={0.3} />
      </mesh>
      {/* 空仓挂机 */}
      <mesh position={[0.03, 0.01, 0.04]}>
        <boxGeometry args={[0.006, 0.01, 0.02]} />
        <meshStandardMaterial color="#4a4a4a" metalness={0.9} roughness={0.1} emissive="#555" emissiveIntensity={0.3} />
      </mesh>
    </group>
  )
}

export default function FirstPersonGun() {
  const { camera } = useThree()
  const gunRef = useRef<THREE.Group>(null)
  const muzzleLightRef = useRef<THREE.PointLight>(null)
  const currentWeaponRef = useRef(0)
  
  const visualRecoil = useRef(0)
  const walkBob = useRef(0)
  const muzzleFlashTime = useRef(0)
  
  const moveState = useRef({
    forward: false,
    backward: false,
    left: false,
    right: false,
    sprint: false,
  })

  const _baseOffset = useRef(new THREE.Vector3(0.18, -0.28, -0.62))
  const _totalOffset = useRef(new THREE.Vector3())
  const _recoilOffset = useRef(new THREE.Vector3())
  const _bobOffset = useRef(new THREE.Vector3())
  const _adsOffset = useRef(new THREE.Vector3())
  const _reloadOffset = useRef(new THREE.Vector3())
  const reloadAnim = useRef(0)
  const wasReloading = useRef(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.code) {
        case 'KeyW': moveState.current.forward = true; break
        case 'KeyS': moveState.current.backward = true; break
        case 'KeyA': moveState.current.left = true; break
        case 'KeyD': moveState.current.right = true; break
        case 'ShiftLeft': moveState.current.sprint = true; break
      }
    }
    const handleKeyUp = (e: KeyboardEvent) => {
      switch (e.code) {
        case 'KeyW': moveState.current.forward = false; break
        case 'KeyS': moveState.current.backward = false; break
        case 'KeyA': moveState.current.left = false; break
        case 'KeyD': moveState.current.right = false; break
        case 'ShiftLeft': moveState.current.sprint = false; break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  useEffect(() => {
    let prevEvent = useGameStore.getState().localShootEvent
    const unsubscribe = useGameStore.subscribe((state) => {
      if (state.localShootEvent > prevEvent) {
        const weapon = WEAPONS[state.currentWeaponIndex]
        const recoilStr = weapon ? weapon.recoil : 1
        visualRecoil.current = Math.min(visualRecoil.current + recoilStr, 2.0)
        muzzleFlashTime.current = 0.045
        prevEvent = state.localShootEvent
      }
      currentWeaponRef.current = state.currentWeaponIndex
    })
    return unsubscribe
  }, [])

  const _targetAds = useRef(0)
  const _currentAds = useRef(0)

  useFrame((_, rawDelta) => {
    if (!gunRef.current || !camera) return

    // 限制delta防止帧率波动导致抖动
    const delta = Math.min(rawDelta, 0.05)

    const isAiming = useGameStore.getState().isAiming
    _targetAds.current = isAiming ? 1 : 0

    // 平滑ADS过渡
    const adsDiff = _targetAds.current - _currentAds.current
    if (Math.abs(adsDiff) > 0.001) {
      _currentAds.current += adsDiff * Math.min(delta * 12, 1)
    } else {
      _currentAds.current = _targetAds.current
    }
    const ads = _currentAds.current

    const weapon = WEAPONS[currentWeaponRef.current]
    const isSniper = weapon?.type === 'sniper'

    const moving = moveState.current.forward || moveState.current.backward ||
                   moveState.current.left || moveState.current.right
    const sprinting = moveState.current.sprint && moving

    if (moving && !isSniper) {
      const bobSpeed = sprinting ? 10 : 6
      walkBob.current += delta * bobSpeed
    } else {
      walkBob.current *= Math.pow(0.001, delta)
    }

    const bobAmt = moving && !isSniper ? (sprinting ? 0.012 : 0.006) : 0
    const bobY = Math.sin(walkBob.current * 2) * bobAmt
    const bobX = Math.sin(walkBob.current) * (bobAmt * 0.6)
    const bobRotZ = Math.sin(walkBob.current * 2 + 0.5) * (bobAmt * 1.2)

    // 换弹动画
    const isReloading = useGameStore.getState().isReloading
    if (isReloading && !wasReloading.current) {
      reloadAnim.current = 0
    }
    wasReloading.current = isReloading

    if (isReloading && weapon) {
      const reloadDuration = weapon.reloadTime
      reloadAnim.current = Math.min(1, reloadAnim.current + delta / (reloadDuration * 0.6))
    } else if (!isReloading && reloadAnim.current > 0) {
      reloadAnim.current = Math.max(0, reloadAnim.current - delta * 3)
    }

    // 计算换弹动画偏移
    const rp = reloadAnim.current
    if (rp > 0) {
      // 下放阶段 (0→0.5) 和 上抬阶段 (0.5→1.0)
      const downPhase = Math.min(1, rp * 2)
      const upPhase = Math.max(0, (rp - 0.5) * 2)
      // 下放：平滑入，上抬：平滑出
      const downEase = 1 - Math.pow(1 - downPhase, 2)
      const upEase = upPhase * upPhase
      // 混合：前半段下放，后半段上抬
      const relAmount = rp < 0.5 ? downEase : 1 - upEase

      _reloadOffset.current.set(
        -relAmount * 0.04,
        -relAmount * 0.18 - Math.sin(relAmount * Math.PI) * 0.05,
        relAmount * 0.25
      )
    } else {
      _reloadOffset.current.set(0, 0, 0)
    }

    const recovery = Math.pow(0.001, delta)
    visualRecoil.current *= recovery
    muzzleFlashTime.current = Math.max(0, muzzleFlashTime.current - delta)

    const recoilStr = weapon ? weapon.recoil : 1
    const recoilPosZ = visualRecoil.current * 0.025 * recoilStr
    const recoilPosY = visualRecoil.current * 0.006 * recoilStr
    const recoilRotX = visualRecoil.current * 0.08 * recoilStr

    // ADS时收枪到中心位置
    _adsOffset.current.set(
      -0.12 * ads,
      -0.04 * ads,
      isSniper ? 0.3 * ads : 0.15 * ads
    )

    _recoilOffset.current.set(0, recoilPosY, recoilPosZ)
    _bobOffset.current.set(bobX, bobY, 0)

    _totalOffset.current.copy(_baseOffset.current)
    _totalOffset.current.add(_reloadOffset.current)
    _totalOffset.current.add(_recoilOffset.current)
    _totalOffset.current.add(_bobOffset.current)
    _totalOffset.current.add(_adsOffset.current)
    _totalOffset.current.applyQuaternion(camera.quaternion)

    gunRef.current.position.copy(camera.position).add(_totalOffset.current)
    gunRef.current.quaternion.copy(camera.quaternion)

    gunRef.current.rotateX(recoilRotX)

    // 换弹旋转：枪口下转再回正
    if (rp > 0) {
      const downPhase = Math.min(1, rp * 2)
      const upPhase = Math.max(0, (rp - 0.5) * 2)
      const downEase = 1 - Math.pow(1 - downPhase, 2)
      const upEase = upPhase * upPhase
      const relRot = rp < 0.5 ? downEase : 1 - upEase
      gunRef.current.rotateX(-relRot * 0.45)
      gunRef.current.rotateZ(relRot * 0.15)
    }

    gunRef.current.rotateZ(bobRotZ)

    if (muzzleLightRef.current) {
      muzzleLightRef.current.intensity = muzzleFlashTime.current > 0 ? 5 : 0
    }
  })

  const gunModels = [createDeagle(), createAK47(), createM4A1(), createAWP()]

  return (
    <group ref={gunRef}>
      <pointLight
        ref={muzzleLightRef}
        position={[0, 0, -0.85]}
        color="#ffaa44"
        intensity={0}
        distance={3}
      />
      <pointLight
        position={[0, -0.1, 0]}
        color="#ffffff"
        intensity={0.8}
        distance={1.5}
      />
      {gunModels[currentWeaponRef.current] || gunModels[0]}
    </group>
  )
}
