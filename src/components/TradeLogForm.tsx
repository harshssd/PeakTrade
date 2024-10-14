import React, { useState } from "react";

const TradeLogForm: React.FC = () => {
  const [tradeType, setTradeType] = useState<"Stock" | "Options">("Stock");
  const [symbol, setSymbol] = useState("");
  const [entryPrice, setEntryPrice] = useState("");
  const [exitPrice, setExitPrice] = useState("");
  const [optionType, setOptionType] = useState<"Call" | "Put">("Call");
  const [strikePrice, setStrikePrice] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [premium, setPremium] = useState("");
  const [quantity, setQuantity] = useState("");
  const [followedHabits, setFollowedHabits] = useState<string[]>([]);
  const [missedHabits, setMissedHabits] = useState<string[]>([]);
  const [notes, setNotes] = useState("");

  const handleSubmit = () => {
    const tradeData = {
      type: tradeType,
      symbol,
      entryPrice,
      exitPrice,
      optionType,
      strikePrice,
      expirationDate,
      premium,
      quantity,
      followedHabits,
      missedHabits,
      notes,
    };
    console.log(tradeData); // Save or process trade data
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Log Trade</h2>

      <div className="mb-4">
        <label>Trade Type:</label>
        <select
          value={tradeType}
          onChange={(e) => setTradeType(e.target.value as "Stock" | "Options")}
          className="ml-2"
        >
          <option value="Stock">Stock</option>
          <option value="Options">Options</option>
        </select>
      </div>

      {/* Stock Trade Fields */}
      {tradeType === "Stock" && (
        <div>
          <input
            type="text"
            placeholder="Stock Symbol"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
            className="mb-2 block"
          />
          <input
            type="number"
            placeholder="Entry Price"
            value={entryPrice}
            onChange={(e) => setEntryPrice(e.target.value)}
            className="mb-2 block"
          />
          <input
            type="number"
            placeholder="Exit Price"
            value={exitPrice}
            onChange={(e) => setExitPrice(e.target.value)}
            className="mb-2 block"
          />
        </div>
      )}

      {/* Options Trade Fields */}
      {tradeType === "Options" && (
        <div>
          <input
            type="text"
            placeholder="Stock Symbol"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
            className="mb-2 block"
          />
          <select
            value={optionType}
            onChange={(e) => setOptionType(e.target.value as "Call" | "Put")}
            className="mb-2 block"
          >
            <option value="Call">Call</option>
            <option value="Put">Put</option>
          </select>
          <input
            type="number"
            placeholder="Strike Price"
            value={strikePrice}
            onChange={(e) => setStrikePrice(e.target.value)}
            className="mb-2 block"
          />
          <input
            type="date"
            placeholder="Expiration Date"
            value={expirationDate}
            onChange={(e) => setExpirationDate(e.target.value)}
            className="mb-2 block"
          />
          <input
            type="number"
            placeholder="Premium"
            value={premium}
            onChange={(e) => setPremium(e.target.value)}
            className="mb-2 block"
          />
          <input
            type="number"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="mb-2 block"
          />
        </div>
      )}

      {/* Habit Tracking */}
      <div className="mb-4">
        <label>Followed Habits:</label>
        {/* Dynamically populate habits */}
        <div>
          <label>
            <input
              type="checkbox"
              value="Followed Strategy"
              onChange={(e) =>
                setFollowedHabits([...followedHabits, e.target.value])
              }
            />
            Followed Strategy
          </label>
          <label>
            <input
              type="checkbox"
              value="Lock in Profits"
              onChange={(e) =>
                setFollowedHabits([...followedHabits, e.target.value])
              }
            />
            Lock in Profits
          </label>
          {/* More habits */}
        </div>
      </div>

      <div className="mb-4">
        <label>Missed Habits:</label>
        <div>
          <label>
            <input
              type="checkbox"
              value="Lock in Profits"
              onChange={(e) =>
                setMissedHabits([...missedHabits, e.target.value])
              }
            />
            Lock in Profits
          </label>
          <label>
            <input
              type="checkbox"
              value="Stick to Stop Loss"
              onChange={(e) =>
                setMissedHabits([...missedHabits, e.target.value])
              }
            />
            Stick to Stop Loss
          </label>
          {/* More habits */}
        </div>
      </div>

      {/* Journal Notes */}
      <textarea
        placeholder="Add your trade reflections..."
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        className="mb-4 block w-full"
      />

      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Submit Trade
      </button>
    </div>
  );
};

export default TradeLogForm;
