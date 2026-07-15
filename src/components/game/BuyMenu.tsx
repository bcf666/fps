import { useGameStore } from '../../stores/gameStore'
import { WEAPONS } from '../../config/weapons'
import { network } from '../../network/websocket'

export default function BuyMenu({ onClose }: { onClose: () => void }) {
  const { money, playerWeapons } = useGameStore()

  const ownedIndices = new Set(playerWeapons.map(w => w.index))

  const categories = [
    { label: '突击步枪', weapons: WEAPONS.filter(w => w.buyCategory === 'assault') },
    { label: '狙击步枪', weapons: WEAPONS.filter(w => w.buyCategory === 'sniper') },
    { label: '手枪', weapons: WEAPONS.filter(w => w.buyCategory === 'pistol') },
  ]

  return (
    <div
      className="absolute inset-0 z-50 flex items-center justify-center bg-black/70 pointer-events-auto p-2"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="glass-panel rounded-xl p-4 sm:p-6 w-full max-w-[480px] max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-title text-xl sm:text-2xl text-accent glow-text">购买武器</h2>
          <div className="text-right">
            <p className="text-gray-400 text-xs sm:text-sm">当前金钱</p>
            <p className="text-yellow-400 font-title text-lg sm:text-xl">${money}</p>
          </div>
        </div>

        {categories.map(cat => (
          <div key={cat.label} className="mb-4">
            <h3 className="text-gray-400 text-xs sm:text-sm font-title mb-2 border-b border-accent/20 pb-1">{cat.label}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {cat.weapons.map(weapon => {
                const owned = ownedIndices.has(WEAPONS.indexOf(weapon))
                const canAfford = money >= weapon.cost
                return (
                  <button
                    key={weapon.id}
                    disabled={!canAfford}
                    onClick={() => {
                      network.buyWeapon(WEAPONS.indexOf(weapon))
                      onClose()
                    }}
                    className={`text-left p-2 sm:p-3 rounded-lg border transition-all ${
                      owned
                        ? 'bg-accent/20 border-accent/50 text-accent cursor-default'
                        : canAfford
                          ? 'bg-secondary hover:bg-accent/20 border-accent/20 hover:border-accent/50 text-white'
                          : 'bg-secondary/50 border-gray-800 text-gray-600 cursor-not-allowed'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-title text-sm">{weapon.name}</span>
                      {owned && <span className="text-xs text-accent">已拥有</span>}
                      {!owned && <span className="text-xs text-yellow-400">${weapon.cost}</span>}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      伤害:{weapon.damage} 弹匣:{weapon.magSize}
                      {weapon.hasScope ? ' 带镜' : ''}
                    </p>
                    <p className="text-xs text-gray-600">{weapon.description.replace('\n', ' · ')}</p>
                  </button>
                )
              })}
            </div>
          </div>
        ))}

        <div className="text-center mt-4 pt-3 border-t border-accent/20">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded bg-accent/20 text-accent text-sm hover:bg-accent/30 transition-colors"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  )
}
