import React from "react";
import HabitCompletionPieChart from "../components/HabitCompletionPieChart";
import HabitCompletionBarChart from "../components/HabitCompletionBarChart";

const HabitAnalytics: React.FC = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Habit Analytics
      </h2>
      <div className="grid grid-cols-2 gap-6">
        <HabitCompletionPieChart habits={[]} />
        <HabitCompletionBarChart habits={[]} />
      </div>
    </div>
  );
};

export default HabitAnalytics;
