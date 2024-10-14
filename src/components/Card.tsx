import React from "react";

interface CardProps {
  title: string;
  value: string | number;
  children?: React.ReactNode;
  className?: string; // Allow for additional styles from parent
}

const Card: React.FC<CardProps> = ({ title, value, children, className }) => {
  return (
    <div
      className={`p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg transform hover:scale-105 border-l-4 border-blue-400 ${className}`}
    >
      <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200">
        {title}
      </h3>
      <p className="text-base font-medium text-gray-700 dark:text-gray-300 mt-1">
        {value}
      </p>
      {children && (
        <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          {children}
        </div>
      )}
    </div>
  );
};

export default Card;
