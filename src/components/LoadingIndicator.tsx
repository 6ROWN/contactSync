import React from "react";

export const LoadingIndicator: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {/* Circular Spinning Loader */}
      <div className="w-16 h-16 border-8 border-t-8 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
      <p className="mt-4 text-lg text-blue-500 font-semibold">Loading...</p>
    </div>
  );
};
