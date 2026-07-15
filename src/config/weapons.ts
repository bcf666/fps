export interface WeaponConfig {
  id: string
  name: string
  type: 'assault' | 'sniper' | 'pistol'
  damage: number
  rpm: number
  magSize: number
  reloadTime: number
  recoil: number
  recoilRecovery: number
  spread: number
  hasScope: boolean
  scopeZoom?: number
  adsFov: number
  adsSpreadMult: number
  adsMoveMult: number
  cost: number
  buyCategory: 'pistol' | 'assault' | 'sniper'
  description: string
}

export const WEAPONS: WeaponConfig[] = [
  {
    id: 'deagle',
    name: 'Desert Eagle',
    type: 'pistol',
    damage: 53,
    rpm: 300,
    magSize: 7,
    reloadTime: 2.0,
    recoil: 1.3,
    recoilRecovery: 0.004,
    spread: 0.025,
    hasScope: false,
    adsFov: 68,
    adsSpreadMult: 0.65,
    adsMoveMult: 0.7,
    cost: 300,
    buyCategory: 'pistol',
    description: '.50AE大口径手枪\n高伤害·弹匣小',
  },
  {
    id: 'ak47',
    name: 'AK-47',
    type: 'assault',
    damage: 36,
    rpm: 600,
    magSize: 30,
    reloadTime: 2.5,
    recoil: 1.0,
    recoilRecovery: 0.005,
    spread: 0.02,
    hasScope: false,
    adsFov: 40,
    adsSpreadMult: 0.5,
    adsMoveMult: 0.6,
    cost: 700,
    buyCategory: 'assault',
    description: '7.62mm突击步枪\n高伤害·高后坐力',
  },
  {
    id: 'm4a1',
    name: 'M4A1',
    type: 'assault',
    damage: 28,
    rpm: 750,
    magSize: 30,
    reloadTime: 2.2,
    recoil: 0.6,
    recoilRecovery: 0.008,
    spread: 0.015,
    hasScope: false,
    adsFov: 42,
    adsSpreadMult: 0.4,
    adsMoveMult: 0.65,
    cost: 800,
    buyCategory: 'assault',
    description: '5.56mm突击步枪\n低后坐力·高射速',
  },
  {
    id: 'awp',
    name: 'AWP',
    type: 'sniper',
    damage: 100,
    rpm: 41,
    magSize: 5,
    reloadTime: 3.7,
    recoil: 2.0,
    recoilRecovery: 0.002,
    spread: 0.003,
    hasScope: true,
    scopeZoom: 25,
    adsFov: 3,
    adsSpreadMult: 0.1,
    adsMoveMult: 0.3,
    cost: 1500,
    buyCategory: 'sniper',
    description: '.338狙击步枪\n一枪致命·开镜瞄准',
  },
]

export const BUYABLE_WEAPONS = WEAPONS.filter(w => w.buyCategory !== 'pistol' || w.id === 'deagle')

export function getShootCooldown(weapon: WeaponConfig): number {
  return 60 / weapon.rpm
}

export function getRecoilValues(weapon: WeaponConfig) {
  return {
    pitch: weapon.recoil * 0.008,
    yaw: weapon.recoil * 0.003,
    spread: weapon.spread,
  }
}

export const GROUND_WEAPON_SPAWNS: { x: number; z: number; weaponIndex: number }[] = [
  { x: -15, z: -20, weaponIndex: 1 },
  { x: 15, z: -20, weaponIndex: 2 },
  { x: -15, z: 20, weaponIndex: 1 },
  { x: 15, z: 20, weaponIndex: 2 },
  { x: 0, z: -15, weaponIndex: 3 },
  { x: 0, z: 15, weaponIndex: 3 },
  { x: -35, z: 0, weaponIndex: 1 },
  { x: 35, z: 0, weaponIndex: 2 },
]
