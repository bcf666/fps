import { create } from 'zustand'
import { WEAPONS } from '../config/weapons'
import { GroundWeapon } from '../network/websocket'

export interface Player {
  id: string
  name: string
  team: 'red' | 'blue'
  position: { x: number; y: number; z: number }
  rotation: { x: number; y: number }
  health: number
  isReady: boolean
  isAlive: boolean
  kills: number
  deaths: number
  money?: number
  weapons?: { index: number; permanent: boolean }[]
  currentWeaponSlot?: number
}

export interface Room {
  id: string
  name: string
  mapId: string
  hostId: string
  players: Player[]
  status: 'waiting' | 'playing' | 'ended'
  maxPlayers: number
  gameEndAt?: number | null
  winner?: 'red' | 'blue' | 'draw' | null
  redKills?: number
  blueKills?: number
}

interface GameState {
  playerName: string
  playerId: string
  currentRoom: Room | null
  rooms: Room[]
  isConnected: boolean
  gameTime: number
  killFeed: { killer: string; victim: string; time: number; killerTeam?: 'red' | 'blue'; victimTeam?: 'red' | 'blue' }[]
  localShootEvent: number
  winner: 'red' | 'blue' | 'draw' | null
  redKills: number
  blueKills: number
  ammo: number
  maxAmmo: number
  isReloading: boolean
  currentWeaponIndex: number
  isAiming: boolean
  money: number
  groundWeapons: GroundWeapon[]
  playerWeapons: { index: number; permanent: boolean }[]
  playerWeaponSlot: number
  isSolo: boolean
  localHealth: number
  soloInvuln: boolean

  setPlayerName: (name: string) => void
  setPlayerId: (id: string) => void
  setRooms: (rooms: Room[]) => void
  setCurrentRoom: (room: Room | null) => void
  updateRoom: (room: Room) => void
  addRoom: (room: Room) => void
  removeRoom: (roomId: string) => void
  setIsConnected: (connected: boolean) => void
  setGameTime: (time: number) => void
  addKill: (killer: string, victim: string, killerTeam?: 'red' | 'blue', victimTeam?: 'red' | 'blue') => void
  triggerLocalShoot: () => void
  updateRoomFromHit: (data: { targetId: string; health: number; attackerId: string }) => void
  handlePlayerRespawn: (data: { playerId: string; position: { x: number; y: number; z: number } }) => void
  resetGame: () => void
  setWinner: (winner: 'red' | 'blue' | 'draw' | null) => void
  setTeamScores: (red: number, blue: number) => void
  setAmmo: (ammo: number) => void
  setReloading: (reloading: boolean) => void
  setCurrentWeapon: (index: number) => void
  setIsAiming: (aiming: boolean) => void
  setMoney: (money: number) => void
  setGroundWeapons: (weapons: GroundWeapon[]) => void
  setPlayerWeapons: (weapons: { index: number; permanent: boolean }[], slot: number) => void
  setIsSolo: (solo: boolean) => void
  setLocalHealth: (health: number) => void
  setSoloInvuln: (invuln: boolean) => void
}

export const useGameStore = create<GameState>((set) => ({
  playerName: '',
  playerId: '',
  currentRoom: null,
  rooms: [],
  isConnected: false,
  gameTime: 900,
  killFeed: [],
  localShootEvent: 0,
  winner: null,
  redKills: 0,
  blueKills: 0,
  ammo: 7,
  maxAmmo: 7,
  isReloading: false,
  currentWeaponIndex: 0,
  isAiming: false,
  money: 300,
  groundWeapons: [],
  playerWeapons: [{ index: 0, permanent: false }],
  playerWeaponSlot: 0,
  isSolo: false,
  localHealth: 100,
  soloInvuln: false,

  setPlayerName: (name) => set({ playerName: name }),
  setPlayerId: (id) => set({ playerId: id }),
  setRooms: (rooms) => set({ rooms }),
  setCurrentRoom: (room) => set({ currentRoom: room }),
  updateRoom: (room) => set((state) => ({
    rooms: state.rooms.map(r => r.id === room.id ? room : r),
    currentRoom: state.currentRoom?.id === room.id ? room : state.currentRoom,
    redKills: room.redKills ?? state.redKills,
    blueKills: room.blueKills ?? state.blueKills,
    winner: room.winner ?? state.winner
  })),
  addRoom: (room) => set((state) => ({ rooms: [...state.rooms, room] })),
  removeRoom: (roomId) => set((state) => ({
    rooms: state.rooms.filter(r => r.id !== roomId)
  })),
  setIsConnected: (connected) => set({ isConnected: connected }),
  setGameTime: (time) => set({ gameTime: time }),
  addKill: (killer, victim, killerTeam, victimTeam) => set((state) => ({
    killFeed: [...state.killFeed.slice(-4), { killer, victim, time: Date.now(), killerTeam, victimTeam }]
  })),
  triggerLocalShoot: () => set((state) => ({ localShootEvent: state.localShootEvent + 1 })),
  updateRoomFromHit: (data) => set((state) => {
    if (!state.currentRoom) return state
    const updatedRoom = {
      ...state.currentRoom,
      players: state.currentRoom.players.map(p =>
        p.id === data.targetId ? { ...p, health: data.health } : p
      )
    }
    return {
      currentRoom: updatedRoom,
      rooms: state.rooms.map(r => r.id === updatedRoom.id ? updatedRoom : r)
    }
  }),
  handlePlayerRespawn: (data) => set((state) => {
    if (!state.currentRoom) return state
    const updatedRoom = {
      ...state.currentRoom,
      players: state.currentRoom.players.map(p =>
        p.id === data.playerId ? { ...p, position: data.position, isAlive: true, health: 100 } : p
      )
    }
    return {
      currentRoom: updatedRoom,
      rooms: state.rooms.map(r => r.id === updatedRoom.id ? updatedRoom : r)
    }
  }),
  resetGame: () => set({ currentRoom: null, gameTime: 900, killFeed: [], winner: null, redKills: 0, blueKills: 0, ammo: 7, isReloading: false, currentWeaponIndex: 0, isAiming: false, money: 300, groundWeapons: [], playerWeapons: [{ index: 0, permanent: false }], playerWeaponSlot: 0 }),
  setWinner: (winner) => set({ winner }),
  setTeamScores: (red, blue) => set({ redKills: red, blueKills: blue }),
  setAmmo: (ammo) => set({ ammo }),
  setReloading: (reloading) => set({ isReloading: reloading }),
  setCurrentWeapon: (index) => set((state) => {
    const weapon = WEAPONS[index]
    if (!weapon) return state
    return {
      currentWeaponIndex: index,
      ammo: weapon.magSize,
      maxAmmo: weapon.magSize,
      isReloading: false,
      isAiming: false,
    }
  }),
  setIsAiming: (aiming) => set({ isAiming: aiming }),
  setMoney: (money) => set({ money }),
  setGroundWeapons: (groundWeapons) => set({ groundWeapons }),
  setIsSolo: (solo) => set({ isSolo: solo }),
  setLocalHealth: (health) => set({ localHealth: health }),
  setSoloInvuln: (invuln) => set({ soloInvuln: invuln }),
  setPlayerWeapons: (playerWeapons, playerWeaponSlot) => set({
    playerWeapons,
    playerWeaponSlot,
    currentWeaponIndex: playerWeapons[playerWeaponSlot]?.index ?? 0,
    maxAmmo: WEAPONS[playerWeapons[playerWeaponSlot]?.index ?? 0]?.magSize ?? 30,
    isReloading: false,
    isAiming: false,
  }),
}))
