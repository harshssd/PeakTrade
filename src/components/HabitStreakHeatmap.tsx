import React from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";

interface Habit {
  id: number;
  name: string;
  completed: boolean;
  completionDates: string[]; // Track the dates when habit was completed
  category: string; // New field for habit categories
}

const HabitStreakHeatmap: React.FC<{ habit: Habit }> = ({ habit }) => {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 100); // Show last 100 days

  const endDate = new Date();

  // Prepare the heatmap data based on habit completion dates
  const heatmapData = habit.completionDates.map((date: string) => ({
    date,
    count: 1, // 1 means the habit was completed
  }));

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Streak Heatmap for {habit.name}
      </h2>
      <CalendarHeatmap
        startDate={startDate}
        endDate={endDate}
        values={heatmapData}
        // classForValue={(value) => {
        //   if (!value) return "color-empty"; // If no value, show as empty
        //   return `color-scale-${value.count}`; // If completed, show a filled color
        // }}
        showWeekdayLabels
      />
    </div>
  );
};

export default HabitStreakHeatmap;
