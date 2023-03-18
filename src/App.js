import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Coins from "./Pages/Coins";

function App() {
  return (
    <div className="bg-darkerBgColor min-h-screen text-white">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/coins/:id" element={<Coins />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
