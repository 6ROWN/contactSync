import React, { useState } from "react";
import { FaThLarge, FaList } from "react-icons/fa";
import { ContactCard } from "./ContactCard";

const TabLayout = () => {
  const [isGridView, setIsGridView] = useState(true);

  return (
    <div className="">
      {/* Tab navigation */}
      <div className="flex justify-start p-1 bg-gray-200 rounded-md w-fit mb-6">
        <button
          onClick={() => setIsGridView(true)}
          className={`px-4 py-2 flex items-center space-x-2 ${
            isGridView ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
          } rounded-md`}
        >
          <FaThLarge />
          <span>Grid View</span>
        </button>
        <button
          onClick={() => setIsGridView(false)}
          className={`px-4 py-2 flex items-center space-x-2 ${
            !isGridView ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
          } rounded-md`}
        >
          <FaList />
          <span>List View</span>
        </button>
      </div>

      <ContactCard isGridView={isGridView} />
    </div>
  );
};

export default TabLayout;
