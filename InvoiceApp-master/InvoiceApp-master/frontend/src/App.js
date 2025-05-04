import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Dashboard } from "./pages/Dashboard";
import Login from "./pages/Login";

function App() {
  return (
    <div className="App">
          <Dashboard />
    </div>
  );
}

export default App;
