import { useRef, useEffect, useCallback } from 'react'
import { useMobileStore } from '../../stores/mobileStore'

export default function TouchLook() {
  const touchIdRef = useRef<number | null>(null)
  const lastPosRef = useRef({ x: 0, y: 0 })
  const setLookDelta = useMobileStore((s) => s.setLookDelta)

  const sensitivity = 0.005

  const handleTouchStart = useCallback((e: TouchEvent) => {
    for (let i = 0; i < e.changedTouches.length; i++) {
      const touch = e.changedTouches[i]
      const target = touch.target as HTMLElement
      if (target.closest('button')) continue

      if (touch.clientX > window.innerWidth * 0.4) {
        if (touchIdRef.current === null) {
          touchIdRef.current = touch.identifier
          lastPosRef.current = { x: touch.clientX, y: touch.clientY }
          break
        }
      }
    }
  }, [])

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (touchIdRef.current === null) return

    const touch = Array.from(e.changedTouches).find(t => t.identifier === touchIdRef.current)
    if (!touch) return

    const dx = touch.clientX - lastPosRef.current.x
    const dy = touch.clientY - lastPosRef.current.y

    lastPosRef.current = { x: touch.clientX, y: touch.clientY }

    setLookDelta(dx * sensitivity, dy * sensitivity)
  }, [setLookDelta, sensitivity])

  const handleTouchEnd = useCallback((e: TouchEvent) => {
    if (touchIdRef.current === null) return

    const touch = Array.from(e.changedTouches).find(t => t.identifier === touchIdRef.current)
    if (!touch) return

    touchIdRef.current = null
  }, [])

  useEffect(() => {
    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchmove', handleTouchMove, { passive: true })
    window.addEventListener('touchend', handleTouchEnd)
    window.addEventListener('touchcancel', handleTouchEnd)

    return () => {
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleTouchEnd)
      window.removeEventListener('touchcancel', handleTouchEnd)
    }
  }, [handleTouchStart, handleTouchMove, handleTouchEnd])

  return null
}
