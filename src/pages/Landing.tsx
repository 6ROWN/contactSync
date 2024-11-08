import { Link } from "react-router-dom";
import Footer from "../components/footer";
import { FaUser, FaMobileAlt, FaLock } from "react-icons/fa";

const Landing = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <section className="bg-gradient-to-r from-blue-600 to-blue-500 text-white py-20">
        <div className="container mx-auto text-center px-6">
          <h1 className="text-5xl font-extrabold mb-4 leading-tight">
            Welcome to ContactSync
          </h1>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Manage your contacts seamlessly with ContactSync — the easiest way
            to stay connected with your network.
          </p>
          <div className="flex justify-center space-x-6">
            <Link to="/signup">
              <button className="bg-blue-500 px-8 py-3 text-lg font-semibold rounded-lg shadow-md hover:bg-blue-400 transition duration-300">
                Sign Up
              </button>
            </Link>
            <Link to="/login">
              <button className="bg-transparent border-2 border-white px-8 py-3 text-lg font-semibold rounded-lg shadow-md hover:bg-white hover:text-blue-600 transition duration-300">
                Login
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 bg-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-8 text-gray-800">
            Why Choose ContactSync?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition duration-300">
              <div className="flex justify-center mb-4">
                <FaUser className="h-12 w-12 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Organize Contacts
              </h3>
              <p className="text-gray-600">
                Effortlessly manage all your contacts in one place. Add, edit,
                or delete contacts with ease.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition duration-300">
              <div className="flex justify-center mb-4">
                <FaMobileAlt className="h-12 w-12 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Sync Across Devices
              </h3>
              <p className="text-gray-600">
                Your contacts are always up to date across all your devices.
                Never lose touch again.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition duration-300">
              <div className="flex justify-center mb-4">
                <FaLock className="h-12 w-12 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Secure & Private
              </h3>
              <p className="text-gray-600">
                We prioritize your privacy. Your data is encrypted and never
                shared with anyone without your consent.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Landing;
