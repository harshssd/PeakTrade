import React, { useState } from "react";
import Select, { MultiValue } from "react-select"; // Import React Select and MultiValue type
import { Trade, StrategyTag, SuccessRitual, FailurePitfall } from "../models";
import {
  defaultStrategyTags,
  defaultSuccessRituals,
  defaultFailurePitfalls,
} from "../default-configurations";

const TradeLogForm: React.FC = () => {
  // State for form data
  const [symbol, setSymbol] = useState<string>("");
  const [type, setType] = useState<string>("Stock");
  const [entryPrice, setEntryPrice] = useState<number>(0);
  const [exitPrice, setExitPrice] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(0);

  // Updated state types for multi-select options
  const [selectedTags, setSelectedTags] = useState<
    MultiValue<{ value: number; label: string; description: string }>
  >([]);
  const [selectedRituals, setSelectedRituals] = useState<
    MultiValue<{ value: number; label: string; description: string }>
  >([]);
  const [selectedPitfalls, setSelectedPitfalls] = useState<
    MultiValue<{ value: number; label: string; description: string }>
  >([]);

  // Options for React Select
  const tagOptions = defaultStrategyTags.map((tag: StrategyTag) => ({
    value: tag.id,
    label: tag.name,
    description: tag.description,
  }));
  const ritualOptions = defaultSuccessRituals.map((ritual: SuccessRitual) => ({
    value: ritual.id,
    label: ritual.name,
    description: ritual.description,
  }));
  const pitfallOptions = defaultFailurePitfalls.map(
    (pitfall: FailurePitfall) => ({
      value: pitfall.id,
      label: pitfall.name,
      description: pitfall.description,
    })
  );

  const handleSubmit = () => {
    // Convert selected options to original class instances
    const tags = selectedTags.map(
      (option) =>
        defaultStrategyTags.find((tag: StrategyTag) => tag.id === option.value)!
    );
    const rituals = selectedRituals.map(
      (option) =>
        defaultSuccessRituals.find(
          (ritual: SuccessRitual) => ritual.id === option.value
        )!
    );
    const pitfalls = selectedPitfalls.map(
      (option) =>
        defaultFailurePitfalls.find(
          (pitfall: FailurePitfall) => pitfall.id === option.value
        )!
    );

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
      rituals,
      pitfalls
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
    setSelectedTags([]);
    setSelectedRituals([]);
    setSelectedPitfalls([]);
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
          <Select
            isMulti
            options={tagOptions}
            value={selectedTags}
            onChange={(selected) => setSelectedTags(selected)}
            className="basic-multi-select"
            classNamePrefix="select"
          />
        </div>

        {/* Success Rituals Multi-Select */}
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">
            Success Rituals:
          </label>
          <Select
            isMulti
            options={ritualOptions}
            value={selectedRituals}
            onChange={(selected) => setSelectedRituals(selected)}
            className="basic-multi-select"
            classNamePrefix="select"
          />
        </div>

        {/* Failure Pitfalls Multi-Select */}
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">
            Failure Pitfalls:
          </label>
          <Select
            isMulti
            options={pitfallOptions}
            value={selectedPitfalls}
            onChange={(selected) => setSelectedPitfalls(selected)}
            className="basic-multi-select"
            classNamePrefix="select"
          />
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
