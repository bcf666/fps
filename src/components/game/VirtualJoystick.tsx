import { useRef, useEffect, useCallback } from 'react'
import { useMobileStore } from '../../stores/mobileStore'

export default function VirtualJoystick() {
  const joystickRef = useRef<HTMLDivElement>(null)
  const knobRef = useRef<HTMLDivElement>(null)
  const touchIdRef = useRef<number | null>(null)
  const centerRef = useRef({ x: 0, y: 0 })
  const setMove = useMobileStore((s) => s.setMove)

  const maxRadius = 55

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const touch = e.targetTouches[0]
    if (!touch || !joystickRef.current) return

    touchIdRef.current = touch.identifier
    const rect = joystickRef.current.getBoundingClientRect()
    centerRef.current = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    }
  }, [])

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (touchIdRef.current === null) return

    const touch = Array.from(e.changedTouches).find(t => t.identifier === touchIdRef.current)
    if (!touch || !knobRef.current) return

    e.preventDefault()

    const dx = touch.clientX - centerRef.current.x
    const dy = touch.clientY - centerRef.current.y
    const distance = Math.sqrt(dx * dx + dy * dy)
    const clampedDist = Math.min(distance, maxRadius)
    const angle = Math.atan2(dy, dx)

    const knobX = Math.cos(angle) * clampedDist
    const knobY = Math.sin(angle) * clampedDist

    knobRef.current.style.transform = `translate(${knobX}px, ${knobY}px)`

    const moveX = dx / maxRadius
    const moveY = -dy / maxRadius
    const clampedX = Math.max(-1, Math.min(1, moveX))
    const clampedY = Math.max(-1, Math.min(1, moveY))

    setMove(clampedX, clampedY)
  }, [setMove])

  const handleTouchEnd = useCallback((e: TouchEvent) => {
    if (touchIdRef.current === null) return

    const touch = Array.from(e.changedTouches).find(t => t.identifier === touchIdRef.current)
    if (!touch) return

    touchIdRef.current = null
    if (knobRef.current) {
      knobRef.current.style.transform = 'translate(0, 0)'
    }
    setMove(0, 0)
  }, [setMove])

  useEffect(() => {
    window.addEventListener('touchmove', handleTouchMove, { passive: false })
    window.addEventListener('touchend', handleTouchEnd)
    window.addEventListener('touchcancel', handleTouchEnd)

    return () => {
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleTouchEnd)
      window.removeEventListener('touchcancel', handleTouchEnd)
    }
  }, [handleTouchMove, handleTouchEnd])

  return (
    <div
      ref={joystickRef}
      className="absolute bottom-10 left-6 w-36 h-36 rounded-full touch-none select-none z-40"
      style={{
        background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, rgba(0,0,0,0.25) 70%, rgba(0,0,0,0.4) 100%)',
        border: '2px solid rgba(255,255,255,0.15)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.4), inset 0 2px 8px rgba(0,0,0,0.3)',
      }}
      onTouchStart={handleTouchStart}
    >
      {/* 方向指示线 */}
      <div className="absolute inset-2 rounded-full" style={{ border: '1px solid rgba(255,255,255,0.06)' }} />
      <div className="absolute top-1/2 left-0 right-0 h-px" style={{ background: 'rgba(255,255,255,0.05)' }} />
      <div className="absolute left-1/2 top-0 bottom-0 w-px" style={{ background: 'rgba(255,255,255,0.05)' }} />

      {/* 中心点 */}
      <div className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full -translate-x-1/2 -translate-y-1/2" style={{ background: 'rgba(255,255,255,0.2)' }} />

      <div
        ref={knobRef}
        className="absolute top-1/2 left-1/2 w-16 h-16 rounded-full -translate-x-1/2 -translate-y-1/2"
        style={{
          willChange: 'transform',
          transform: 'translate(0, 0)',
          background: 'radial-gradient(circle at 35% 35%, rgba(255,255,255,0.5) 0%, rgba(180,200,220,0.3) 40%, rgba(80,100,120,0.4) 100%)',
          border: '2px solid rgba(255,255,255,0.4)',
          boxShadow: '0 4px 12px rgba(0,0,0,0.5), inset 0 1px 4px rgba(255,255,255,0.2)',
        }}
      />
    </div>
  )
}
