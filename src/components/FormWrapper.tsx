import React from "react";

interface FormWrapperProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const FormWrapper: React.FC<FormWrapperProps> = ({
  title,
  children,
  className,
}) => {
  return (
    <div
      className={`max-w-md mx-auto p-8 bg-gradient-to-b from-gray-100 to-gray-300 dark:from-gray-800 dark:to-gray-900 rounded-lg shadow-lg ${className}`}
    >
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100">
        {title}
      </h2>
      {children}
    </div>
  );
};

export default FormWrapper;
