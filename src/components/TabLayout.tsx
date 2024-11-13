import { useState } from "react";
import { FaThLarge, FaList } from "react-icons/fa";
import { ContactCard } from "./ContactCard";
import SearchBar from "./SearchBar";

const TabLayout = () => {
  const [isGridView, setIsGridView] = useState(true);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      {/* Tab navigation */}
      <div className="flex justify-between items-center">
        <div className="flex justify-start p-1 bg-gray-200 rounded-md w-fit mb-6">
          <button
            onClick={() => setIsGridView(true)}
            className={`px-4 py-2 flex items-center space-x-2 ${
              isGridView
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            } rounded-md`}
          >
            <FaThLarge />
            <span>Grid View</span>
          </button>
          <button
            onClick={() => setIsGridView(false)}
            className={`px-4 py-2 flex items-center space-x-2 ${
              !isGridView
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            } rounded-md`}
          >
            <FaList />
            <span>List View</span>
          </button>
        </div>
        <SearchBar
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search contacts..."
        />
      </div>

      <ContactCard isGridView={isGridView} searchTerm={searchTerm} />
    </>
  );
};

export default TabLayout;
