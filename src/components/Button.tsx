import React from "react";

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode; // Text or elements inside the button
  color?: string; // Optional color prop
  className?: string; // Optional additional styling
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  color = "blue",
  className,
}) => {
  const buttonColor = {
    blue: "bg-blue-600 hover:bg-blue-700 focus:ring-blue-300 dark:focus:ring-blue-500",
    green:
      "bg-green-600 hover:bg-green-700 focus:ring-green-300 dark:focus:ring-green-500",
    red: "bg-red-600 hover:bg-red-700 focus:ring-red-300 dark:focus:ring-red-500",
    // Add more color options as needed
  };

  return (
    <button
      onClick={onClick}
      className={`w-full p-3 rounded-md border-2 border-gray-300 dark:border-gray-600 text-white font-semibold focus:outline-none focus:ring-4 transition-all duration-200 ${
        buttonColor[color] || buttonColor.blue
      } ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
