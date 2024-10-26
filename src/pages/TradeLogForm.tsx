import React, { useState } from "react";
import Select, { MultiValue } from "react-select"; // Import React Select and MultiValue type
import { Trade, StrategyTag, SuccessRitual, FailurePitfall } from "../models";
import {
  defaultStrategyTags,
  defaultSuccessRituals,
  defaultFailurePitfalls,
} from "../default-configurations";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const TradeLogForm: React.FC = () => {
  const navigate = useNavigate();

  // State for form data
  const [symbol, setSymbol] = useState<string>("");
  const [tradeType, setTradeType] = useState<string>("Stock");
  const [entryPrice, setEntryPrice] = useState<number>(0);
  const [exitPrice, setExitPrice] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(0);
  const [strikePrice, setStrikePrice] = useState<number>(0);
  const [expirationDate, setExpirationDate] = useState<string>("");
  const [optionType, setOptionType] = useState<string>("Call");
  const [tradeDirection, setTradeDirection] = useState<string>("Buy");
  const [premium, setPremium] = useState<number>(0);
  const [soldPremium, setSoldPremium] = useState<number>(0);
  const [profit, setProfit] = useState<number>(0);

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

  const handleBlur = () => {
    setProfit(calculateProfit());
  };

  const calculateProfit = () => {
    let profit = 0;

    if (tradeType === "Stock") {
      profit = (exitPrice - entryPrice) * quantity;
    } else if (tradeType === "Options") {
      const directionMultiplier = tradeDirection === "Buy" ? 1 : -1;
      profit = directionMultiplier * (soldPremium - premium) * quantity * 100;
    }

    return isNaN(profit) ? 0 : profit;
  };

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
      profit,
      tags,
      rituals,
      pitfalls
    );

    // Save the new trade to localStorage or any other state management solution
    const savedTrades = JSON.parse(localStorage.getItem("trades") || "[]");
    savedTrades.push(newTrade);
    localStorage.setItem("trades", JSON.stringify(savedTrades));

    // Show success message
    toast.success("Trade logged successfully!", {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

    // Redirect user to trade journal after a short delay
    setTimeout(() => {
      navigate("/journal");
    }, 3000);

    // Reset form fields
    setSymbol("");
    setTradeType("Stock");
    setEntryPrice(0);
    setExitPrice(0);
    setQuantity(0);
    setStrikePrice(0);
    setExpirationDate("");
    setOptionType("Call");
    setTradeDirection("Buy");
    setPremium(0);
    setSoldPremium(0);
    setSelectedTags([]);
    setSelectedRituals([]);
    setSelectedPitfalls([]);
    setProfit(0);
  };

  return (
    <div className="max-w-xl mx-auto p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Log a Trade</h2>
      <form>
        {/* Symbol Input */}
        <div className="mt-4">
          <label
            htmlFor="symbol"
            className="block text-sm font-medium text-gray-700"
          >
            Symbol:
          </label>
          <input
            type="text"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
            className="w-full p-2 border rounded-md"
          />
        </div>

        {/* Trade Type Input */}
        <div className="mt-4">
          <label
            htmlFor="tradeType"
            className="block text-sm font-medium text-gray-700"
          >
            Trade Type:
          </label>
          <select
            value={tradeType}
            onChange={(e) => setTradeType(e.target.value)}
            className="w-full p-2 border rounded-md"
          >
            <option value="Stock">Stock</option>
            <option value="Options">Options</option>
          </select>
        </div>

        {tradeType === "Options" && (
          <>
            <div className="mt-4">
              <label
                htmlFor="strikePrice"
                className="block text-sm font-medium text-gray-700"
              >
                Strike Price
              </label>
              <input
                type="number"
                name="strikePrice"
                id="strikePrice"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                value={strikePrice}
                onChange={(e) => setStrikePrice(Number(e.target.value))}
              />
            </div>
            <div className="mt-4">
              <label
                htmlFor="expirationDate"
                className="block text-sm font-medium text-gray-700"
              >
                Expiration Date
              </label>
              <input
                type="date"
                name="expirationDate"
                id="expirationDate"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                value={expirationDate}
                onChange={(e) => setExpirationDate(e.target.value)}
              />
            </div>
            <div className="mt-4">
              <label
                htmlFor="optionType"
                className="block text-sm font-medium text-gray-700"
              >
                Option Type
              </label>
              <select
                value={optionType}
                onChange={(e) => setOptionType(e.target.value)}
                className="w-full p-2 border rounded-md"
              >
                <option value="Call">Call</option>
                <option value="Put">Put</option>
              </select>
            </div>
            <div className="mt-4">
              <label
                htmlFor="tradeDirection"
                className="block text-sm font-medium text-gray-700"
              >
                Direction
              </label>
              <select
                value={tradeDirection}
                onChange={(e) => setTradeDirection(e.target.value)}
                className="w-full p-2 border rounded-md"
              >
                <option value="Buy">Buy</option>
                <option value="Sell">Sell</option>
              </select>
            </div>
            <div className="mt-4">
              <label
                htmlFor="premium"
                className="block text-sm font-medium text-gray-700"
              >
                Premium per Contract
              </label>
              <input
                type="number"
                name="premium"
                id="premium"
                step="0.01"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                value={premium}
                onChange={(e) => setPremium(Number(e.target.value))}
                onBlur={handleBlur}
              />
            </div>
            <div className="mt-4">
              <label
                htmlFor="soldPremium"
                className="block text-sm font-medium text-gray-700"
              >
                Sold Premium per Contract
              </label>
              <input
                type="number"
                name="soldPremium"
                id="soldPremium"
                step="0.01"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                value={soldPremium}
                onChange={(e) => setSoldPremium(Number(e.target.value))}
                onBlur={handleBlur}
              />
            </div>
          </>
        )}

        {tradeType === "Stock" && (
          <>
            {/* Entry Price Input */}
            <div className="mt-4">
              <label
                htmlFor="entryPrice"
                className="block text-sm font-medium text-gray-700"
              >
                Entry Price:
              </label>
              <input
                type="number"
                value={entryPrice}
                onChange={(e) => setEntryPrice(parseFloat(e.target.value))}
                className="w-full p-2 border rounded-md"
                onBlur={handleBlur}
              />
            </div>

            {/* Exit Price Input */}
            <div className="mt-4">
              <label
                htmlFor="exitPrice"
                className="block text-sm font-medium text-gray-700"
              >
                Exit Price:
              </label>
              <input
                type="number"
                value={exitPrice}
                onChange={(e) => setExitPrice(parseFloat(e.target.value))}
                className="w-full p-2 border rounded-md"
                onBlur={handleBlur}
              />
            </div>
          </>
        )}

        <div className="mt-4">
          <label
            htmlFor="quantity"
            className="block text-sm font-medium text-gray-700"
          >
            Quantity
          </label>
          <input
            type="number"
            name="quantity"
            id="quantity"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            onBlur={handleBlur}
          />
        </div>

        {/* Display Profit */}
        {profit !== 0 && (
          <div
            className={`mt-4 p-4 rounded-md shadow-md ${
              profit >= 0
                ? "bg-green-100 border-l-4 border-green-500"
                : "bg-red-100 border-l-4 border-red-500"
            }`}
          >
            <p
              className={`text-lg font-bold ${
                profit >= 0 ? "text-green-700" : "text-red-700"
              }`}
            >
              {profit >= 0 ? "Profit: " : "Loss: "}{" "}
              {Math.abs(profit).toFixed(2)}
            </p>
          </div>
        )}

        {/* Strategy Tags Multi-Select */}
        <div className="mt-4">
          <label
            htmlFor="tagOptions"
            className="block text-sm font-medium text-gray-700"
          >
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
        <div className="mt-4">
          <label
            htmlFor="ritualOptions"
            className="block text-sm font-medium text-gray-700"
          >
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
        <div className="mt-4">
          <label
            htmlFor="pitfallOptions"
            className="block text-sm font-medium text-gray-700"
          >
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
        <div className="mt-4">
          <label
            htmlFor="pitfallOptions"
            className="block text-sm font-medium text-gray-700"
          ></label>
          <button
            type="button"
            onClick={handleSubmit}
            className="w-full p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Submit Trade
          </button>
        </div>
      </form>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default TradeLogForm;
