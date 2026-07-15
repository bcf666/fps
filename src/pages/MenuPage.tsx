import { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGameStore } from '../stores/gameStore'
import { network } from '../network/websocket'

export default function MenuPage() {
  const navigate = useNavigate()
  const { setPlayerName, isConnected } = useGameStore()
  const [nameInput, setNameInput] = useState('')
  const [showSettings, setShowSettings] = useState(false)
  const [volume, setVolume] = useState(0.5)

  useEffect(() => {
    network.connect()
  }, [])

  const handleStart = () => {
    if (nameInput.trim()) {
      setPlayerName(nameInput.trim())
      navigate('/lobby')
    }
  }

  const handleSolo = () => {
    if (nameInput.trim()) setPlayerName(nameInput.trim())
    navigate('/solo')
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleStart()
  }

  // 生成浮动粒子
  const particles = useMemo(() =>
    Array.from({ length: 15 }, () => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 6,
      size: 2 + Math.random() * 4,
    })), []
  )

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden">
      {/* 渐变背景 */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary via-secondary to-primary" />

      {/* 网格背景 */}
      <div className="absolute inset-0 grid-bg opacity-30" />

      {/* 扫描线 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="scan-line absolute left-0 right-0 h-32 bg-gradient-to-b from-transparent via-accent/5 to-transparent" />
      </div>

      {/* 浮动粒子 */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((p, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-accent/40 float-particle"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </div>

      {/* 背景光晕 */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/8 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl" />
      </div>

      {/* 连接状态 */}
      <div className="absolute top-4 right-4 flex items-center gap-2 z-20">
        <div className={`w-2.5 h-2.5 rounded-full ${isConnected ? 'bg-success status-online' : 'bg-danger'}`} />
        <span className="text-sm text-gray-400">{isConnected ? '已连接' : '未连接'}</span>
      </div>

      {/* 顶部装饰线 */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
      {/* 底部装饰线 */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />

      {/* 主内容 */}
      <div className="relative z-10 text-center fade-in-up">
        {/* 装饰角标 */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="h-px w-12 bg-accent/40" />
          <span className="text-accent/60 text-xs tracking-[0.4em] font-body">TACTICAL OPS</span>
          <div className="h-px w-12 bg-accent/40" />
        </div>

        {/* 标题 */}
        <h1 className="font-title text-6xl md:text-8xl font-black gradient-title mb-2">
          RAPID FIRE
        </h1>
        <p className="font-body text-lg text-gray-500 mb-10 tracking-[0.3em]">
          FAST-PACED MULTIPLAYER FPS
        </p>

        {/* 输入区 */}
        <div className="glass-panel rounded-lg p-6 w-80 mx-auto mb-6 relative corner-decoration">
          <div className="text-left text-xs text-accent/60 mb-2 tracking-wider">PLAYER NAME</div>
          <input
            type="text"
            placeholder="输入你的名字"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            onKeyPress={handleKeyPress}
            maxLength={12}
            className="w-full px-4 py-3 bg-primary/50 border border-accent/30 rounded text-white font-body text-lg
                       focus:outline-none focus:border-accent focus:shadow-[0_0_15px_rgba(0,240,255,0.2)]
                       placeholder:text-gray-600 transition-all"
          />
        </div>

        {/* 按钮 */}
        <div className="flex flex-col gap-3 items-center">
          <button
            onClick={handleStart}
            disabled={!nameInput.trim() || !isConnected}
            className="btn-neon text-xl px-12 py-4 w-80 relative group"
          >
            <span className="relative z-10">开始游戏</span>
          </button>

          <button
            onClick={handleSolo}
            className="btn-solo text-xl px-12 py-4 w-80 relative group"
          >
            <span className="relative z-10">单人训练</span>
          </button>

          <button
            onClick={() => setShowSettings(true)}
            className="px-8 py-2 text-gray-400 hover:text-accent transition-colors text-sm tracking-wider"
          >
            设置
          </button>
        </div>
      </div>

      {/* 底部操作提示 */}
      <div className="absolute bottom-8 text-center z-10">
        <div className="glass-panel rounded px-6 py-3 inline-flex gap-6 text-xs text-gray-500">
          <span><span className="text-accent/70">WASD</span> 移动</span>
          <span><span className="text-accent/70">鼠标</span> 瞄准</span>
          <span><span className="text-accent/70">左键</span> 射击</span>
          <span><span className="text-accent/70">R</span> 换弹</span>
          <span><span className="text-accent/70">B</span> 商店</span>
        </div>
      </div>

      {/* 设置弹窗 */}
      {showSettings && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 fade-in-up">
          <div className="glass-panel rounded-lg p-8 w-96 relative corner-decoration">
            <h2 className="font-title text-2xl text-accent mb-6">设置</h2>

            <div className="mb-6">
              <label className="block text-gray-400 mb-2 text-sm tracking-wider">音量</label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-full accent-accent"
              />
            </div>

            <button
              onClick={() => setShowSettings(false)}
              className="btn-neon w-full"
            >
              关闭
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
