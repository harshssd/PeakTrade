import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const HabitCompletionPieChart: React.FC<{ habits: any[] }> = ({ habits }) => {
  const data = {
    labels: habits.map((habit) => habit.name),
    datasets: [
      {
        label: "Habit Completion Breakdown",
        data: habits.map((habit) => habit.completionDates.length),
        backgroundColor: habits.map(
          () => `#${Math.floor(Math.random() * 16777215).toString(16)}`
        ), // Random colors
        borderColor: "rgba(255, 255, 255, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Habit Completion Breakdown
      </h2>
      <Pie data={data} />
    </div>
  );
};

export default HabitCompletionPieChart;
