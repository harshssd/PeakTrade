import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const HabitProgressChart: React.FC<{ habits: any[] }> = ({ habits }) => {
  const [timeRange, setTimeRange] = useState<"daily" | "weekly" | "monthly">(
    "daily"
  );

  const today = new Date();

  // Create time intervals based on selected range
  const createDateArray = (range: "daily" | "weekly" | "monthly") => {
    if (range === "daily") {
      return Array.from({ length: 7 }, (_, i) => {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        return date.toISOString().split("T")[0];
      }).reverse();
    } else if (range === "weekly") {
      return Array.from({ length: 4 }, (_, i) => {
        const date = new Date(today);
        date.setDate(today.getDate() - i * 7);
        return date.toISOString().split("T")[0];
      }).reverse();
    } else if (range === "monthly") {
      return Array.from({ length: 6 }, (_, i) => {
        const date = new Date(today);
        date.setMonth(today.getMonth() - i);
        return date.toISOString().split("T")[0].slice(0, 7); // Only keep YYYY-MM
      }).reverse();
    }
    return [];
  };

  const timeLabels = createDateArray(timeRange);

  const datasets = habits.map((habit) => {
    const data = timeLabels.map((label) => {
      if (timeRange === "daily") {
        return habit.completionDates.includes(label) ? 1 : 0; // 1 if completed, 0 if not
      } else if (timeRange === "weekly") {
        const weekStart = new Date(label);
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekEnd.getDate() + 6);
        return habit.completionDates.some(
          (date: string) =>
            new Date(date) >= weekStart && new Date(date) <= weekEnd
        )
          ? 1
          : 0;
      } else if (timeRange === "monthly") {
        const month = label.slice(0, 7); // Extract YYYY-MM
        return habit.completionDates.some((date: string) =>
          date.startsWith(month)
        )
          ? 1
          : 0;
      }
      return 0;
    });
    return {
      label: habit.name,
      data,
      fill: false,
      borderColor: "#" + Math.floor(Math.random() * 16777215).toString(16), // Random color for each habit
    };
  });

  const chartData = {
    labels: timeLabels, // X-axis (last 7 days, weeks, or months)
    datasets,
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Habit Completion Over Time
      </h2>

      {/* Time Range Toggle */}
      <div className="mb-4">
        <button
          onClick={() => setTimeRange("daily")}
          className={`px-4 py-2 mr-2 ${
            timeRange === "daily" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Daily
        </button>
        <button
          onClick={() => setTimeRange("weekly")}
          className={`px-4 py-2 mr-2 ${
            timeRange === "weekly" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Weekly
        </button>
        <button
          onClick={() => setTimeRange("monthly")}
          className={`px-4 py-2 ${
            timeRange === "monthly" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Monthly
        </button>
      </div>

      <Line data={chartData} />
    </div>
  );
};

export default HabitProgressChart;
