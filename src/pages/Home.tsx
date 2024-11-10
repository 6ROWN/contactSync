import { Link } from "react-router-dom";
import TabLayout from "../components/TabLayout";

const Home = () => {
  return (
    <div className="max-w-7xl w-full mx-auto p-4">
      <div className="flex justify-between my-6">
        <div>
          <h1 className="text-2xl font-semibold text-left mb-4">
            Your Contacts
          </h1>
          <h2 className="text-base font-light text-left ">
            List of people or organization to communicate with
          </h2>
        </div>
        <Link to="/add-contact">
          <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            Add New Contact
          </button>
        </Link>
      </div>
      <TabLayout />
    </div>
  );
};

export default Home;
