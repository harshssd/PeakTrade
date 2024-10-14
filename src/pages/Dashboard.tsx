import React, { useEffect, useState } from "react";
import TimelineSelector from "../components/TimelineSelector";
import Card from "../components/Card";
import EnhancedButton from "../components/EnhancedButton"; // Import the enhanced button component

const Dashboard: React.FC = () => {
  const [trades, setTrades] = useState<any[]>([]);
  const [totalProfit, setTotalProfit] = useState<number>(0);
  const [bestTrade, setBestTrade] = useState<any | null>(null);
  const [worstTrade, setWorstTrade] = useState<any | null>(null);
  const [totalStockTrades, setTotalStockTrades] = useState<number>(0);
  const [totalOptionsTrades, setTotalOptionsTrades] = useState<number>(0);

  useEffect(() => {
    const savedTrades = JSON.parse(localStorage.getItem("trades") || "[]");
    setTrades(savedTrades);

    // Calculate stats
    const totalProfit = savedTrades.reduce(
      (acc: number, trade: any) => acc + (trade.profit || 0),
      0
    );
    setTotalProfit(totalProfit);

    const bestTrade = savedTrades.reduce(
      (max: any, trade: any) =>
        trade.profit > (max?.profit || 0) ? trade : max,
      null
    );
    setBestTrade(bestTrade);

    const worstTrade = savedTrades.reduce(
      (min: any, trade: any) =>
        trade.profit < (min?.profit || 0) ? trade : min,
      null
    );
    setWorstTrade(worstTrade);

    const totalStock = savedTrades.filter(
      (trade: any) => trade.type === "Stock"
    ).length;
    const totalOptions = savedTrades.filter(
      (trade: any) => trade.type === "Options"
    ).length;
    setTotalStockTrades(totalStock);
    setTotalOptionsTrades(totalOptions);
  }, []);

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-100 mb-6">
        Dashboard
      </h2>

      {/* Timeline Selector */}
      <TimelineSelector
        onChange={(range) => {
          /* Timeline change handler here */
        }}
      />

      {/* Key Stats with enhanced Card components */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        <Card title="Total Trades" value={trades.length} />
        <Card title="Total Profit/Loss" value={`$${totalProfit.toFixed(2)}`} />
        <Card
          title="Best Trade"
          value={
            bestTrade
              ? `${bestTrade.symbol} ($${bestTrade.profit.toFixed(2)})`
              : "No trades yet"
          }
        />
        <Card
          title="Worst Trade"
          value={
            worstTrade
              ? `${worstTrade.symbol} ($${worstTrade.profit.toFixed(2)})`
              : "No trades yet"
          }
        />
        <Card title="Stock Trades" value={totalStockTrades} />
        <Card title="Options Trades" value={totalOptionsTrades} />
      </div>

      {/* Quick Links with EnhancedButton */}
      <div className="mt-8">
        <h3 className="text-2xl font-semibold mb-4">Quick Links</h3>
        <div className="grid grid-cols-3 gap-6">
          <EnhancedButton label="View Trade Journal" to="/journal" />
          <EnhancedButton label="Log a New Trade" to="/log-trade" />
          <EnhancedButton label="View Analytics" to="/analytics" />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
