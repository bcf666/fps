import { useRef, useState, useEffect } from 'react'
import { useMobileStore } from '../../stores/mobileStore'
import {
  Crosshair, Target, ChevronUp, RefreshCw, Hand,
  ArrowDown, ChevronsDown, Zap, ChevronDown, Triangle,
} from 'lucide-react'

interface TouchButtonProps {
  onPress: () => void
  onRelease?: () => void
  size?: 'sm' | 'md' | 'lg'
  variant?: 'shoot' | 'aim' | 'jump' | 'reload' | 'pickup' | 'crouch' | 'prone' | 'sprint' | 'switch'
  icon: React.ReactNode
  label?: string
  hold?: boolean
}

function TouchButton({
  onPress, onRelease, size = 'md', variant = 'shoot', icon, label, hold = true,
}: TouchButtonProps) {
  const [pressed, setPressed] = useState(false)
  const btnRef = useRef<HTMLButtonElement>(null)

  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-20 h-20',
  }

  // 各按钮的样式配置：渐变背景、边框、阴影、激活态
  const variantStyles: Record<string, { bg: string; border: string; glow: string; activeBg: string }> = {
    shoot: {
      bg: 'radial-gradient(circle at 35% 35%, rgba(255,80,80,0.95) 0%, rgba(200,30,30,0.85) 60%, rgba(120,15,15,0.9) 100%)',
      border: '2px solid rgba(255,150,150,0.7)',
      glow: '0 0 20px rgba(255,60,60,0.5), 0 4px 12px rgba(0,0,0,0.5), inset 0 2px 6px rgba(255,255,255,0.3)',
      activeBg: 'radial-gradient(circle at 35% 35%, rgba(200,40,40,0.95) 0%, rgba(150,20,20,0.9) 60%, rgba(80,10,10,0.95) 100%)',
    },
    aim: {
      bg: 'radial-gradient(circle at 35% 35%, rgba(80,150,255,0.85) 0%, rgba(40,90,200,0.8) 60%, rgba(20,50,120,0.85) 100%)',
      border: '2px solid rgba(150,200,255,0.7)',
      glow: '0 0 14px rgba(60,120,255,0.4), 0 4px 10px rgba(0,0,0,0.5), inset 0 2px 6px rgba(255,255,255,0.25)',
      activeBg: 'radial-gradient(circle at 35% 35%, rgba(50,110,200,0.9) 0%, rgba(30,70,160,0.85) 60%, rgba(15,40,90,0.9) 100%)',
    },
    jump: {
      bg: 'radial-gradient(circle at 35% 35%, rgba(80,220,120,0.85) 0%, rgba(40,170,70,0.8) 60%, rgba(20,100,40,0.85) 100%)',
      border: '2px solid rgba(150,255,180,0.7)',
      glow: '0 0 14px rgba(60,200,90,0.4), 0 4px 10px rgba(0,0,0,0.5), inset 0 2px 6px rgba(255,255,255,0.25)',
      activeBg: 'radial-gradient(circle at 35% 35%, rgba(50,180,90,0.9) 0%, rgba(30,130,55,0.85) 60%, rgba(15,80,30,0.9) 100%)',
    },
    reload: {
      bg: 'radial-gradient(circle at 35% 35%, rgba(255,200,80,0.85) 0%, rgba(210,150,30,0.8) 60%, rgba(130,90,15,0.85) 100%)',
      border: '2px solid rgba(255,230,150,0.7)',
      glow: '0 0 12px rgba(255,180,50,0.4), 0 4px 10px rgba(0,0,0,0.5), inset 0 2px 6px rgba(255,255,255,0.25)',
      activeBg: 'radial-gradient(circle at 35% 35%, rgba(210,160,50,0.9) 0%, rgba(160,110,20,0.85) 60%, rgba(90,60,10,0.9) 100%)',
    },
    pickup: {
      bg: 'radial-gradient(circle at 35% 35%, rgba(120,220,160,0.85) 0%, rgba(60,170,100,0.8) 60%, rgba(30,100,60,0.85) 100%)',
      border: '2px solid rgba(180,255,200,0.7)',
      glow: '0 0 12px rgba(100,200,130,0.4), 0 4px 10px rgba(0,0,0,0.5), inset 0 2px 6px rgba(255,255,255,0.25)',
      activeBg: 'radial-gradient(circle at 35% 35%, rgba(80,180,120,0.9) 0%, rgba(40,130,75,0.85) 60%, rgba(20,80,45,0.9) 100%)',
    },
    crouch: {
      bg: 'radial-gradient(circle at 35% 35%, rgba(120,160,220,0.8) 0%, rgba(60,90,160,0.75) 60%, rgba(30,50,100,0.8) 100%)',
      border: '2px solid rgba(180,200,255,0.65)',
      glow: '0 0 10px rgba(80,120,200,0.35), 0 3px 8px rgba(0,0,0,0.5), inset 0 2px 5px rgba(255,255,255,0.2)',
      activeBg: 'radial-gradient(circle at 35% 35%, rgba(80,120,180,0.85) 0%, rgba(40,70,130,0.8) 60%, rgba(20,40,80,0.85) 100%)',
    },
    prone: {
      bg: 'radial-gradient(circle at 35% 35%, rgba(120,160,220,0.8) 0%, rgba(60,90,160,0.75) 60%, rgba(30,50,100,0.8) 100%)',
      border: '2px solid rgba(180,200,255,0.65)',
      glow: '0 0 10px rgba(80,120,200,0.35), 0 3px 8px rgba(0,0,0,0.5), inset 0 2px 5px rgba(255,255,255,0.2)',
      activeBg: 'radial-gradient(circle at 35% 35%, rgba(80,120,180,0.85) 0%, rgba(40,70,130,0.8) 60%, rgba(20,40,80,0.85) 100%)',
    },
    sprint: {
      bg: 'radial-gradient(circle at 35% 35%, rgba(255,210,80,0.85) 0%, rgba(220,150,30,0.8) 60%, rgba(140,90,15,0.85) 100%)',
      border: '2px solid rgba(255,230,150,0.7)',
      glow: '0 0 12px rgba(255,180,50,0.4), 0 4px 10px rgba(0,0,0,0.5), inset 0 2px 6px rgba(255,255,255,0.25)',
      activeBg: 'radial-gradient(circle at 35% 35%, rgba(210,160,50,0.9) 0%, rgba(160,110,20,0.85) 60%, rgba(90,60,10,0.9) 100%)',
    },
    switch: {
      bg: 'radial-gradient(circle at 35% 35%, rgba(180,180,190,0.7) 0%, rgba(110,110,125,0.65) 60%, rgba(60,60,75,0.7) 100%)',
      border: '2px solid rgba(220,220,230,0.55)',
      glow: '0 0 8px rgba(180,180,200,0.3), 0 3px 8px rgba(0,0,0,0.5), inset 0 2px 5px rgba(255,255,255,0.2)',
      activeBg: 'radial-gradient(circle at 35% 35%, rgba(140,140,155,0.8) 0%, rgba(80,80,95,0.75) 60%, rgba(40,40,55,0.8) 100%)',
    },
  }

  const vs = variantStyles[variant]

  const handleStart = (e: React.TouchEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setPressed(true)
    onPress()
  }
  const handleEnd = (e: React.TouchEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setPressed(false)
    if (hold && onRelease) onRelease()
  }

  return (
    <button
      ref={btnRef}
      className={`${sizeClasses[size]} rounded-full flex flex-col items-center justify-center touch-none select-none transition-transform duration-75 relative z-40`}
      style={{
        background: pressed ? vs.activeBg : vs.bg,
        border: vs.border,
        boxShadow: pressed
          ? vs.glow.replace(/0 4px|0 3px/g, '0 2px') + ', inset 0 4px 10px rgba(0,0,0,0.4)'
          : vs.glow,
        transform: pressed ? 'scale(0.92)' : 'scale(1)',
        WebkitTapHighlightColor: 'transparent',
      }}
      onTouchStart={handleStart}
      onTouchEnd={handleEnd}
      onTouchCancel={handleEnd}
    >
      <div style={{ color: 'rgba(255,255,255,0.95)', filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.6))' }}>
        {icon}
      </div>
      {label && (
        <span
          className="mt-0.5 font-bold text-white"
          style={{
            fontSize: size === 'sm' ? '8px' : '10px',
            textShadow: '0 1px 2px rgba(0,0,0,0.8)',
            opacity: 0.9,
          }}
        >
          {label}
        </span>
      )}
    </button>
  )
}

export default function MobileControls() {
  const {
    setShoot, setJump, setAim, setReload,
    setCrouch, setProne, setSprint, setPickup, setSwitchWeapon,
  } = useMobileStore()

  // 防止上下文菜单长按弹出
  useEffect(() => {
    const handler = (e: Event) => e.preventDefault()
    document.addEventListener('contextmenu', handler)
    return () => document.removeEventListener('contextmenu', handler)
  }, [])

  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* 右下角主操作组：武器切换 + 瞄准 + 跳跃 + 射击 */}
      <div className="absolute right-4 bottom-6 flex items-end gap-3 pointer-events-auto">
        {/* 武器切换上下按钮 */}
        <div className="flex flex-col gap-2 mr-1">
          <TouchButton
            variant="switch"
            size="sm"
            icon={<ChevronUp size={18} />}
            onPress={() => setSwitchWeapon(1)}
            hold={false}
          />
          <TouchButton
            variant="switch"
            size="sm"
            icon={<ChevronDown size={18} />}
            onPress={() => setSwitchWeapon(-1)}
            hold={false}
          />
        </div>

        <TouchButton
          variant="aim"
          size="md"
          icon={<Target size={22} />}
          label="瞄准"
          onPress={() => setAim(true)}
          onRelease={() => setAim(false)}
        />

        <TouchButton
          variant="jump"
          size="md"
          icon={<Triangle size={20} />}
          label="跳"
          onPress={() => setJump(true)}
          onRelease={() => setJump(false)}
        />

        <TouchButton
          variant="shoot"
          size="lg"
          icon={<Crosshair size={28} />}
          onPress={() => setShoot(true)}
          onRelease={() => setShoot(false)}
        />
      </div>

      {/* 右侧辅助操作组：换弹 + 拾取 */}
      <div className="absolute right-6 bottom-32 flex flex-col gap-3 pointer-events-auto">
        <TouchButton
          variant="reload"
          size="sm"
          icon={<RefreshCw size={18} />}
          label="换弹"
          onPress={() => setReload(true)}
          onRelease={() => setReload(false)}
        />
        <TouchButton
          variant="pickup"
          size="sm"
          icon={<Hand size={18} />}
          label="拾取"
          onPress={() => setPickup(true)}
          onRelease={() => setPickup(false)}
        />
      </div>

      {/* 右侧姿势组：蹲 + 趴 */}
      <div className="absolute right-24 bottom-40 flex flex-col gap-3 pointer-events-auto">
        <TouchButton
          variant="crouch"
          size="sm"
          icon={<ArrowDown size={18} />}
          label="蹲"
          onPress={() => setCrouch(true)}
          onRelease={() => setCrouch(false)}
        />
        <TouchButton
          variant="prone"
          size="sm"
          icon={<ChevronsDown size={18} />}
          label="趴"
          onPress={() => setProne(true)}
          onRelease={() => setProne(false)}
        />
      </div>

      {/* 左侧冲刺按钮（摇杆上方，避开摇杆区域） */}
      <div className="absolute left-4 bottom-52 pointer-events-auto">
        <TouchButton
          variant="sprint"
          size="sm"
          icon={<Zap size={18} />}
          label="冲刺"
          onPress={() => setSprint(true)}
          onRelease={() => setSprint(false)}
        />
      </div>
    </div>
  )
}
