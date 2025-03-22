import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "./componants/mainpage";
import AddStock from "./componants/AddStock";
import UseMaterial from "./componants/UseMaterial";
import PurchaseHistory from "./componants/PurchaseHistory";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/add-stock" element={<AddStock />} />
        <Route path="/use-material" element={<UseMaterial />} />
        <Route path="/purchase-history" element={<PurchaseHistory />} />
      </Routes>
    </Router>
  );
}

export default App;
