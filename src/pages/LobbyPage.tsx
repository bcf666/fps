import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGameStore, Room } from '../stores/gameStore'
import { network } from '../network/websocket'
import { MAPS } from '../config/mapConfig'
import { Users, Plus, RefreshCw, LogOut, Gamepad2, Map as MapIcon } from 'lucide-react'

export default function LobbyPage() {
  const navigate = useNavigate()
  const { playerName, rooms, setRooms } = useGameStore()
  const [showCreate, setShowCreate] = useState(false)
  const [roomName, setRoomName] = useState('')
  const [selectedMap, setSelectedMap] = useState('classic')
  const [isCreating, setIsCreating] = useState(false)

  useEffect(() => {
    network.on('rooms_list', (data) => {
      setRooms(data as Room[])
    })

    network.send('get_rooms')

    const interval = setInterval(() => {
      network.send('get_rooms')
    }, 3000)

    return () => clearInterval(interval)
  }, [setRooms])

  const handleCreateRoom = () => {
    if (roomName.trim()) {
      setIsCreating(true)
      network.on('room_created', (data: unknown) => {
        const result = data as { roomId: string; playerId: string; room: Room }
        setIsCreating(false)
        setShowCreate(false)
        setRoomName('')
        setSelectedMap('classic')
        navigate(`/room/${result.roomId}`)
      })
      network.createRoom(roomName.trim(), playerName, selectedMap)
    }
  }

  const handleJoinRoom = (roomId: string) => {
    network.on('room_joined', (data: unknown) => {
      const result = data as { roomId: string; playerId: string; room: Room }
      if (result.room.status === 'playing') {
        navigate(`/game/${result.roomId}`)
      } else {
        navigate(`/room/${result.roomId}`)
      }
    })
    network.joinRoom(roomId, playerName)
  }

  const handleRefresh = () => {
    network.send('get_rooms')
  }

  return (
    <div className="relative w-full h-full flex flex-col bg-primary overflow-hidden">
      {/* 网格背景 */}
      <div className="absolute inset-0 grid-bg opacity-20" />
      {/* 背景光晕 */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-1/3 w-72 h-72 bg-accent/5 rounded-full blur-3xl" />
      </div>

      {/* 头部 */}
      <header className="glass-panel border-b border-accent/20 px-6 py-3 relative z-10">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-accent/20 flex items-center justify-center border border-accent/30">
              <Gamepad2 className="text-accent" size={18} />
            </div>
            <h1 className="font-title text-2xl gradient-title">RAPID FIRE</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="glass-panel rounded px-3 py-1.5 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-success status-online" />
              <span className="text-sm text-gray-400">{playerName}</span>
            </div>
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-1.5 text-gray-400 hover:text-danger transition-colors text-sm"
            >
              <LogOut size={16} />
              退出
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-auto p-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* 标题栏 */}
          <div className="flex items-center justify-between mb-6 fade-in-up">
            <div className="flex items-center gap-3">
              <div className="h-6 w-1 bg-accent rounded-full" />
              <h2 className="font-title text-xl text-white">游戏大厅</h2>
              <span className="text-xs text-gray-500 glass-panel rounded px-2 py-0.5">{rooms.length} 个房间</span>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleRefresh}
                className="flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-accent transition-colors glass-panel rounded"
              >
                <RefreshCw size={14} />
                <span className="text-sm">刷新</span>
              </button>
              <button
                onClick={() => setShowCreate(true)}
                className="flex items-center gap-2 btn-neon"
              >
                <Plus size={16} />
                创建房间
              </button>
            </div>
          </div>

          {rooms.length === 0 ? (
            <div className="glass-panel rounded-lg p-16 text-center fade-in-up relative corner-decoration">
              <Users size={56} className="mx-auto text-gray-700 mb-4" />
              <p className="text-gray-400 text-lg">当前没有可用的房间</p>
              <p className="text-gray-600 text-sm mt-2">创建一个新房间开始游戏吧</p>
              <button
                onClick={() => setShowCreate(true)}
                className="btn-neon mt-6 mx-auto flex items-center gap-2"
              >
                <Plus size={16} />
                创建房间
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {rooms.map((room, i) => (
                <div
                  key={room.id}
                  className="glass-panel rounded-lg p-5 cursor-pointer card-hover border border-accent/10 fade-in-up relative overflow-hidden"
                  style={{ animationDelay: `${i * 0.05}s` }}
                  onClick={() => handleJoinRoom(room.id)}
                >
                  {/* 顶部装饰条 */}
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-accent/40 to-transparent" />

                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <h3 className="font-title text-lg text-white">{room.name}</h3>
                      {room.status === 'playing' && (
                        <span className="text-xs px-1.5 py-0.5 rounded bg-danger/20 text-danger animate-pulse">LIVE</span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex items-center gap-1.5 text-sm text-gray-400">
                      <Users size={14} className="text-accent/60" />
                      <span>{room.players.length}/{room.maxPlayers}</span>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded ${
                      room.status === 'waiting'
                        ? 'bg-success/15 text-success'
                        : 'bg-danger/15 text-danger'
                    }`}>
                      {room.status === 'waiting' ? '等待中' : '游戏中'}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded bg-accent/10 text-accent/80 flex items-center gap-1">
                      <MapIcon size={11} />
                      {MAPS[room.mapId]?.name || '经典沙漠'}
                    </span>
                    <span className="text-xs text-gray-600">#{room.id.slice(-4)}</span>
                  </div>

                  {/* 玩家标签 */}
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {room.players.map((player) => (
                      <span
                        key={player.id}
                        className="text-xs px-2 py-1 rounded bg-secondary/60 text-gray-300"
                      >
                        {player.name}
                        {player.id === room.hostId && <span className="text-yellow-400 ml-1">★</span>}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* 创建房间弹窗 */}
      {showCreate && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 fade-in-up">
          <div className="glass-panel rounded-lg p-8 w-96 relative corner-decoration">
            <h2 className="font-title text-2xl text-accent mb-6">创建房间</h2>

            <div className="text-left text-xs text-accent/60 mb-2 tracking-wider">ROOM NAME</div>
            <input
              type="text"
              placeholder="房间名称"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleCreateRoom()}
              maxLength={20}
              className="w-full px-4 py-3 bg-primary/50 border border-accent/30 rounded text-white
                         focus:outline-none focus:border-accent focus:shadow-[0_0_15px_rgba(0,240,255,0.2)]
                         placeholder:text-gray-600 transition-all mb-6"
            />

            <div className="text-left text-xs text-accent/60 mb-2 tracking-wider">MAP</div>
            <div className="grid grid-cols-1 gap-2 mb-6">
              {Object.values(MAPS).map((map) => (
                <button
                  key={map.id}
                  onClick={() => setSelectedMap(map.id)}
                  className={`flex items-start gap-3 px-4 py-3 rounded text-left transition-all border ${
                    selectedMap === map.id
                      ? 'bg-accent/15 border-accent shadow-[0_0_15px_rgba(0,240,255,0.2)]'
                      : 'bg-primary/50 border-accent/20 hover:border-accent/50'
                  }`}
                >
                  <MapIcon size={18} className={selectedMap === map.id ? 'text-accent' : 'text-gray-500'} />
                  <div className="flex-1">
                    <div className={`text-sm font-semibold ${selectedMap === map.id ? 'text-accent' : 'text-gray-300'}`}>
                      {map.name}
                    </div>
                    <div className="text-xs text-gray-500 mt-0.5">{map.description}</div>
                  </div>
                </button>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleCreateRoom}
                disabled={!roomName.trim() || isCreating}
                className="flex-1 btn-neon"
              >
                {isCreating ? '创建中...' : '创建'}
              </button>
              <button
                onClick={() => {
                  setShowCreate(false)
                  setRoomName('')
                  setSelectedMap('classic')
                }}
                className="px-6 py-3 text-gray-400 hover:text-white transition-colors"
              >
                取消
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
