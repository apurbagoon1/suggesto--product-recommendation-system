import React from "react";
import { FaSpinner } from "react-icons/fa";

const Loading = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white dark:bg-gray-900 text-orange-500">
      <FaSpinner className="animate-spin text-5xl mb-4" />
      <p className="text-lg font-semibold">Loading, please wait...</p>
    </div>
  );
};

export default Loading;
