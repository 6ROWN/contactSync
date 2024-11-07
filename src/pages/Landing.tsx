import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-extrabold mb-4">Welcome to ContactSync</h1>
          <p className="text-xl mb-8">Manage your contacts seamlessly with ContactSync - the easiest way to stay connected with your network.</p>
          <div className="space-x-4">
            <Link to="/signup">
              <button className="bg-blue-500 px-6 py-3 text-white text-lg font-semibold rounded-lg hover:bg-blue-400 transition duration-300">
                Sign Up
              </button>
            </Link>
            <Link to="/login">
              <button className="bg-transparent border-2 border-white px-6 py-3 text-white text-lg font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition duration-300">
                Login
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-8">Why Choose ContactSync?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-4">Organize Contacts</h3>
              <p>Effortlessly manage all your contacts in one place. Add, edit, or delete contacts with ease.</p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-4">Sync Across Devices</h3>
              <p>Your contacts are always up to date across all your devices. Never lose touch again.</p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-4">Secure & Private</h3>
              <p>We prioritize your privacy. Your data is encrypted and never shared with anyone without your consent.</p>
            </div>
          </div>
        </div>
      </section>

      
    </div>
  );
};

export default Landing;
