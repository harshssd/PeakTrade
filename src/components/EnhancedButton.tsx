import React from "react";
import { Link } from "react-router-dom";

interface ButtonProps {
  label: string;
  onClick?: () => void;
  to?: string; // Optional navigation route
}

const EnhancedButton: React.FC<ButtonProps> = ({ label, onClick, to }) => {
  const buttonClasses =
    "px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg shadow-md hover:from-purple-600 hover:to-blue-500 transition-colors duration-300";

  if (to) {
    return (
      <Link to={to} className={buttonClasses}>
        {label}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={buttonClasses}>
      {label}
    </button>
  );
};

export default EnhancedButton;
