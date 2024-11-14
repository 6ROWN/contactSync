import React from "react";
import { useNavigate } from "react-router-dom";
const ErrorPage: React.FC = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-50">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-500">Oops!</h1>
        <p className="mt-4 text-lg text-gray-700">
          Something went wrong. The page you are looking for might not exist or
          there was an error.
        </p>
        <div className="mt-6">
          <button
            onClick={goHome}
            className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
          >
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
