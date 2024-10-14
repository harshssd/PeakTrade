import React from "react";

interface TimelineSelectorProps {
  onChange: (range: string) => void;
}

const TimelineSelector: React.FC<TimelineSelectorProps> = ({ onChange }) => {
  return (
    <div className="mb-4">
      <label className="font-semibold mb-2 block">Select Time Range:</label>
      <select
        onChange={(e) => onChange(e.target.value)}
        className="block w-full p-2 border rounded-md"
      >
        <option value="all-time">All Time</option>
        <option value="today">Today</option>
        <option value="1w">Last 1 Week</option>
        <option value="1m">Last 1 Month</option>
        <option value="3m">Last 3 Months</option>
        <option value="6m">Last 6 Months</option>
        <option value="1y">Last Year</option>
        <option value="ytd">Year-to-Date (YTD)</option>
      </select>
    </div>
  );
};

export default TimelineSelector;
