import React, { useState } from "react"
import { FaBalanceScale, FaShoppingCart, FaDonate, FaSyncAlt, FaMoneyBillAlt, FaDollarSign, FaBars, FaChevronLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import '@trendmicro/react-sidenav/dist/react-sidenav.css';

export default function FinanceSideMenu() {
    const [search, setSearch] = useState("");

    // Menu items
    const menuItems = [
        { label: "Expenses", to: "/viewbudget", icon: <FaShoppingCart style={{ width: "1.5em", height: '1.5em', color: '#fbb13c', transition: 'color 0.2s' }} /> },
        { label: "Incomes", to: "/viewrefund", icon: <FaDonate style={{ width: "1.5em", height: '1.5em', color: '#d72660', transition: 'color 0.2s' }} /> },
        { label: "Taxation", to: "/taxation", icon: <FaBalanceScale style={{ width: "1.5em", height: '1.5em', color: '#7c3aed', transition: 'color 0.2s' }} /> },
        { label: "Profit", to: "/profit", icon: <FaMoneyBillAlt style={{ width: "1.5em", height: '1.5em', color: '#10b981', transition: 'color 0.2s' }} /> },
        { label: "Analytics", to: "/analytics", icon: <FaDollarSign style={{ width: "1.5em", height: '1.5em', color: '#2ec4b6', transition: 'color 0.2s' }} /> },
    ];
    const filteredMenu = menuItems.filter(item => item.label.toLowerCase().includes(search.toLowerCase()));

    return (
        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                height: "80px",
                background: 'linear-gradient(135deg, #192841 60%, #2ec4b6 100%)',
                color: "#fff",
                zIndex: 3000,
                boxShadow: "0 2px 16px rgba(44,62,80,0.08)",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0 24px",
            }}
        >
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
            }}>
                <span style={{
                    fontWeight: 700,
                    fontSize: 28,
                    letterSpacing: 1,
                    color: '#fff',
                }}>🧵</span>
                <span style={{ fontWeight: 700, fontSize: 20, color: '#fff' }}>W&B Clothing Accounting & Analytics</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                <div style={{ width: '200px' }}>
                    <input
                        type="text"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        placeholder="Search..."
                        style={{
                            width: '100%',
                            padding: '8px 12px',
                            borderRadius: 8,
                            border: 'none',
                            fontSize: 15,
                            outline: 'none',
                            background: '#f7f7fa',
                            color: '#222',
                        }}
                    />
                </div>
                <nav style={{ display: "flex", flexDirection: "row", gap: "16px" }}>
                    {filteredMenu.map(item => (
                        <Link to={item.to} key={item.to} style={linkStyle}>
                            {item.icon}
                            <span style={{ marginLeft: 8, fontWeight: 600, fontSize: 16 }}>{item.label}</span>
                        </Link>
                    ))}
                </nav>
            </div>
        </div>
    );
}

const linkStyle = {
    display: "flex",
    alignItems: "center",
    color: "#fff",
    textDecoration: "none",
    padding: "12px 16px",
    fontSize: "16px",
    borderRadius: "8px",
    whiteSpace: "nowrap",
    gap: "8px",
    transition: "background-color 0.2s",
    ":hover": {
        backgroundColor: "rgba(255, 255, 255, 0.1)"
    }
};
