import React from "react";
import DarkModeToggle from "../components/DarkModeToggle";

const Settings: React.FC = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Settings</h2>
      <div className="p-4 bg-white shadow-md rounded-lg">
        <DarkModeToggle />
      </div>
    </div>
  );
};

export default Settings;
