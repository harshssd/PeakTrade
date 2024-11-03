import React from "react";

interface MessageProps {
  text: string;
  type: "error" | "success";
}

const Message: React.FC<MessageProps> = ({ text, type }) => {
  const styles =
    type === "error"
      ? "text-red-500 text-sm mb-4 bg-red-100 p-2 rounded dark:bg-red-800 dark:text-red-200"
      : "text-green-500 text-sm mb-4 bg-green-100 p-2 rounded dark:bg-green-800 dark:text-green-200";

  return <p className={styles}>{text}</p>;
};

export default Message;
