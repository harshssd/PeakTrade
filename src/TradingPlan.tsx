import React, { useState, ChangeEvent, FormEvent } from "react";

interface TradingPlanState {
  targetProfit: string;
  maxLoss: string;
  riskLevel: string;
}

const TradingPlan: React.FC = () => {
  const [plan, setPlan] = useState<TradingPlanState>({
    targetProfit: "",
    maxLoss: "",
    riskLevel: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPlan((prevPlan) => ({
      ...prevPlan,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    localStorage.setItem("tradingPlan", JSON.stringify(plan));
    console.log("Plan saved to localStorage:", plan);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Set Your Trading Plan
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Target Profit
          </label>
          <input
            type="number"
            name="targetProfit"
            value={plan.targetProfit}
            onChange={handleChange}
            placeholder="e.g. 2000"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Max Loss</label>
          <input
            type="number"
            name="maxLoss"
            value={plan.maxLoss}
            onChange={handleChange}
            placeholder="e.g. 1000"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Risk Level
          </label>
          <input
            type="text"
            name="riskLevel"
            value={plan.riskLevel}
            onChange={handleChange}
            placeholder="e.g. Low, Medium, High"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-bold py-2 rounded-md hover:bg-blue-700 transition duration-300"
        >
          Save Plan
        </button>
      </form>
    </div>
  );
};

export default TradingPlan;
