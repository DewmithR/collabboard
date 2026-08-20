import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Board from "./components/Board";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Board />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;