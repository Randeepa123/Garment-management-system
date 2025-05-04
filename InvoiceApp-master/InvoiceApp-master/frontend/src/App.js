import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
import Login from "./componants/login";
import Signup from "./componants/signup";

function App() {
  return (
    <div className="App">
     < Login />
     < Signup />
      < Dashboard />
    </div>
  );
}

export default App;
