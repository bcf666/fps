import { useGameStore } from '../../stores/gameStore'
import { useMobileStore } from '../../stores/mobileStore'
import { useEffect, useState, useRef } from 'react'
import { LogOut, Heart, Crosshair, DollarSign, Clock, ShoppingBag } from 'lucide-react'
import { WEAPONS } from '../../config/weapons'
import MiniMap from './MiniMap'

interface GameHUDProps {
  onExit: () => void
  onOpenBuyMenu?: () => void
}

export default function GameHUD({ onExit, onOpenBuyMenu }: GameHUDProps) {
  const { currentRoom, playerId, killFeed, gameTime, setGameTime, ammo, maxAmmo, isReloading, currentWeaponIndex, isAiming, money, playerWeapons, playerWeaponSlot, isSolo, localHealth, soloInvuln } = useGameStore()
  const isMobile = useMobileStore((s) => s.isMobile)
  const [health, setHealth] = useState(100)
  const gameTimeRef = useRef(gameTime)

  useEffect(() => {
    gameTimeRef.current = gameTime
  }, [gameTime])

  useEffect(() => {
    const interval = setInterval(() => {
      setGameTime(Math.max(0, gameTimeRef.current - 1))
    }, 1000)
    return () => clearInterval(interval)
  }, [setGameTime])

  useEffect(() => {
    if (isSolo) {
      setHealth(localHealth)
    } else if (currentRoom && currentRoom.players) {
      const me = currentRoom.players.find(p => p.id === playerId)
      if (me) {
        setHealth(me.health)
      }
    }
  }, [currentRoom, playerId, isSolo, localHealth])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const weapon = WEAPONS[currentWeaponIndex]
  const isScoping = isAiming && weapon?.type === 'sniper'
  const weaponTypeText = weapon?.type === 'sniper' ? '狙击' : weapon?.type === 'pistol' ? '手枪' : '步枪'
  const showSoloDeath = isSolo && health <= 0
  const showSoloInvuln = isSolo && soloInvuln && health > 0

  const soloDeathOverlay = showSoloDeath ? (
    <div className="absolute inset-0 flex items-center justify-center z-40 pointer-events-none">
      <div className="glass-panel rounded-lg px-8 py-6 text-center">
        <p className="font-title text-3xl text-danger mb-2 glow-text">已阵亡</p>
        <p className="text-gray-400 text-sm">重新生成中…</p>
      </div>
    </div>
  ) : null

  const soloInvulnBanner = showSoloInvuln ? (
    <div className="absolute top-20 left-1/2 -translate-x-1/2 z-40 pointer-events-none">
      <div className="glass-panel rounded-full px-5 py-1.5 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
        <span className="text-accent text-sm tracking-wider">重生保护 · 无敌</span>
      </div>
    </div>
  ) : null

  // 移动端：紧凑型 HUD
  if (isMobile) {
    return (
      <div className="absolute inset-0 pointer-events-none">
        {/* 准星 - 开镜狙击时不显示 */}
        {!isScoping && (
          <div className="crosshair">
            <div className="absolute top-1/2 left-1/2 w-0.5 h-3 bg-accent -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute top-1/2 left-1/2 w-3 h-0.5 bg-accent -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-accent rounded-full -translate-x-1/2 -translate-y-1/2" />
          </div>
        )}

        {/* 狙击镜开镜效果 */}
        {isScoping && (
          <div className="absolute inset-0 flex items-center justify-center z-50" style={{ pointerEvents: 'none' }}>
            <div className="absolute inset-0" style={{
              background: `radial-gradient(circle at 50% 50%, transparent 30%, rgba(0,0,0,1) 32%)`,
              pointerEvents: 'none'
            }} />
            <div className="absolute w-full h-px bg-black/90" style={{ top: '50%' }} />
            <div className="absolute h-full w-px bg-black/90" style={{ left: '50%' }} />
            <div className="absolute w-1 h-1 bg-red-500 rounded-full" style={{
              top: 'calc(50% - 0.125rem)',
              left: 'calc(50% - 0.125rem)',
              boxShadow: '0 0 4px rgba(255, 0, 0, 0.8)'
            }} />
          </div>
        )}

        {/* 顶部状态栏：紧凑横条 */}
        <div className="absolute top-2 left-2 right-2 flex justify-between items-start gap-2 pointer-events-auto">
          {/* 左：血量 + 武器 + 金钱 紧凑卡片 */}
          <div className="flex flex-col gap-1.5">
            {/* 血量条 */}
            <div className="glass-panel rounded-md px-2 py-1.5 flex items-center gap-2" style={{ minWidth: '120px' }}>
              <Heart className="text-danger" size={12} />
              <div className="flex-1 h-1.5 bg-secondary rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-danger to-success transition-all duration-300"
                  style={{ width: `${health}%` }}
                />
              </div>
              <span className="text-white text-xs font-body">{health}</span>
            </div>

            {/* 武器 + 弹药 */}
            <div className="glass-panel rounded-md px-2 py-1" style={{ minWidth: '120px' }}>
              <div className="flex items-center justify-between">
                <span className="text-accent font-bold text-xs">{weapon?.name || '???'}</span>
                <span className="text-gray-500 text-[10px]">{weaponTypeText}</span>
              </div>
              <div className="flex items-baseline gap-1">
                <Crosshair size={10} className="text-gray-400" />
                <span className={`font-title text-lg leading-none ${ammo <= 5 ? 'text-danger' : 'text-accent'}`}>
                  {ammo}
                </span>
                <span className="text-gray-500 text-xs">/ {maxAmmo}</span>
                {isReloading && (
                  <span className="text-yellow-400 text-[10px] animate-pulse ml-1">换弹</span>
                )}
              </div>
              <div className="flex gap-1 mt-0.5">
                {playerWeapons.map((pw, i) => {
                  const w = WEAPONS[pw.index]
                  return (
                    <span key={i} className={`text-[9px] px-1 py-0.5 rounded ${i === playerWeaponSlot ? 'bg-accent/30 text-accent' : 'bg-secondary text-gray-500'}`}>
                      {i + 1}.{w?.name || '?'}
                    </span>
                  )
                })}
              </div>
            </div>

            {/* 金钱 */}
            <div className="glass-panel rounded-md px-2 py-1 flex items-center gap-1.5">
              <DollarSign size={12} className="text-yellow-400" />
              <span className="text-yellow-400 font-title text-sm">{money}</span>
            </div>
          </div>

          {/* 右：时间 + 比分 + 退出 */}
          <div className="flex flex-col gap-1.5 items-end">
            <div className="glass-panel rounded-md px-2 py-1 flex items-center gap-1.5">
              <Clock size={12} className="text-accent" />
              <span className="text-accent font-title text-base glow-text">{formatTime(gameTime)}</span>
            </div>
            <div className="glass-panel rounded-md px-2 py-1">
              <div className="flex items-center gap-2">
                <div className="text-center">
                  <p className="text-red-500 text-[9px]">红</p>
                  <p className="text-red-400 font-title text-sm leading-none">{currentRoom?.redKills ?? 0}</p>
                </div>
                <span className="text-gray-500 text-xs">:</span>
                <div className="text-center">
                  <p className="text-blue-500 text-[9px]">蓝</p>
                  <p className="text-blue-400 font-title text-sm leading-none">{currentRoom?.blueKills ?? 0}</p>
                </div>
              </div>
            </div>
            <button
              onClick={onExit}
              className="glass-panel rounded-md px-2 py-1 flex items-center gap-1 text-gray-400 hover:text-danger transition-colors"
            >
              <LogOut size={12} />
              <span className="text-[10px]">退出</span>
            </button>
            {onOpenBuyMenu && (
              <button
                onClick={onOpenBuyMenu}
                className="glass-panel rounded-md px-2 py-1 flex items-center gap-1 text-yellow-400 hover:text-yellow-300 transition-colors"
              >
                <ShoppingBag size={12} />
                <span className="text-[10px]">商店</span>
              </button>
            )}
          </div>
        </div>

        {/* 击杀提示（顶部居中下方） */}
        {killFeed.length > 0 && (
          <div className="absolute top-20 left-1/2 -translate-x-1/2 flex flex-col gap-1 items-center">
            {killFeed.map((kill, index) => (
              <div
                key={index}
                className="glass-panel rounded px-2 py-0.5 text-[11px] animate-pulse"
              >
                <span className="text-danger">{kill.killer}</span>
                <span className="text-gray-500 mx-1">›</span>
                <span className="text-gray-400">{kill.victim}</span>
              </div>
            ))}
          </div>
        )}

        {/* 队伍列表（顶部下方居中，紧凑横排） */}
        <div className="absolute top-32 left-1/2 -translate-x-1/2 flex gap-3 max-w-[90%]">
          <div className="flex flex-col gap-0.5">
            <p className="text-red-500 text-[9px] text-center font-title">红队</p>
            <div className="flex gap-1 flex-wrap justify-center">
              {currentRoom?.players.filter(p => p.team === 'red').map(player => (
                <div key={player.id} className="glass-panel rounded px-1.5 py-0.5 text-center">
                  <p className="text-white text-[10px] font-body truncate max-w-12">{player.name}</p>
                  <p className="text-red-400 font-title text-[10px] leading-none">
                    {player.kills}<span className="text-gray-500">/{player.deaths}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-0.5">
            <p className="text-blue-500 text-[9px] text-center font-title">蓝队</p>
            <div className="flex gap-1 flex-wrap justify-center">
              {currentRoom?.players.filter(p => p.team === 'blue').map(player => (
                <div key={player.id} className="glass-panel rounded px-1.5 py-0.5 text-center">
                  <p className="text-white text-[10px] font-body truncate max-w-12">{player.name}</p>
                  <p className="text-blue-400 font-title text-[10px] leading-none">
                    {player.kills}<span className="text-gray-500">/{player.deaths}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      <MiniMap />
      {soloDeathOverlay}
      {soloInvulnBanner}
      </div>
    )
  }

  // 桌面端：保持原有 HUD 布局
  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* 准星 - 开镜狙击时不显示 */}
      {!isScoping && (
        <div className="crosshair">
          <div className="absolute top-1/2 left-1/2 w-0.5 h-3 bg-accent -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute top-1/2 left-1/2 w-3 h-0.5 bg-accent -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-accent rounded-full -translate-x-1/2 -translate-y-1/2" />
        </div>
      )}

      {/* 狙击镜开镜效果 */}
      {isScoping && (
        <div className="absolute inset-0 flex items-center justify-center z-50" style={{ pointerEvents: 'none' }}>
          <div className="absolute inset-0" style={{
            background: `radial-gradient(circle at 50% 50%, transparent 30%, rgba(0,0,0,1) 32%)`,
            pointerEvents: 'none'
          }} />
          <div className="absolute w-full h-px bg-black/90" style={{ top: '50%' }} />
          <div className="absolute h-full w-px bg-black/90" style={{ left: '50%' }} />
          <div className="absolute w-1 h-1 bg-red-500 rounded-full" style={{
            top: 'calc(50% - 0.125rem)',
            left: 'calc(50% - 0.125rem)',
            boxShadow: '0 0 4px rgba(255, 0, 0, 0.8)'
          }} />
        </div>
      )}

      <div className="absolute top-4 left-4 flex flex-col gap-4 pointer-events-auto">
        <div className="glass-panel rounded-lg p-4 min-w-48">
          <div className="flex items-center gap-2 mb-2">
            <Heart className="text-danger" size={18} />
            <span className="text-white font-body">{health}</span>
          </div>
          <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-danger to-success transition-all duration-300"
              style={{ width: `${health}%` }}
            />
          </div>
        </div>

        <div className="glass-panel rounded-lg p-4">
          <p className="text-gray-400 text-sm mb-1">
            <span className="text-accent font-bold">{WEAPONS[currentWeaponIndex]?.name || '???'}</span>
            <span className="text-gray-600 ml-2">{WEAPONS[currentWeaponIndex]?.type === 'sniper' ? '狙击步枪' : WEAPONS[currentWeaponIndex]?.type === 'pistol' ? '手枪' : '突击步枪'}</span>
          </p>
          <p className="text-white font-title text-2xl">
            <span className={ammo <= 5 ? 'text-danger' : 'text-accent'}>{ammo}</span>
            <span className="text-gray-500">/{maxAmmo}</span>
          </p>
          {isReloading && (
            <p className="text-yellow-400 text-xs mt-1 animate-pulse">换弹中...</p>
          )}
          <div className="flex gap-1 mt-2">
            {playerWeapons.map((pw, i) => {
              const w = WEAPONS[pw.index]
              return (
                <span key={i} className={`text-xs px-1.5 py-0.5 rounded ${i === playerWeaponSlot ? 'bg-accent/30 text-accent' : 'bg-secondary text-gray-500'}`}>
                  [{i + 1}]{w?.name || '???'}
                </span>
              )
            })}
          </div>
        </div>

        <div className="glass-panel rounded-lg p-3">
          <p className="text-yellow-400 font-title text-lg">${money}</p>
          <p className="text-gray-500 text-xs">按 B 购买</p>
        </div>
      </div>

      <div className="absolute top-4 right-4 pointer-events-auto">
        <div className="glass-panel rounded-lg p-4 text-center">
          <p className="text-gray-400 text-sm">剩余时间</p>
          <p className="text-accent font-title text-3xl glow-text">{formatTime(gameTime)}</p>
        </div>
        <div className="glass-panel rounded-lg p-4 mt-2">
          <div className="flex items-center gap-4">
            <div className="text-center">
              <p className="text-red-500 text-sm">红队</p>
              <p className="text-red-400 font-title text-2xl">{currentRoom?.redKills ?? 0}</p>
            </div>
            <div className="text-gray-500 font-title">:</div>
            <div className="text-center">
              <p className="text-blue-500 text-sm">蓝队</p>
              <p className="text-blue-400 font-title text-2xl">{currentRoom?.blueKills ?? 0}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-4 left-4 glass-panel rounded-lg p-4 pointer-events-auto">
        <button
          onClick={onExit}
          className="flex items-center gap-2 text-gray-400 hover:text-danger transition-colors"
        >
          <LogOut size={16} />
          退出游戏
        </button>
      </div>

      {killFeed.length > 0 && (
        <div className="absolute top-1/2 right-4 -translate-y-1/2 flex flex-col gap-2">
          {killFeed.map((kill, index) => (
            <div
              key={index}
              className="glass-panel rounded px-3 py-1 text-sm animate-pulse"
            >
              <span className="text-danger">{kill.killer}</span>
              <span className="text-gray-500 mx-2">killed</span>
              <span className="text-gray-400">{kill.victim}</span>
            </div>
          ))}
        </div>
      )}

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-8">
        <div className="flex flex-col gap-2">
          <p className="text-red-500 text-xs text-center font-title">红队</p>
          <div className="flex gap-2">
            {currentRoom?.players.filter(p => p.team === 'red').map(player => (
              <div key={player.id} className="glass-panel rounded-lg px-3 py-2 text-center">
                <p className="text-white text-sm font-body truncate max-w-20">{player.name}</p>
                <p className="text-red-400 font-title text-sm">
                  {player.kills}
                  <span className="text-gray-500 text-xs">/{player.deaths}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-blue-500 text-xs text-center font-title">蓝队</p>
          <div className="flex gap-2">
            {currentRoom?.players.filter(p => p.team === 'blue').map(player => (
              <div key={player.id} className="glass-panel rounded-lg px-3 py-2 text-center">
                <p className="text-white text-sm font-body truncate max-w-20">{player.name}</p>
                <p className="text-blue-400 font-title text-sm">
                  {player.kills}
                  <span className="text-gray-500 text-xs">/{player.deaths}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    <MiniMap />
    {soloDeathOverlay}
    {soloInvulnBanner}
    </div>
  )
}
