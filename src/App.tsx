import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useGameStore } from './stores/gameStore'
import MenuPage from './pages/MenuPage'
import LobbyPage from './pages/LobbyPage'
import RoomPage from './pages/RoomPage'
import GamePage from './pages/GamePage'
import ResultPage from './pages/ResultPage'
import SoloPage from './pages/SoloPage'

function App() {
  const { playerName } = useGameStore()

  return (
    <BrowserRouter>
      <div className="w-full h-full bg-primary">
        <Routes>
          <Route path="/" element={<MenuPage />} />
          <Route path="/lobby" element={playerName ? <LobbyPage /> : <Navigate to="/" />} />
          <Route path="/room/:id" element={playerName ? <RoomPage /> : <Navigate to="/" />} />
          <Route path="/game/:id" element={playerName ? <GamePage /> : <Navigate to="/" />} />
          <Route path="/result/:id" element={playerName ? <ResultPage /> : <Navigate to="/" />} />
          <Route path="/solo" element={<SoloPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
