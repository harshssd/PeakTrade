import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import TradeJournal from "./pages/TradeJournal";
import TradeLogForm from "./pages/TradeLogForm";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import "./App.css";

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen flex">
        {/* Sidebar */}
        <aside className="w-64 bg-gradient-to-b from-gray-800 to-black text-white p-4 border-r border-gray-700">
          <h1 className="text-4xl font-extrabold text-center mb-8 tracking-widest text-white logo-hover-animation">
            <Link to="/">🚀 PeakTrade</Link>
          </h1>
          <nav>
            <ul>
              <li className="mb-6">
                <Link
                  to="/"
                  className="block p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-md text-white font-bold hover:bg-blue-700 hover:scale-105 transition-all duration-300"
                >
                  Dashboard
                </Link>
              </li>
              <li className="mb-6">
                <Link
                  to="/journal"
                  className="block p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-md text-white font-bold hover:bg-blue-700 hover:scale-105 transition-all duration-300"
                >
                  Trade Journal
                </Link>
              </li>
              <li className="mb-6">
                <Link
                  to="/log-trade"
                  className="block p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-md text-white font-bold hover:bg-blue-700 hover:scale-105 transition-all duration-300"
                >
                  Log a Trade
                </Link>
              </li>
              <li className="mb-6">
                <Link
                  to="/analytics"
                  className="block p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-md text-white font-bold hover:bg-blue-700 hover:scale-105 transition-all duration-300"
                >
                  Analytics
                </Link>
              </li>
              <li className="mb-6">
                <Link
                  to="/settings"
                  className="block p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-md text-white font-bold hover:bg-blue-700 hover:scale-105 transition-all duration-300"
                >
                  Settings
                </Link>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <div className="flex-1 p-8 bg-gray-100 dark:bg-gray-900">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/journal" element={<TradeJournal />} />
            <Route path="/log-trade" element={<TradeLogForm />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
