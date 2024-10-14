import React, { useState, useEffect } from "react";
import { Trade, StrategyTag, SuccessRitual, FailurePitfall } from "./models";
import {
  defaultFailurePitfalls,
  defaultStrategyTags,
  defaultSuccessRituals,
} from "./default-configurations";

const TradeLogForm: React.FC = () => {
  // State for form data
  const [symbol, setSymbol] = useState<string>("");
  const [type, setType] = useState<string>("Stock");
  const [entryPrice, setEntryPrice] = useState<number>(0);
  const [exitPrice, setExitPrice] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(0);
  const [tags, setTags] = useState<StrategyTag[]>([]);
  const [successRituals, setSuccessRituals] = useState<SuccessRitual[]>([]);
  const [failurePitfalls, setFailurePitfalls] = useState<FailurePitfall[]>([]);

  // Fetch default tags, rituals, pitfalls
  const [availableTags, setAvailableTags] =
    useState<StrategyTag[]>(defaultStrategyTags);
  const [availableRituals, setAvailableRituals] = useState<SuccessRitual[]>(
    defaultSuccessRituals
  );
  const [availablePitfalls, setAvailablePitfalls] = useState<FailurePitfall[]>(
    defaultFailurePitfalls
  );

  const handleSubmit = () => {
    // Create a new trade object with the selected tags, rituals, and pitfalls
    const newTrade = new Trade(
      Date.now(),
      symbol,
      type,
      entryPrice,
      exitPrice,
      quantity,
      (exitPrice - entryPrice) * quantity,
      tags,
      successRituals,
      failurePitfalls
    );

    // Save the new trade to localStorage or any other state management solution
    const savedTrades = JSON.parse(localStorage.getItem("trades") || "[]");
    savedTrades.push(newTrade);
    localStorage.setItem("trades", JSON.stringify(savedTrades));

    // Reset form fields
    setSymbol("");
    setType("Stock");
    setEntryPrice(0);
    setExitPrice(0);
    setQuantity(0);
    setTags([]);
    setSuccessRituals([]);
    setFailurePitfalls([]);
  };

  return (
    <div className="max-w-xl mx-auto p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Log a Trade</h2>
      <form>
        {/* Symbol Input */}
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Symbol:</label>
          <input
            type="text"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
            className="w-full p-2 border rounded-md"
          />
        </div>

        {/* Trade Type Input */}
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Type:</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full p-2 border rounded-md"
          >
            <option value="Stock">Stock</option>
            <option value="Options">Options</option>
          </select>
        </div>

        {/* Entry Price Input */}
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Entry Price:</label>
          <input
            type="number"
            value={entryPrice}
            onChange={(e) => setEntryPrice(parseFloat(e.target.value))}
            className="w-full p-2 border rounded-md"
          />
        </div>

        {/* Exit Price Input */}
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Exit Price:</label>
          <input
            type="number"
            value={exitPrice}
            onChange={(e) => setExitPrice(parseFloat(e.target.value))}
            className="w-full p-2 border rounded-md"
          />
        </div>

        {/* Quantity Input */}
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Quantity:</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            className="w-full p-2 border rounded-md"
          />
        </div>

        {/* Strategy Tags Multi-Select */}
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Strategy Tags:</label>
          {availableTags.map((tag) => (
            <div key={tag.id}>
              <input
                type="checkbox"
                value={tag.id}
                onChange={(e) => {
                  if (e.target.checked) {
                    setTags([...tags, tag]);
                  } else {
                    setTags(tags.filter((t) => t.id !== tag.id));
                  }
                }}
              />
              <label className="ml-2">{tag.name}</label>
            </div>
          ))}
        </div>

        {/* Success Rituals Multi-Select */}
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">
            Success Rituals:
          </label>
          {availableRituals.map((ritual) => (
            <div key={ritual.id}>
              <input
                type="checkbox"
                value={ritual.id}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSuccessRituals([...successRituals, ritual]);
                  } else {
                    setSuccessRituals(
                      successRituals.filter((r) => r.id !== ritual.id)
                    );
                  }
                }}
              />
              <label className="ml-2">{ritual.name}</label>
            </div>
          ))}
        </div>

        {/* Failure Pitfalls Multi-Select */}
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">
            Failure Pitfalls:
          </label>
          {availablePitfalls.map((pitfall) => (
            <div key={pitfall.id}>
              <input
                type="checkbox"
                value={pitfall.id}
                onChange={(e) => {
                  if (e.target.checked) {
                    setFailurePitfalls([...failurePitfalls, pitfall]);
                  } else {
                    setFailurePitfalls(
                      failurePitfalls.filter((p) => p.id !== pitfall.id)
                    );
                  }
                }}
              />
              <label className="ml-2">{pitfall.name}</label>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          className="w-full p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Submit Trade
        </button>
      </form>
    </div>
  );
};

export default TradeLogForm;
