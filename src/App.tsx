import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import TradeJournal from "./pages/TradeJournal";
import TradeLogForm from "./pages/TradeLogForm";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import "./App.css";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectedRoute from "./auth/ProtectedRoute";

const App: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  return (
    <Router>
      <div className="min-h-screen flex flex-col md:flex-row">
        {/* Hamburger Button for Mobile View */}
        <button
          className="md:hidden p-2 m-2 text-white bg-blue-600 rounded-md z-50"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          ☰
        </button>

        {/* Sidebar */}
        <aside
          className={`fixed md:relative z-40 w-64 bg-gradient-to-b from-gray-800 to-black text-white p-4 border-r border-gray-700 transition-transform duration-300 ${
            isSidebarOpen
              ? "translate-x-0"
              : "-translate-x-full md:translate-x-0"
          }`}
        >
          <h1 className="text-4xl font-extrabold text-center mb-8 tracking-widest text-white logo-hover-animation">
            <Link to="/">🚀 PeakTrade</Link>
          </h1>
          <nav>
            <ul>
              <li className="mb-6">
                <Link
                  to="/"
                  className="block p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-md text-white font-bold hover:bg-blue-700 hover:scale-105 transition-all duration-300"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  Dashboard
                </Link>
              </li>
              <li className="mb-6">
                <Link
                  to="/journal"
                  className="block p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-md text-white font-bold hover:bg-blue-700 hover:scale-105 transition-all duration-300"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  Trade Journal
                </Link>
              </li>
              <li className="mb-6">
                <Link
                  to="/log-trade"
                  className="block p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-md text-white font-bold hover:bg-blue-700 hover:scale-105 transition-all duration-300"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  Log a Trade
                </Link>
              </li>
              <li className="mb-6">
                <Link
                  to="/analytics"
                  className="block p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-md text-white font-bold hover:bg-blue-700 hover:scale-105 transition-all duration-300"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  Analytics
                </Link>
              </li>
              <li className="mb-6">
                <Link
                  to="/settings"
                  className="block p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-md text-white font-bold hover:bg-blue-700 hover:scale-105 transition-all duration-300"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  Settings
                </Link>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <div
          className={`flex-1 p-8 bg-gray-100 dark:bg-gray-900 transition-all duration-300 ${
            isSidebarOpen
              ? "opacity-25 pointer-events-none md:opacity-100 md:pointer-events-auto"
              : "opacity-100"
          }`}
        >
          <Routes>
            <Route path="/" element={<ProtectedRoute element={<Dashboard />}/>} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/journal" element={<ProtectedRoute element={<TradeJournal />}/>} />
            <Route path="/log-trade" element={<ProtectedRoute element={<TradeLogForm />}/>} />
            <Route path="/analytics" element={<ProtectedRoute element={<Analytics />}/>} />
            <Route path="/settings" element={<ProtectedRoute element={<Settings />}/>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
