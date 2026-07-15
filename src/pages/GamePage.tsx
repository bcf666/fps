import { useEffect, useState, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Canvas } from '@react-three/fiber'
import { useGameStore } from '../stores/gameStore'
import { useMobileStore } from '../stores/mobileStore'
import { network } from '../network/websocket'
import GameHUD from '../components/game/GameHUD'
import FPSController from '../components/game/FPSController'
import GameMap from '../components/game/GameMap'
import OtherPlayers from '../components/game/OtherPlayers'
import FirstPersonGun from '../components/game/FirstPersonGun'
import Bullets from '../components/game/Bullets'
import BuyMenu from '../components/game/BuyMenu'
import GroundWeapons from '../components/game/GroundWeapons'
import VirtualJoystick from '../components/game/VirtualJoystick'
import MobileControls from '../components/game/MobileControls'
import TouchLook from '../components/game/TouchLook'
import SoloManager from '../game/solo/SoloManager'
import { clearSolo } from '../game/solo/soloCombat'

export default function GamePage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { currentRoom, isSolo } = useGameStore()
  const isMobile = useMobileStore((s) => s.isMobile)
  const setIsMobile = useMobileStore((s) => s.setIsMobile)
  const [isPlaying] = useState(true)
  const [showBuyMenu, setShowBuyMenu] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const checkMobile = () => {
      const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 'ontouchstart' in window
      setIsMobile(mobile)
    }
    checkMobile()
  }, [setIsMobile])

  useEffect(() => {
    network.on('game_ended', (data: unknown) => {
      const result = data as { room: { id: string } }
      navigate(`/result/${result.room.id}`)
    })

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'KeyB' && !showBuyMenu && !useGameStore.getState().isSolo) {
        setShowBuyMenu(true)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      network.off('game_ended', () => {})
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [id, navigate, showBuyMenu])

  const handleExit = () => {
    if (useGameStore.getState().isSolo) {
      clearSolo()
      navigate('/')
      return
    }
    network.leaveRoom()
    navigate('/lobby')
  }

  if (!currentRoom || !isPlaying) {
    return null
  }

  return (
    <div ref={containerRef} className="w-full h-full relative bg-primary">
      <Canvas
        gl={{ antialias: true }}
        camera={{ fov: 75, near: 0.1, far: 1000 }}
      >
        <color attach="background" args={['#7ba8cc']} />
        <fog attach="fog" args={['#c4a882', currentRoom?.mapId === 'campus' ? 300 : 120, currentRoom?.mapId === 'campus' ? 800 : 400]} />
        <ambientLight intensity={0.3} />
        <pointLight position={[0, 10, 0]} intensity={0.5} color="#00f0ff" />
        
        <GameMap mapId={currentRoom?.mapId} />
        
        <FPSController />
        <OtherPlayers />
        <Bullets />
        <GroundWeapons />
        {isSolo && <SoloManager />}

        <FirstPersonGun />
      </Canvas>

      <GameHUD onExit={handleExit} onOpenBuyMenu={isSolo ? undefined : () => setShowBuyMenu(true)} />
      {showBuyMenu && !isSolo && <BuyMenu onClose={() => setShowBuyMenu(false)} />}
      {isMobile && (
        <>
          <VirtualJoystick />
          <MobileControls />
          <TouchLook />
        </>
      )}
    </div>
  )
}
