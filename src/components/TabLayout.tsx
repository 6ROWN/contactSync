import React, { useState } from "react";
import { FaTh, FaList } from "react-icons/fa";
import ContactCard from "./ContactCard"; // Import the ContactCard component

export interface Contact {
  id: number;
  name: string;
  email: string;
}

const TabLayout = () => {
  const [isGridView, setIsGridView] = useState(true); // State to track which layout is selected

  // Sample contacts data
  const contacts: Contact[] = [
    { id: 1, name: "John Doe", email: "john.doe@example.com" },
    { id: 2, name: "Jane Smith", email: "jane.smith@example.com" },
    { id: 3, name: "Mary Johnson", email: "mary.johnson@example.com" },
    { id: 4, name: "Jake White", email: "jake.white@example.com" },
    { id: 5, name: "Emma Stone", email: "emma.stone@example.com" },
    { id: 6, name: "Liam Neeson", email: "liam.neeson@example.com" },
  ];

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
          <FaTh />
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

      {/* Display contacts based on the selected layout */}
      <div
        className={
          isGridView
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            : "space-y-4"
        }
      >
        {contacts.map((contact) => (
          <ContactCard
            key={contact.id}
            contact={contact}
            isGridView={isGridView}
          />
        ))}
      </div>
    </div>
  );
};

export default TabLayout;
