import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo.png';
import { FaTachometerAlt, FaFileInvoice, FaClipboardList, FaBullseye, FaEdit, FaChartBar, FaShoppingCart, FaUserTie, FaDonate, FaBalanceScale, FaMoneyBillAlt, FaDollarSign } from 'react-icons/fa';

const blue = '#2563eb';
const gray = '#64748b';
const lightBlue = '#60a5fa';
const sidebarStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  bottom: 0,
  width: 250,
  height: '100vh',
  background: '#fff',
  boxShadow: '2px 0 16px rgba(44,62,80,0.10)',
  zIndex: 1000,
  display: 'flex',
  flexDirection: 'column',
  padding: '0',
  borderRadius: '0 24px 24px 0',
};

const logoStyle = {
  fontWeight: 800,
  fontSize: 22,
  color: blue,
  margin: 0,
  padding: '32px 0 24px 0',
  textAlign: 'center',
  letterSpacing: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 12,
  borderBottom: '1px solid #e5e7eb',
};

const sectionTitleStyle = {
  fontWeight: 700,
  fontSize: 13,
  color: gray,
  margin: '24px 0 8px 32px',
  letterSpacing: 1,
  textTransform: 'uppercase',
};

const submenuTitleStyle = {
  fontWeight: 700,
  fontSize: 13,
  color: blue,
  margin: '24px 0 8px 32px',
  letterSpacing: 1,
  textTransform: 'uppercase',
};

const submenuStyle = {
  background: '#f1f5f9',
  borderRadius: 10,
  margin: '0 16px 8px 16px',
  padding: '8px 0',
  display: 'flex',
  flexDirection: 'column',
};

const linkStyle = isActive => ({
  display: 'flex',
  alignItems: 'center',
  color: isActive ? blue : '#222',
  textDecoration: 'none',
  padding: '12px 32px',
  fontWeight: isActive ? 700 : 500,
  fontSize: 16,
  borderLeft: isActive ? `4px solid ${blue}` : '4px solid transparent',
  background: isActive ? '#e0e7ff' : 'none',
  marginBottom: 2,
  transition: 'all 0.2s',
  borderRadius: '8px',
});

const iconStyle = isActive => ({
  marginRight: 16,
  fontSize: 20,
  color: isActive ? "#007ea4" : "#007ea4",
  minWidth: 24,
  minHeight: 24,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const Sidebar = () => {
  const location = useLocation();
  return (
    <aside style={sidebarStyle}>
      <div style={logoStyle}>
  <img src={logo} alt="Logo" style={{ height: 60, marginRight: 12 }} />
</div>
      <div style={{ flex: 1, overflowY: 'auto', paddingTop: 8 }}>
        <div style={sectionTitleStyle}>Pages</div>
        <Link to="/dashboard" style={linkStyle(location.pathname === '/dashboard')}><FaTachometerAlt style={iconStyle(location.pathname === '/dashboard')} />Dashboard</Link>
        <Link to="/invoice" style={linkStyle(location.pathname === '/invoice')}><FaFileInvoice style={iconStyle(location.pathname === '/invoice')} />Invoice</Link>
        <Link to="/quotations" style={linkStyle(location.pathname === '/quotations')}><FaClipboardList style={iconStyle(location.pathname === '/quotations')} />Quotations</Link>
        
        <div style={sectionTitleStyle}>Orders</div>
        <Link to="/orders" style={linkStyle(location.pathname === '/orders')}><FaShoppingCart style={iconStyle(location.pathname === '/orders')} />Orders</Link>
        <div style={sectionTitleStyle}>Employee</div>
        <Link to="/employee-orders" style={linkStyle(location.pathname === '/employee-orders')}><FaUserTie style={iconStyle(location.pathname === '/employee-orders')} />Orders</Link>
        <div style={sectionTitleStyle}>Targets</div>
        <Link to="/set-targets" style={linkStyle(location.pathname === '/set-targets')}><FaBullseye style={iconStyle(location.pathname === '/set-targets')} />Set Targets</Link>
        <Link to="/update-targets" style={linkStyle(location.pathname === '/update-targets')}><FaEdit style={iconStyle(location.pathname === '/update-targets')} />Update Targets</Link>
        <Link to="/target-dashboard" style={linkStyle(location.pathname === '/target-dashboard')}><FaChartBar style={iconStyle(location.pathname === '/target-dashboard')} />Target Dashboard</Link>
        <div style={submenuTitleStyle}>Accounting</div>
        <div style={submenuStyle}>
          <Link to="/viewbudget" style={linkStyle(location.pathname === '/viewbudget')}><FaShoppingCart style={iconStyle(location.pathname === '/viewbudget')} />Expenses</Link>
          <Link to="/viewrefund" style={linkStyle(location.pathname === '/viewrefund')}><FaDonate style={iconStyle(location.pathname === '/viewrefund')} />Incomes</Link>
          <Link to="/taxation" style={linkStyle(location.pathname === '/taxation')}><FaBalanceScale style={iconStyle(location.pathname === '/taxation')} />Taxation</Link>
          <Link to="/profit" style={linkStyle(location.pathname === '/profit')}><FaMoneyBillAlt style={iconStyle(location.pathname === '/profit')} />Profit</Link>
          <Link to="/analytics" style={linkStyle(location.pathname === '/analytics')}><FaDollarSign style={iconStyle(location.pathname === '/analytics')} />Analytics</Link>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar; 