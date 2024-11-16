import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import { FailurePitfall, StrategyTag, SuccessRitual } from "../models";
import TimelineSelector from "../components/TimelineSelector";
import InputField from "../components/InputField";

const TradeJournal: React.FC = () => {
  const [trades, setTrades] = useState<any[]>([]);
  const [filteredTrades, setFilteredTrades] = useState<any[]>([]);
  const [tradeType, setTradeType] = useState<string>("All");
  const [symbol, setSymbol] = useState<string>(""); // To filter by symbol
  const [startDate, setStartDate] = useState<string>(""); // To filter by start date
  const [endDate, setEndDate] = useState<string>(""); // To filter by end date

  // Load trades and initialize filtered trades
  useEffect(() => {
    const savedTrades =  JSON.parse(localStorage.getItem("trades") || "[]");
    const sortedTrades = savedTrades.sort(
      (a: { id: number }, b: { id: number }) => b.id - a.id
    ); // Sort by most recent
    setTrades(sortedTrades);
    setFilteredTrades(sortedTrades); // Initially, show all trades
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
    <div className="w-full mx-auto p-8 bg-gradient-to-b from-gray-100 to-gray-300 dark:from-gray-800 dark:to-gray-900 rounded-lg shadow-lg">
      <h2 className="text-4xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100">
        Trade Journal
      </h2>
      {/* Timeline Selector */}
      <TimelineSelector
        onChange={(range) => {
          /* Timeline change handler here */
        }}
      />

      {/* Filters */}
      <div className="mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-end w-full">
        {/* Trade Type Filter */}
        <div className="flex flex-col">
          <label className="mb-2 text-base font-semibold text-gray-700 dark:text-gray-300">
            Trade Type:
          </label>
          <select
            value={tradeType}
            onChange={(e) => setTradeType(e.target.value)}
            className="w-full p-3 mb-2 md:mb-4 border-2 rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-500"
          >
            <option value="All">All</option>
            <option value="Stock">Stock</option>
            <option value="Options">Options</option>
          </select>
        </div>

        {/* Symbol Filter */}
        <div className="flex flex-col">
          <label className="mb-2 text-base font-semibold text-gray-700 dark:text-gray-300">
            Symbol:
          </label>
          <InputField
            type="text"
            value={symbol}
            placeholder="Enter symbol (e.g., AAPL)"
            onChange={(e) => setSymbol(e.target.value)}
          />
        </div>

        {/* Start Date Filter */}
        <div className="flex flex-col">
          <label className="mb-2 text-base font-semibold text-gray-700 dark:text-gray-300">
            Start Date:
          </label>
          <InputField
            type="date"
            value={startDate}
            placeholder="Start Date"
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>

        {/* End Date Filter */}
        <div className="flex flex-col">
          <label className="mb-2 text-base font-semibold text-gray-700 dark:text-gray-300">
            End Date:
          </label>
          <InputField
            type="date"
            value={endDate}
            placeholder="End Date"
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </div>

      {/* Grid layout for displaying trades */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-8 w-full">
        {filteredTrades.length === 0 ? (
          <p className="text-lg text-gray-700 dark:text-gray-300 text-center">
            No trades found. Start logging your trades!
          </p>
        ) : (
          filteredTrades.map((trade) => (
            <Card
              key={trade.id}
              title={`${trade.symbol} (${trade.tradeType})`}
              value={`Profit/Loss: $${trade.profit?.toFixed(2)}`}
              className="text-lg"
            >
              <div className="mt-4 text-base">
                {trade.type === "Stock" && (
                  <>
                    <p>
                      <strong>Entry Price:</strong> ${trade.entryPrice}
                    </p>
                    <p>
                      <strong>Exit Price:</strong> ${trade.exitPrice}
                    </p>
                    <p>
                      <strong>Quantity:</strong> {trade.quantity}
                    </p>
                  </>
                )}
                {trade.type === "Options" && (
                  <>
                    <p>
                      <strong>Strike Price:</strong> ${trade.strikePrice}
                    </p>
                    <p>
                      <strong>Premium:</strong> ${trade.premium}
                    </p>
                    <p>
                      <strong>Sold Premium:</strong> ${trade.soldPremium}
                    </p>
                    <p>
                      <strong>Contracts:</strong> {trade.contracts}
                    </p>
                  </>
                )}
                <div className="mt-4 text-base">
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
