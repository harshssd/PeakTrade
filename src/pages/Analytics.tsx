import React, { useEffect, useState } from "react";
import { Line, Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import TimelineSelector from "../components/TimelineSelector"; // Import the Timeline Selector
import { getTradesForUser } from "../TradeQueries";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  BarElement,
  Tooltip,
  Legend
);

const Analytics: React.FC = () => {
  const [trades, setTrades] = useState<any[]>([]);
  const [filteredTrades, setFilteredTrades] = useState<any[]>([]);

  useEffect(() => {
    const savedTrades = getTradesForUser();
    setTrades(savedTrades);
    setFilteredTrades(savedTrades); // Initially, show all trades
  }, []);

  // Filter trades based on the selected time range
  const filterByTimeRange = (range: string) => {
    const now = new Date();
    let startDate = new Date("1970-01-01"); // Default to all time

    switch (range) {
      case "today":
        startDate = new Date(now.setHours(0, 0, 0, 0));
        break;
      case "1w":
        startDate = new Date(now.setDate(now.getDate() - 7));
        break;
      case "1m":
        startDate = new Date(now.setMonth(now.getMonth() - 1));
        break;
      case "3m":
        startDate = new Date(now.setMonth(now.getMonth() - 3));
        break;
      case "6m":
        startDate = new Date(now.setMonth(now.getMonth() - 6));
        break;
      case "1y":
        startDate = new Date(now.setFullYear(now.getFullYear() - 1));
        break;
      case "ytd":
        startDate = new Date(new Date().getFullYear(), 0, 1);
        break;
      default:
        startDate = new Date("1970-01-01"); // All Time
    }

    const filtered = trades.filter((trade) => new Date(trade.id) >= startDate);
    setFilteredTrades(filtered);
  };

  // Prepare data for each chart

  // 1. Profit/Loss Over Time (Line Chart)
  const profitOverTimeData = {
    labels: filteredTrades.map((trade) =>
      new Date(trade.id).toLocaleDateString()
    ), // Trade dates
    datasets: [
      {
        label: "Profit/Loss",
        data: filteredTrades.map((trade) => trade.profit),
        fill: false,
        borderColor: "#4CAF50",
        tension: 0.1,
      },
    ],
  };

  // 2. Trade Type Breakdown (Pie Chart)
  const tradeTypeBreakdownData = {
    labels: ["Stock", "Options"],
    datasets: [
      {
        label: "Trade Type",
        data: [
          filteredTrades.filter((trade) => trade.type === "Stock").length,
          filteredTrades.filter((trade) => trade.type === "Options").length,
        ],
        backgroundColor: ["#36A2EB", "#FF6384"],
        hoverOffset: 4,
      },
    ],
  };

  // 3. Success Rituals Impact (Bar Chart)
  const successRitualsImpactData = {
    labels: ["Followed Strategy", "Locked in Profits"], // Add more as needed
    datasets: [
      {
        label: "Profitable Trades",
        data: [
          filteredTrades.filter(
            (trade) =>
              trade.successRituals.includes("Followed Strategy") &&
              trade.profit > 0
          ).length,
          filteredTrades.filter(
            (trade) =>
              trade.successRituals.includes("Locked in Profits") &&
              trade.profit > 0
          ).length,
        ],
        backgroundColor: "#42A5F5",
        borderWidth: 1,
      },
    ],
  };

  // 4. Trade Performance by Symbol (Bar Chart)
  const uniqueSymbols = Array.from(
    new Set(filteredTrades.map((trade) => trade.symbol))
  );
  const tradePerformanceBySymbolData = {
    labels: uniqueSymbols,
    datasets: [
      {
        label: "Total Profit/Loss",
        data: uniqueSymbols.map((symbol) =>
          filteredTrades
            .filter((trade) => trade.symbol === symbol)
            .reduce((acc, curr) => acc + (curr.profit || 0), 0)
        ),
        backgroundColor: "#FFCE56",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">
        Analytics Dashboard
      </h2>

      {/* Timeline Selector */}
      <TimelineSelector onChange={filterByTimeRange} />

      {/* Profit/Loss Over Time */}
      <div className="mb-8">
        <h3 className="text-2xl font-semibold mb-4">Profit/Loss Over Time</h3>
        <Line data={profitOverTimeData} />
      </div>

      {/* Trade Type Breakdown */}
      <div className="mb-8">
        <h3 className="text-2xl font-semibold mb-4">Trade Type Breakdown</h3>
        <Pie data={tradeTypeBreakdownData} />
      </div>

      {/* Success Rituals Impact */}
      <div className="mb-8">
        <h3 className="text-2xl font-semibold mb-4">Success Rituals Impact</h3>
        <Bar data={successRitualsImpactData} />
      </div>

      {/* Trade Performance by Symbol */}
      <div className="mb-8">
        <h3 className="text-2xl font-semibold mb-4">
          Trade Performance by Symbol
        </h3>
        <Bar data={tradePerformanceBySymbolData} />
      </div>
    </div>
  );
};

export default Analytics;
