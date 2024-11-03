import React from "react";

interface InputFieldProps {
  type: string;
  value: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  type,
  value,
  placeholder,
  onChange,
}) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full p-3 mb-2 md:mb-4 border-2 rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-500"
    />
  );
};

export default InputField;
