import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGameStore } from '../stores/gameStore'
import { setupSolo } from '../game/solo/soloCombat'

const MAP_OPTIONS = [
  { id: 'classic', label: '经典沙漠', desc: '开阔荒漠小镇 · 中近距离交火' },
  { id: 'dust', label: '草地双楼', desc: '双楼巷战 · 掩体多' },
  { id: 'campus', label: '校园', desc: '大型校园 · 建筑密集' },
] as const

const COUNT_OPTIONS = [3, 4, 5, 6, 7, 8]

// 单人训练配置页：纯前端、无网络。可选地图与敌人数量，进入即开战。
export default function SoloPage() {
  const navigate = useNavigate()
  const { playerName, setPlayerName } = useGameStore()
  const [mapId, setMapId] = useState<string>('classic')
  const [count, setCount] = useState<number>(5)
  const [name, setName] = useState<string>(playerName || '')

  useEffect(() => {
    if (playerName) setName(playerName)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const start = () => {
    const nm = name.trim() || '训练兵'
    setPlayerName(nm)
    setupSolo(mapId, count, nm)
    navigate('/game/solo_room')
  }

  return (
    <div className="relative w-full h-full flex items-center justify-center bg-primary overflow-auto py-10">
      <div className="glass-panel rounded-lg p-8 w-[640px] max-w-[92vw]">
        <h1 className="font-title text-3xl text-accent mb-1">单人训练配置</h1>
        <p className="text-gray-500 text-sm mb-6">纯前端 · 无网络 · 随机刷新 AI 敌人（像真人一样走位 / 交火 / 重生）</p>

        <div className="text-accent/60 text-xs tracking-wider mb-2">选择地图</div>
        <div className="grid grid-cols-3 gap-3 mb-6">
          {MAP_OPTIONS.map((m) => (
            <button
              key={m.id}
              onClick={() => setMapId(m.id)}
              className={`rounded-lg p-4 border text-left transition-all ${
                mapId === m.id
                  ? 'border-accent bg-accent/10 shadow-[0_0_15px_rgba(0,240,255,0.2)]'
                  : 'border-accent/20 hover:border-accent/50'
              }`}
            >
              <div className="font-title text-lg text-white">{m.label}</div>
              <div className="text-gray-500 text-xs mt-1 leading-snug">{m.desc}</div>
            </button>
          ))}
        </div>

        <div className="text-accent/60 text-xs tracking-wider mb-2">敌人数量</div>
        <div className="flex flex-wrap gap-2 mb-6">
          {COUNT_OPTIONS.map((c) => (
            <button
              key={c}
              onClick={() => setCount(c)}
              className={`px-4 py-2 rounded border transition-all ${
                count === c ? 'border-accent bg-accent/10 text-accent' : 'border-accent/20 text-gray-400 hover:border-accent/50'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="text-accent/60 text-xs tracking-wider mb-2">玩家名称</div>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={12}
          placeholder="输入你的名字"
          className="w-full px-4 py-2 bg-primary/50 border border-accent/30 rounded text-white mb-6
                     focus:outline-none focus:border-accent placeholder:text-gray-600 transition-all"
        />

        <div className="flex gap-3">
          <button onClick={start} className="btn-neon flex-1 py-3 text-lg">
            开始训练
          </button>
          <button onClick={() => navigate('/')} className="px-6 py-3 rounded border border-gray-600 text-gray-400 hover:text-white transition-colors">
            返回
          </button>
        </div>
      </div>
    </div>
  )
}
