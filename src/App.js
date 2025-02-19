import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';

import Navbar from './components/Navbar';
import Home from './components/Home';
import Babycare from './components/Babycare';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/babycare" element={<Babycare />} />
      </Routes>
    </Router>
  );
}

export default App;
