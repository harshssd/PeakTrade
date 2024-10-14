import React, { useState, useEffect } from "react";
import HabitProgressChart from "./HabitProgressChart";
import HabitProgressOverTimeChart from "./HabitProgressOverTime";
import HabitStreakHeatmap from "./HabitStreakHeatmap";
import HabitCompletionPieChart from "./HabitCompletionPieChart";
import HabitCompletionBarChart from "./HabitCompletionBarChart";

interface Habit {
  id: number;
  name: string;
  completed: boolean;
  completionDates: string[]; // Track the dates when habit was completed
  category: string; // New field for habit categories
}

const HabitTracker: React.FC = () => {
  const [habits, setHabits] = useState<Habit[]>([
    {
      id: 1,
      name: "Follow Trading Strategy",
      completed: false,
      completionDates: [],
      category: "Discipline",
    },
    {
      id: 2,
      name: "Lock in Profits",
      completed: false,
      completionDates: [],
      category: "Risk Management",
    },
    {
      id: 3,
      name: "Avoid FOMO Trades",
      completed: false,
      completionDates: ["2024-10-11", "2024-10-12"],
      category: "Discipline",
    },
  ]);
  const [newHabit, setNewHabit] = useState<string>(""); // State for the new habit
  const [newHabitCategory, setNewHabitCategory] = useState<string>(""); // State for the new habit's category
  const [selectedHabit, setSelectedHabit] = useState<Habit | null>(null);

  useEffect(() => {
    const savedHabits = localStorage.getItem("habits");
    if (savedHabits) {
      setHabits(JSON.parse(savedHabits));
    }
  }, []);

  const addHabit = () => {
    if (newHabit.trim() === "") return; // Prevent adding empty habits

    const newHabitObject: Habit = {
      id: habits.length + 1,
      name: newHabit,
      completed: false,
      completionDates: [],
      category: newHabitCategory, // Set the category when adding the habit
    };

    const updatedHabits = [...habits, newHabitObject];
    setHabits(updatedHabits);
    setNewHabit(""); // Reset input
    setNewHabitCategory(""); // Reset input fields
    localStorage.setItem("habits", JSON.stringify(updatedHabits));
  };

  const deleteHabit = (id: number) => {
    const updatedHabits = habits.filter((habit) => habit.id !== id);
    setHabits(updatedHabits);
    localStorage.setItem("habits", JSON.stringify(updatedHabits));
  };

  const toggleHabitCompletion = (id: number) => {
    const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format
    const updatedHabits = habits.map((habit) => {
      if (habit.id === id) {
        const isCompletedToday = habit.completionDates.includes(today);
        let newCompletionDates = [...habit.completionDates];

        if (isCompletedToday) {
          // Remove today's date (unmark completion)
          newCompletionDates = newCompletionDates.filter(
            (date) => date !== today
          );
        } else {
          // Add today's date (mark as completed)
          newCompletionDates.push(today);
        }

        return {
          ...habit,
          completed: !isCompletedToday,
          completionDates: newCompletionDates,
        };
      }
      return habit;
    });

    setHabits(updatedHabits);
    localStorage.setItem("habits", JSON.stringify(updatedHabits));
  };

  const calculateStreak = (completionDates: string[]): number => {
    const today = new Date().toISOString().split("T")[0];
    let streak = 0;

    // Sort the completion dates in descending order
    const sortedDates = completionDates.sort(
      (a, b) => new Date(b).getTime() - new Date(a).getTime()
    );

    // Check consecutive days starting from today
    for (let i = 0; i < sortedDates.length; i++) {
      const date = sortedDates[i];
      const streakDate = new Date();
      streakDate.setDate(new Date(today).getDate() - streak); // Move back one day for each streak day

      if (date === streakDate.toISOString().split("T")[0]) {
        streak++;
      } else {
        break;
      }
    }

    return streak;
  };

  const calculateCompletionRate = (completionDates: string[]): string => {
    const totalDays = completionDates.length;
    const completionRate = (totalDays / new Date().getDate()) * 100;
    return `${completionRate.toFixed(2)}%`;
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Habit Tracker
      </h2>

      {/* Form to add new habits */}
      <div className="mb-6">
        <input
          type="text"
          value={newHabit}
          onChange={(e) => setNewHabit(e.target.value)}
          placeholder="New Habit Name"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          value={newHabitCategory}
          onChange={(e) => setNewHabitCategory(e.target.value)}
          placeholder="Category (e.g., Risk Management)"
          className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={addHabit}
          className="mt-2 w-full bg-blue-600 text-white font-bold py-2 rounded-md hover:bg-blue-700 transition duration-300"
        >
          Add Habit
        </button>
      </div>

      {/* Habit progress visualization */}
      <HabitProgressChart habits={habits} />
      <HabitProgressOverTimeChart habits={habits} />
      {/* Habit Completion Pie Chart */}
      <HabitCompletionPieChart habits={habits} />

      {/* Habit Completion Bar Chart */}
      <HabitCompletionBarChart habits={habits} />
      {selectedHabit && <HabitStreakHeatmap habit={selectedHabit} />}

      {/* List of Habits */}
      <ul className="space-y-4">
        {habits.map((habit) => (
          <li
            key={habit.id}
            className="flex flex-col justify-between items-start p-3 bg-gray-100 rounded-md shadow-sm"
          >
            <div className="flex justify-between items-center w-full">
              <span
                onClick={() => setSelectedHabit(habit)}
                className={habit.completed ? "line-through text-gray-500" : ""}
              >
                {habit.name} ({habit.category})
              </span>

              <button
                onClick={() => toggleHabitCompletion(habit.id)}
                className={`px-4 py-2 rounded-md ${
                  habit.completed ? "bg-green-600" : "bg-red-600"
                } text-white`}
              >
                {habit.completed ? "Completed" : "Mark as Complete"}
              </button>
              <button
                onClick={() => deleteHabit(habit.id)}
                className="px-4 py-2 rounded-md bg-gray-600 text-white hover:bg-gray-700"
              >
                Delete
              </button>
            </div>
            <div className="mt-2">
              <span className="text-sm text-gray-600">
                Streak: {calculateStreak(habit.completionDates)} days
              </span>
              <br />
              <span className="text-sm text-gray-600">
                Completion Rate:{" "}
                {calculateCompletionRate(habit.completionDates)}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HabitTracker;
