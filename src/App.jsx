import "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import GameSelector from "./Interfaces/GameSelector.jsx"; 
import CardSelection from "./Interfaces/CardSelection.jsx"; 
import CardEngineer from "./Interfaces/Cardengineer.jsx";
import CustomGame from "./Interfaces/CustomGame.jsx"; // استيراد صفحة لعبة البطاقات المخصصة
import PuzzleSelection from "./Interfaces/PuzzleSelection.jsx";
import PuzzlP1 from "./Interfaces/Puzzl1.jsx";
import Puzzl2 from "./Interfaces/puzzl2.jsx";
import PuzzlP3 from "./Interfaces/puzzl3.jsx";
import CustomPuzzleGame from "./Interfaces/CustomPuzzleGame.jsx"; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GameSelector />} />
        <Route path="/matching" element={<CardSelection />} />
        <Route path="/card-engineer" element={<CardEngineer />} />
        <Route path="/matching-custom" element={<CustomGame />} /> {/* مسار لعبة البطاقات المخصصة */}
        <Route path="/puzzle" element={<PuzzleSelection />} />
        <Route path="/puzzle-game/p1" element={<PuzzlP1 />} />
        <Route path="/puzzle-game/p2" element={<Puzzl2 />} />
        <Route path="/puzzle-game/p3" element={<PuzzlP3 />} />
        <Route path="/puzzle-game/custom" element={<CustomPuzzleGame />} /> 
      </Routes>
    </Router>
  );
}

export default App;