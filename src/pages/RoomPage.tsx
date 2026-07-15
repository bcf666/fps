import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useGameStore } from '../stores/gameStore'
import { network } from '../network/websocket'
import { MAPS } from '../config/mapConfig'
import { LogOut, Play, Shield, Swords, Users, Crown, Map as MapIcon } from 'lucide-react'

export default function RoomPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { currentRoom, playerId, playerName } = useGameStore()

  useEffect(() => {
    if (currentRoom && currentRoom.id === id && currentRoom.players && Array.isArray(currentRoom.players) && currentRoom.players.length > 0) {
      return
    }

    network.joinRoom(id!, playerName)

    network.on('game_started', () => {
      navigate(`/game/${id}`)
    })

    return () => {
      network.off('game_started', () => {})
    }
  }, [id, currentRoom, navigate, playerName])

  useEffect(() => {
    if (currentRoom && currentRoom.status === 'playing') {
      navigate(`/game/${id}`)
    }
  }, [currentRoom, id, navigate])

  const handleLeave = () => {
    network.leaveRoom()
    navigate('/lobby')
  }

  const handleStart = () => {
    network.startGame()
  }

  const handleSwitchTeam = (team: 'red' | 'blue') => {
    network.switchTeam(team)
  }

  if (!currentRoom) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-primary">
        <div className="text-accent animate-pulse flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
          <span className="text-sm">连接房间中...</span>
        </div>
      </div>
    )
  }

  if (currentRoom.status === 'playing') {
    return null
  }

  const players = currentRoom.players || []
  const hostId = currentRoom.hostId || (currentRoom as any).ownerId
  const isHost = playerId === hostId
  const me = players.find(p => p.id === playerId)
  const myTeam = me?.team || 'red'
  const redPlayers = players.filter(p => p.team === 'red')
  const bluePlayers = players.filter(p => p.team === 'blue')

  return (
    <div className="relative w-full h-full flex flex-col bg-primary overflow-hidden">
      {/* 网格背景 */}
      <div className="absolute inset-0 grid-bg opacity-20" />
      {/* 背景光晕 */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-10 w-72 h-72 bg-red-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/4 right-10 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      {/* 头部 */}
      <header className="glass-panel border-b border-accent/20 px-6 py-3 relative z-10">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-1 bg-accent rounded-full" />
            <div>
              <h1 className="font-title text-xl text-white">{currentRoom.name}</h1>
              <div className="flex items-center gap-2">
                <p className="text-xs text-gray-500">ROOM #{currentRoom.id.slice(-6)}</p>
                <span className="text-xs px-2 py-0.5 rounded bg-accent/10 text-accent/80 flex items-center gap-1">
                  <MapIcon size={11} />
                  {MAPS[currentRoom.mapId]?.name || '经典沙漠'}
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={handleLeave}
            className="flex items-center gap-1.5 text-gray-400 hover:text-danger transition-colors text-sm glass-panel rounded px-3 py-1.5"
          >
            <LogOut size={16} />
            离开房间
          </button>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-6 relative z-10">
        <div className="w-full max-w-4xl fade-in-up">
          {/* 标题 */}
          <div className="flex items-center gap-3 mb-6">
            <Users className="text-accent" size={20} />
            <h2 className="font-title text-lg text-white">队伍选择</h2>
            <span className="text-xs text-gray-500 glass-panel rounded px-2 py-0.5">
              {players.length}/{currentRoom.maxPlayers || 8} 人
            </span>
          </div>

          {/* 队伍面板 */}
          <div className="grid grid-cols-2 gap-6 mb-8">
            {/* 红队 */}
            <div className="rounded-lg p-6 bg-red-950/30 border-2 border-red-500/20 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded bg-red-500/20 flex items-center justify-center border border-red-500/30">
                  <Shield className="text-red-400" size={18} />
                </div>
                <h3 className="font-title text-lg text-red-400">红队</h3>
                <span className="text-red-500/50 text-sm">({redPlayers.length}人)</span>
              </div>

              <div className="space-y-2 min-h-32">
                {redPlayers.map((player) => (
                  <div
                    key={player.id}
                    className={`flex items-center justify-between p-2.5 rounded transition-all ${
                      player.id === playerId
                        ? 'bg-red-500/15 border border-red-500/40'
                        : 'bg-red-950/20'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${player.id === playerId ? 'bg-red-400' : 'bg-red-500/40'}`} />
                      <span className="text-white text-sm font-body">{player.name}</span>
                      {player.id === hostId && (
                        <Crown size={14} className="text-yellow-400" />
                      )}
                      {player.id === playerId && (
                        <span className="text-xs text-gray-500">(你)</span>
                      )}
                    </div>
                  </div>
                ))}
                {redPlayers.length === 0 && (
                  <div className="text-center py-8">
                    <Shield size={32} className="mx-auto text-red-500/20 mb-2" />
                    <p className="text-red-500/30 text-sm">暂无玩家</p>
                  </div>
                )}
              </div>

              <button
                onClick={() => handleSwitchTeam('red')}
                disabled={myTeam === 'red'}
                className={`w-full mt-4 py-2.5 rounded font-body text-sm transition-all ${
                  myTeam === 'red'
                    ? 'bg-red-500/30 text-red-300 cursor-default border border-red-500/30'
                    : 'bg-red-900/30 text-red-400 hover:bg-red-800/40 border border-red-500/20 hover:border-red-500/40'
                }`}
              >
                {myTeam === 'red' ? '当前队伍' : '加入红队'}
              </button>
            </div>

            {/* 蓝队 */}
            <div className="rounded-lg p-6 bg-blue-950/30 border-2 border-blue-500/20 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded bg-blue-500/20 flex items-center justify-center border border-blue-500/30">
                  <Swords className="text-blue-400" size={18} />
                </div>
                <h3 className="font-title text-lg text-blue-400">蓝队</h3>
                <span className="text-blue-500/50 text-sm">({bluePlayers.length}人)</span>
              </div>

              <div className="space-y-2 min-h-32">
                {bluePlayers.map((player) => (
                  <div
                    key={player.id}
                    className={`flex items-center justify-between p-2.5 rounded transition-all ${
                      player.id === playerId
                        ? 'bg-blue-500/15 border border-blue-500/40'
                        : 'bg-blue-950/20'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${player.id === playerId ? 'bg-blue-400' : 'bg-blue-500/40'}`} />
                      <span className="text-white text-sm font-body">{player.name}</span>
                      {player.id === hostId && (
                        <Crown size={14} className="text-yellow-400" />
                      )}
                      {player.id === playerId && (
                        <span className="text-xs text-gray-500">(你)</span>
                      )}
                    </div>
                  </div>
                ))}
                {bluePlayers.length === 0 && (
                  <div className="text-center py-8">
                    <Swords size={32} className="mx-auto text-blue-500/20 mb-2" />
                    <p className="text-blue-500/30 text-sm">暂无玩家</p>
                  </div>
                )}
              </div>

              <button
                onClick={() => handleSwitchTeam('blue')}
                disabled={myTeam === 'blue'}
                className={`w-full mt-4 py-2.5 rounded font-body text-sm transition-all ${
                  myTeam === 'blue'
                    ? 'bg-blue-500/30 text-blue-300 cursor-default border border-blue-500/30'
                    : 'bg-blue-900/30 text-blue-400 hover:bg-blue-800/40 border border-blue-500/20 hover:border-blue-500/40'
                }`}
              >
                {myTeam === 'blue' ? '当前队伍' : '加入蓝队'}
              </button>
            </div>
          </div>

          {/* 开始按钮 */}
          <div className="mt-8 text-center">
            {isHost ? (
              <div className="flex flex-col items-center gap-3">
                <button
                  onClick={handleStart}
                  disabled={players.length < 2}
                  className="btn-neon px-12 py-4 text-lg flex items-center gap-2 mx-auto"
                >
                  <Play size={20} />
                  开始游戏
                </button>
                {players.length < 2 && (
                  <p className="text-gray-500 text-sm">至少需要 2 名玩家才能开始</p>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2 text-gray-400 justify-center">
                <div className="w-4 h-4 border-2 border-accent/20 border-t-accent rounded-full animate-spin" />
                <span>等待房主开始游戏...</span>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
