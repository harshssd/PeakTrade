import React, { useState, useEffect } from "react";
import Select, { MultiValue } from "react-select"; // Import React Select and MultiValue type
import { Trade, StrategyTag, SuccessRitual, FailurePitfall } from "../models";
import {
  defaultStrategyTags,
  defaultSuccessRituals,
  defaultFailurePitfalls,
} from "../default-configurations";
import InputField from "../components/InputField";
import Button from "../components/Button";
import FormWrapper from "../components/FormWrapper";

const TradeLogForm: React.FC = () => {
  // State for form data
  const [symbol, setSymbol] = useState<string>("");
  const [tradeType, setTradeType] = useState<string>("Stock");
  const [entryPrice, setEntryPrice] = useState<number>(0);
  const [exitPrice, setExitPrice] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(0);
  const [strikePrice, setStrikePrice] = useState<number>(0);
  const [expirationDate, setExpirationDate] = useState<string>("");
  const [optionDirection, setOptionDirection] = useState<string>("Call");
  const [premium, setPremium] = useState<number>(0);
  const [soldPremium, setSoldPremium] = useState<number>(0);
  const [profit, setProfit] = useState<number | null>(null);

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

  useEffect(() => {
    if (tradeType === "Options") {
      const calculatedProfit = (soldPremium - premium) * 100 * quantity;
      setProfit(!isNaN(calculatedProfit) ? calculatedProfit : null);
    } else {
      const calculatedProfit = (exitPrice - entryPrice) * quantity;
      setProfit(!isNaN(calculatedProfit) ? calculatedProfit : null);
    }
  }, [entryPrice, exitPrice, premium, soldPremium, quantity, tradeType]);

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
      tradeType,
      entryPrice,
      exitPrice,
      quantity,
      profit ?? 0,
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
    setTradeType("Stock");
    setEntryPrice(0);
    setExitPrice(0);
    setQuantity(0);
    setStrikePrice(0);
    setExpirationDate("");
    setOptionDirection("Call");
    setPremium(0);
    setSoldPremium(0);
    setSelectedTags([]);
    setSelectedRituals([]);
    setSelectedPitfalls([]);
    setProfit(null);
  };

  return (
    <FormWrapper
      title="Log a Trade"
      className="w-full max-w-full lg:max-w-7xl mx-auto p-4 md:p-6 lg:p-8"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6 w-full">
        {/* Symbol Input */}
        <div className="col-span-1">
          <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
            Symbol:
          </label>
          <InputField
            type="text"
            value={symbol}
            placeholder="Enter symbol (e.g., AAPL)"
            onChange={(e) => setSymbol(e.target.value)}
          />
        </div>

        {/* Trade Type Input */}
        <div className="col-span-1">
          <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
            Trade Type:
          </label>
          <select
            value={tradeType}
            onChange={(e) => setTradeType(e.target.value)}
            className="w-full p-3 border-2 rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-500"
          >
            <option value="Stock">Stock</option>
            <option value="Options">Options</option>
          </select>
        </div>

        {tradeType === "Options" && (
          <>
            <div className="col-span-1">
              <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                Strike Price:
              </label>
              <InputField
                type="number"
                value={String(strikePrice)}
                placeholder="Enter Strike Price"
                onChange={(e) => setStrikePrice(Number(e.target.value))}
              />
            </div>
            <div className="col-span-1">
              <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                Expiration Date:
              </label>
              <InputField
                type="date"
                value={expirationDate}
                placeholder="Select Expiration Date"
                onChange={(e) => setExpirationDate(e.target.value)}
              />
            </div>
            <div className="col-span-1">
              <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                Option Direction:
              </label>
              <select
                value={optionDirection}
                onChange={(e) => setOptionDirection(e.target.value)}
                className="w-full p-3 border-2 rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-500"
              >
                <option value="Call">Call</option>
                <option value="Put">Put</option>
              </select>
            </div>
            <div className="col-span-1">
              <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                Premium:
              </label>
              <InputField
                type="number"
                value={String(premium)}
                placeholder="Enter Premium"
                onChange={(e) => setPremium(Number(e.target.value))}
              />
            </div>
            <div className="col-span-1">
              <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                Sold Premium:
              </label>
              <InputField
                type="number"
                value={String(soldPremium)}
                placeholder="Enter Sold Premium"
                onChange={(e) => setSoldPremium(Number(e.target.value))}
              />
            </div>
          </>
        )}

        {/* Entry Price Input */}
        {tradeType === "Stock" && (
          <>
            <div className="col-span-1">
              <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                Entry Price:
              </label>
              <InputField
                type="number"
                value={String(entryPrice)}
                placeholder="Enter Entry Price"
                onChange={(e) => setEntryPrice(parseFloat(e.target.value))}
              />
            </div>

            {/* Exit Price Input */}
            <div className="col-span-1">
              <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                Exit Price:
              </label>
              <InputField
                type="number"
                value={String(exitPrice)}
                placeholder="Enter Exit Price"
                onChange={(e) => setExitPrice(parseFloat(e.target.value))}
              />
            </div>
          </>
        )}

        {/* Quantity Input */}
        <div className="col-span-1">
          <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
            Quantity:
          </label>
          <InputField
            type="number"
            value={String(quantity)}
            placeholder="Enter Quantity"
            onChange={(e) => setQuantity(Number(e.target.value))}
          />
        </div>
      </div>

      {/* Strategy Tags Multi-Select */}
      <div className="mt-4 lg:mt-6">
        <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
          Strategy Tags:
        </label>
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
      <div className="mt-4 lg:mt-6">
        <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
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
      <div className="mt-4 lg:mt-6">
        <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
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

      {/* Submit Button */}
      <div className="mt-8">
        <Button onClick={handleSubmit}>Submit Trade</Button>
      </div>

      {/* Profit Display */}
      {profit !== null && (
        <div className="mt-4 lg:mt-6 text-lg font-semibold">
          <span
            className={
              profit >= 0
                ? "text-green-600 dark:text-green-400"
                : "text-red-600 dark:text-red-400"
            }
          >
            Profit/Loss: ${profit.toFixed(2)}
          </span>
        </div>
      )}
    </FormWrapper>
  );
};

export default TradeLogForm;
