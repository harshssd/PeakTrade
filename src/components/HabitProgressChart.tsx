import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const HabitProgressChart: React.FC<{ habits: any[] }> = ({ habits }) => {
  const chartData = {
    labels: habits.map((habit) => habit.name),
    datasets: [
      {
        label: "Completion Rate (%)",
        data: habits.map((habit) => habit.completionDates.length),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Habit Progress
      </h2>
      <Bar data={chartData} />
    </div>
  );
};

export default HabitProgressChart;
