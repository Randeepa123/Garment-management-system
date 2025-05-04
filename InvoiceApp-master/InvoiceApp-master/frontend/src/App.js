import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Dashboard } from "./pages/Dashboard";
import Login from "./pages/Login";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/*" element={<Dashboard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
