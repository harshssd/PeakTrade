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

const HabitCompletionBarChart: React.FC<{ habits: any[] }> = ({ habits }) => {
  const data = {
    labels: habits.map((habit) => habit.name),
    datasets: [
      {
        label: "Completion Count",
        data: habits.map((habit) => habit.completionDates.length),
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Habit Completion Bar Chart
      </h2>
      <Bar data={data} />
    </div>
  );
};

export default HabitCompletionBarChart;
