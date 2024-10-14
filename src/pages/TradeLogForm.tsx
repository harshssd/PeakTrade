import React, { useState, useEffect } from "react";
import EnhancedButton from "../components/EnhancedButton";

const TradeLogForm: React.FC = () => {
  const [tradeType, setTradeType] = useState<"Stock" | "Options">("Stock");
  const [symbol, setSymbol] = useState("");
  const [entryPrice, setEntryPrice] = useState("");
  const [exitPrice, setExitPrice] = useState("");
  const [quantity, setQuantity] = useState(""); // Quantity for stocks or contracts for options
  const [optionType, setOptionType] = useState<"Call" | "Put">("Call");
  const [strikePrice, setStrikePrice] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [premium, setPremium] = useState(""); // Premium for options
  const [successRituals, setSuccessRituals] = useState<string[]>([]);
  const [tradePitfalls, setTradePitfalls] = useState<string[]>([]);
  const [notes, setNotes] = useState("");
  const [profit, setProfit] = useState<number | null>(null);

  // Calculate profit or loss for both stock and options trades
  useEffect(() => {
    if (tradeType === "Stock" && entryPrice && exitPrice && quantity) {
      const calculatedProfit =
        (parseFloat(exitPrice) - parseFloat(entryPrice)) * parseInt(quantity);
      setProfit(calculatedProfit);
    } else if (tradeType === "Options" && premium && exitPrice && quantity) {
      const calculatedProfit =
        (parseFloat(exitPrice) - parseFloat(premium)) *
        parseInt(quantity) *
        100; // Each contract represents 100 shares
      setProfit(calculatedProfit);
    } else {
      setProfit(null);
    }
  }, [entryPrice, exitPrice, premium, quantity, tradeType]);

  const handleSubmit = () => {
    const tradeData = {
      id: new Date().getTime(),
      type: tradeType,
      symbol,
      entryPrice,
      exitPrice,
      optionType,
      strikePrice,
      expirationDate,
      premium,
      quantity,
      successRituals,
      tradePitfalls,
      notes,
      profit, // Save profit/loss with the trade log
    };

    const existingTrades = JSON.parse(localStorage.getItem("trades") || "[]");
    localStorage.setItem(
      "trades",
      JSON.stringify([...existingTrades, tradeData])
    );

    // Clear form after submission
    setSymbol("");
    setEntryPrice("");
    setExitPrice("");
    setOptionType("Call");
    setStrikePrice("");
    setExpirationDate("");
    setPremium("");
    setQuantity("");
    setSuccessRituals([]);
    setTradePitfalls([]);
    setNotes("");
    setProfit(null);
    alert("Trade saved successfully!");
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Log Trade</h2>

      {/* Trade Type Selector */}
      <div className="mb-6">
        <label className="block mb-2 font-semibold">Trade Type:</label>
        <select
          value={tradeType}
          onChange={(e) => setTradeType(e.target.value as "Stock" | "Options")}
          className="block w-full p-2 border rounded-md"
        >
          <option value="Stock">Stock</option>
          <option value="Options">Options</option>
        </select>
      </div>

      {/* Stock Fields */}
      {tradeType === "Stock" && (
        <div>
          <div className="mb-4">
            <label className="block mb-2 font-semibold">Stock Symbol:</label>
            <input
              type="text"
              placeholder="AAPL, TSLA, etc."
              value={symbol}
              onChange={(e) => setSymbol(e.target.value)}
              className="block w-full p-2 border rounded-md"
            />
          </div>

          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 font-semibold">Entry Price:</label>
              <input
                type="number"
                placeholder="Enter entry price"
                value={entryPrice}
                onChange={(e) => setEntryPrice(e.target.value)}
                className="block w-full p-2 border rounded-md"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">Exit Price:</label>
              <input
                type="number"
                placeholder="Enter exit price"
                value={exitPrice}
                onChange={(e) => setExitPrice(e.target.value)}
                className="block w-full p-2 border rounded-md"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block mb-2 font-semibold">Quantity:</label>
            <input
              type="number"
              placeholder="Enter quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="block w-full p-2 border rounded-md"
            />
          </div>

          {/* Display calculated profit */}
          {profit !== null && (
            <div className="mb-4 p-4 bg-gray-100 rounded-md">
              <p className="text-lg font-semibold">
                Profit/Loss:{" "}
                <span
                  className={profit >= 0 ? "text-green-600" : "text-red-600"}
                >
                  ${profit.toFixed(2)}
                </span>
              </p>
            </div>
          )}
        </div>
      )}

      {/* Options Fields */}
      {tradeType === "Options" && (
        <div>
          <div className="mb-4">
            <label className="block mb-2 font-semibold">Stock Symbol:</label>
            <input
              type="text"
              placeholder="AAPL, TSLA, etc."
              value={symbol}
              onChange={(e) => setSymbol(e.target.value)}
              className="block w-full p-2 border rounded-md"
            />
          </div>

          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 font-semibold">Option Type:</label>
              <select
                value={optionType}
                onChange={(e) =>
                  setOptionType(e.target.value as "Call" | "Put")
                }
                className="block w-full p-2 border rounded-md"
              >
                <option value="Call">Call</option>
                <option value="Put">Put</option>
              </select>
            </div>

            <div>
              <label className="block mb-2 font-semibold">Strike Price:</label>
              <input
                type="number"
                placeholder="Enter strike price"
                value={strikePrice}
                onChange={(e) => setStrikePrice(e.target.value)}
                className="block w-full p-2 border rounded-md"
              />
            </div>
          </div>

          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 font-semibold">
                Expiration Date:
              </label>
              <input
                type="date"
                value={expirationDate}
                onChange={(e) => setExpirationDate(e.target.value)}
                className="block w-full p-2 border rounded-md"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">Premium:</label>
              <input
                type="number"
                placeholder="Enter premium"
                value={premium}
                onChange={(e) => setPremium(e.target.value)}
                className="block w-full p-2 border rounded-md"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block mb-2 font-semibold">Exit Price:</label>
            <input
              type="number"
              placeholder="Enter exit price"
              value={exitPrice}
              onChange={(e) => setExitPrice(e.target.value)}
              className="block w-full p-2 border rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 font-semibold">Contracts:</label>
            <input
              type="number"
              placeholder="Enter number of contracts"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="block w-full p-2 border rounded-md"
            />
          </div>

          {/* Display calculated profit for options */}
          {profit !== null && (
            <div className="mb-4 p-4 bg-gray-100 rounded-md">
              <p className="text-lg font-semibold">
                Profit/Loss:{" "}
                <span
                  className={profit >= 0 ? "text-green-600" : "text-red-600"}
                >
                  ${profit.toFixed(2)}
                </span>
              </p>
            </div>
          )}
        </div>
      )}

      {/* Success Rituals */}
      <div className="mb-4">
        <label className="block mb-2 font-semibold">Success Rituals:</label>
        <div>
          <label className="block">
            <input
              type="checkbox"
              value="Followed Strategy"
              onChange={(e) =>
                setSuccessRituals([...successRituals, e.target.value])
              }
              className="mr-2"
            />
            Followed Strategy
          </label>
          <label className="block">
            <input
              type="checkbox"
              value="Locked in Profits"
              onChange={(e) =>
                setSuccessRituals([...successRituals, e.target.value])
              }
              className="mr-2"
            />
            Locked in Profits
          </label>
        </div>
      </div>

      {/* Trade Pitfalls */}
      <div className="mb-6">
        <label className="block mb-2 font-semibold">Trade Pitfalls:</label>
        <div>
          <label className="block">
            <input
              type="checkbox"
              value="Stick to Stop Loss"
              onChange={(e) =>
                setTradePitfalls([...tradePitfalls, e.target.value])
              }
              className="mr-2"
            />
            Stick to Stop Loss
          </label>
          <label className="block">
            <input
              type="checkbox"
              value="Avoid FOMO Trades"
              onChange={(e) =>
                setTradePitfalls([...tradePitfalls, e.target.value])
              }
              className="mr-2"
            />
            Avoid FOMO Trades
          </label>
        </div>
      </div>

      {/* Journal Notes */}
      <textarea
        placeholder="Add your trade reflections..."
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        className="mb-4 block w-full p-2 border rounded-md"
      />

      {/* Submit Button */}
      <EnhancedButton label="Submit Trade" onClick={handleSubmit} />
    </div>
  );
};

export default TradeLogForm;
