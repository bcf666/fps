import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useGameStore } from '../stores/gameStore'
import { network } from '../network/websocket'
import { Trophy, Skull, LogOut, Shield, Swords } from 'lucide-react'

export default function ResultPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { currentRoom, playerId, winner, redKills, blueKills } = useGameStore()
  const [nextRoundIn, setNextRoundIn] = useState(5)

  useEffect(() => {
    network.on('game_started', () => {
      navigate(`/game/${id}`)
    })

    const interval = setInterval(() => {
      setNextRoundIn(prev => Math.max(0, prev - 1))
    }, 1000)

    return () => {
      network.off('game_started', () => {})
      clearInterval(interval)
    }
  }, [id, navigate])

  const handleReturn = () => {
    network.leaveRoom()
    navigate('/lobby')
  }

  if (!currentRoom) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-primary">
        <div className="text-accent animate-pulse">加载中...</div>
      </div>
    )
  }

  const redSorted = [...currentRoom.players.filter(p => p.team === 'red')].sort((a, b) => b.kills - a.kills)
  const blueSorted = [...currentRoom.players.filter(p => p.team === 'blue')].sort((a, b) => b.kills - a.kills)

  const winnerText = winner === 'red' ? '红队获胜！' : winner === 'blue' ? '蓝队获胜！' : '平局！'
  const winnerColor = winner === 'red' ? 'text-red-400' : winner === 'blue' ? 'text-blue-400' : 'text-gray-400'

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center bg-primary overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary via-secondary to-primary" />
      
      <div className="absolute inset-0 opacity-10">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #00f0ff 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      <div className="relative z-10 text-center mb-8">
        <h1 className="font-title text-5xl text-accent glow-text mb-2">游戏结束</h1>
        <p className={`font-title text-3xl mt-4 ${winnerColor} glow-text`}>
          {winner === 'red' && <Shield className="inline mr-2 mb-1" size={32} />}
          {winner === 'blue' && <Swords className="inline mr-2 mb-1" size={32} />}
          {winnerText}
        </p>
        <div className="flex items-center justify-center gap-8 mt-4">
          <div className="text-center">
            <p className="text-red-500 text-sm">红队击杀</p>
            <p className="text-red-400 font-title text-3xl">{redKills}</p>
          </div>
          <div className="text-gray-500 font-title text-2xl">:</div>
          <div className="text-center">
            <p className="text-blue-500 text-sm">蓝队击杀</p>
            <p className="text-blue-400 font-title text-3xl">{blueKills}</p>
          </div>
        </div>
      </div>

      <div className="relative z-10 grid grid-cols-2 gap-6 w-full max-w-4xl mb-8 px-6">
        <div className="glass-panel rounded-lg p-6 border border-red-500/30">
          <div className="flex items-center gap-2 mb-4">
            <Shield className="text-red-500" size={20} />
            <h2 className="font-title text-lg text-red-400">红队</h2>
          </div>
          <div className="space-y-2">
            {redSorted.map((player, index) => (
              <div
                key={player.id}
                className={`flex items-center justify-between p-3 rounded ${
                  player.id === playerId 
                    ? 'bg-red-500/10 border border-red-500/30' 
                    : 'bg-red-950/30'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`font-title text-lg w-6 ${
                    index === 0 ? 'text-yellow-400' : index === 1 ? 'text-gray-300' : index === 2 ? 'text-amber-600' : 'text-gray-500'
                  }`}>
                    #{index + 1}
                  </span>
                  <div>
                    <p className="text-white font-body text-sm">
                      {player.name}
                      {player.id === playerId && (
                        <span className="ml-1 text-xs text-accent">(你)</span>
                      )}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="flex items-center gap-1">
                    <Trophy size={12} className="text-success" />
                    <span className="text-success">{player.kills}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Skull size={12} className="text-danger" />
                    <span className="text-danger">{player.deaths}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-panel rounded-lg p-6 border border-blue-500/30">
          <div className="flex items-center gap-2 mb-4">
            <Swords className="text-blue-500" size={20} />
            <h2 className="font-title text-lg text-blue-400">蓝队</h2>
          </div>
          <div className="space-y-2">
            {blueSorted.map((player, index) => (
              <div
                key={player.id}
                className={`flex items-center justify-between p-3 rounded ${
                  player.id === playerId 
                    ? 'bg-blue-500/10 border border-blue-500/30' 
                    : 'bg-blue-950/30'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`font-title text-lg w-6 ${
                    index === 0 ? 'text-yellow-400' : index === 1 ? 'text-gray-300' : index === 2 ? 'text-amber-600' : 'text-gray-500'
                  }`}>
                    #{index + 1}
                  </span>
                  <div>
                    <p className="text-white font-body text-sm">
                      {player.name}
                      {player.id === playerId && (
                        <span className="ml-1 text-xs text-accent">(你)</span>
                      )}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="flex items-center gap-1">
                    <Trophy size={12} className="text-success" />
                    <span className="text-success">{player.kills}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Skull size={12} className="text-danger" />
                    <span className="text-danger">{player.deaths}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="relative z-10 flex flex-col items-center gap-4">
        <div className="glass-panel rounded-lg px-8 py-4 text-center">
          <p className="text-gray-400 text-sm mb-1">下一局开始</p>
          <p className="font-title text-4xl text-accent">{nextRoundIn}</p>
        </div>

        <button
          onClick={handleReturn}
          className="flex items-center gap-2 text-gray-400 hover:text-danger transition-colors"
        >
          <LogOut size={16} />
          离开房间
        </button>
      </div>

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>
    </div>
  )
}
