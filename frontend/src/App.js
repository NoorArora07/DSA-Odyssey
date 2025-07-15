import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import LevelPage from './pages/LevelPage';
import Leaderboard from './pages/Leaderboard';
import StreakPage from './pages/StreakPage';
import Discuss from './pages/Discuss';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/level/:levelId" element={<LevelPage />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/streak" element={<StreakPage />} />
        <Route path="/discuss" element={<Discuss />} />
      </Routes>
    </Router>
  );
}

export default App;
