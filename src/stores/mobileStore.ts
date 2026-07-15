import { create } from 'zustand'

interface MobileState {
  isMobile: boolean
  moveX: number
  moveY: number
  lookDeltaX: number
  lookDeltaY: number
  shoot: boolean
  jump: boolean
  sprint: boolean
  crouch: boolean
  prone: boolean
  aim: boolean
  reload: boolean
  pickup: boolean
  switchWeapon: number

  setIsMobile: (v: boolean) => void
  setMove: (x: number, y: number) => void
  setLookDelta: (x: number, y: number) => void
  consumeLookDelta: () => { x: number; y: number }
  setShoot: (v: boolean) => void
  setJump: (v: boolean) => void
  setSprint: (v: boolean) => void
  setCrouch: (v: boolean) => void
  setProne: (v: boolean) => void
  setAim: (v: boolean) => void
  setReload: (v: boolean) => void
  setPickup: (v: boolean) => void
  setSwitchWeapon: (delta: number) => void
}

export const useMobileStore = create<MobileState>((set, get) => ({
  isMobile: false,
  moveX: 0,
  moveY: 0,
  lookDeltaX: 0,
  lookDeltaY: 0,
  shoot: false,
  jump: false,
  sprint: false,
  crouch: false,
  prone: false,
  aim: false,
  reload: false,
  pickup: false,
  switchWeapon: 0,

  setIsMobile: (v) => set({ isMobile: v }),
  setMove: (x, y) => set({ moveX: x, moveY: y }),
  setLookDelta: (x, y) => set((state) => ({ lookDeltaX: state.lookDeltaX + x, lookDeltaY: state.lookDeltaY + y })),
  consumeLookDelta: () => {
    const state = get()
    const dx = state.lookDeltaX
    const dy = state.lookDeltaY
    set({ lookDeltaX: 0, lookDeltaY: 0 })
    return { x: dx, y: dy }
  },
  setShoot: (v) => set({ shoot: v }),
  setJump: (v) => set({ jump: v }),
  setSprint: (v) => set({ sprint: v }),
  setCrouch: (v) => set({ crouch: v }),
  setProne: (v) => set({ prone: v }),
  setAim: (v) => set({ aim: v }),
  setReload: (v) => set({ reload: v }),
  setPickup: (v) => set({ pickup: v }),
  setSwitchWeapon: (delta) => set((state) => ({ switchWeapon: state.switchWeapon + delta })),
}))
