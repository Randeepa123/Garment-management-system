import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ViewIncomes from './components/ViewIncomes';
import AddIncome from './components/AddIncome';
import IncomeDetails from './components/IncomeDetails';
import UpdateIncome from './components/UpdateIncome';
import ViewExpense from './components/ViewExpense';
import AddExpense from './components/AddExpense';
import UpdateExpense from './components/UpdateExpense';
import Analytics from './components/Analytics';
import Taxation from './components/Taxation';
import React from "react";
import Profit from './components/Profit';

function App() {
  return(
    <Router>
      <Routes>
        <Route path="/" element={<ViewIncomes/>}/>
        <Route path="/viewrefund" element={<ViewIncomes/>}/>
        <Route path="/addrefunds" element={<AddIncome/>}/>
        <Route path="/viewrefunds/:id" element={<IncomeDetails/>}/>
        <Route path="/updaterefunds/:id" element={<UpdateIncome/>}/>
        <Route path="/viewbudget" element={<ViewExpense/>}/>
        <Route path="/addexpense" element={<AddExpense/>}/>
        <Route path="/viewbudget/updatebudget/:id" element={<UpdateExpense/>}/>
        <Route path="/analytics" element={<Analytics/>}/>
        <Route path="/taxation" element={<Taxation/>}/>
        <Route path="/profit" element={<Profit/>}/>
      </Routes>
    </Router>
  )
}

export default App;
