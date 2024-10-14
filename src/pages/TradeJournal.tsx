import React, { useEffect, useState } from "react";
import Card from "../components/Card"; // Import Card component
import TimelineSelector from "../components/TimelineSelector"; // Import Timeline Selector
import { FailurePitfall, StrategyTag, SuccessRitual } from "../models";

const TradeJournal: React.FC = () => {
  const [trades, setTrades] = useState<any[]>([]);
  const [filteredTrades, setFilteredTrades] = useState<any[]>([]);
  const [tradeType, setTradeType] = useState<string>("All");
  const [symbol, setSymbol] = useState<string>(""); // To filter by symbol
  const [startDate, setStartDate] = useState<string>(""); // To filter by start date
  const [endDate, setEndDate] = useState<string>(""); // To filter by end date

  // Load trades and initialize filtered trades
  useEffect(() => {
    const savedTrades = JSON.parse(localStorage.getItem("trades") || "[]");
    setTrades(savedTrades);
    setFilteredTrades(savedTrades); // Initially, show all trades
  }, []);

  // Filter trades when filter options change
  useEffect(() => {
    const filtered = trades.filter((trade) => {
      const tradeDate = new Date(trade.id);

      const matchType = tradeType === "All" || trade.type === tradeType;
      const matchSymbol =
        symbol === "" ||
        trade.symbol.toLowerCase().includes(symbol.toLowerCase());
      const matchStartDate =
        startDate === "" || tradeDate >= new Date(startDate);
      const matchEndDate = endDate === "" || tradeDate <= new Date(endDate);

      return matchType && matchSymbol && matchStartDate && matchEndDate;
    });

    setFilteredTrades(filtered);
  }, [tradeType, symbol, startDate, endDate, trades]);

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
        Trade Journal
      </h2>

      {/* Timeline Selector */}
      <TimelineSelector
        onChange={(range) => {
          /* Timeline change handler here */
        }}
      />

      {/* Filters */}
      <div className="mb-4 grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Trade Type Filter */}
        <div>
          <label className="block mb-1 text-sm font-semibold">
            Trade Type:
          </label>
          <select
            value={tradeType}
            onChange={(e) => setTradeType(e.target.value)}
            className="block w-full p-1 border rounded-md text-sm"
          >
            <option value="All">All</option>
            <option value="Stock">Stock</option>
            <option value="Options">Options</option>
          </select>
        </div>

        {/* Symbol Filter */}
        <div>
          <label className="block mb-1 text-sm font-semibold">Symbol:</label>
          <input
            type="text"
            placeholder="Enter symbol (e.g., AAPL)"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
            className="block w-full p-1 border rounded-md text-sm"
          />
        </div>

        {/* Date Range Filters */}
        <div>
          <label className="block mb-1 text-sm font-semibold">
            Start Date:
          </label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="block w-full p-1 border rounded-md text-sm"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-semibold">End Date:</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="block w-full p-1 border rounded-md text-sm"
          />
        </div>
      </div>

      {/* Grid layout for displaying trades */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTrades.length === 0 ? (
          <p className="text-sm">No trades found. Start logging your trades!</p>
        ) : (
          filteredTrades.map((trade) => (
            <Card
              key={trade.id}
              title={`${trade.symbol} (${trade.type})`}
              value={`Profit/Loss: $${trade.profit?.toFixed(2)}`}
              className="text-sm"
            >
              <div className="mt-2 text-sm">
                <p>
                  <strong>Entry Price:</strong> ${trade.entryPrice}
                </p>
                <p>
                  <strong>Exit Price:</strong> ${trade.exitPrice}
                </p>
                <p>
                  <strong>Quantity:</strong> {trade.quantity}
                </p>
                <div className="mt-2 text-sm">
                  <p>
                    <strong>Tags:</strong>{" "}
                    {trade.tags
                      .map((tag: StrategyTag) => tag.name)
                      .join(", ") || "None"}
                  </p>
                  <p>
                    <strong>Success Rituals:</strong>{" "}
                    {trade.successRituals
                      .map((ritual: SuccessRitual) => ritual.name)
                      .join(", ") || "None"}
                  </p>
                  <p>
                    <strong>Failure Pitfalls:</strong>{" "}
                    {trade.failurePitfalls
                      .map((pitfall: FailurePitfall) => pitfall.name)
                      .join(", ") || "None"}
                  </p>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default TradeJournal;
