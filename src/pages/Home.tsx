import { Link } from "react-router-dom";

const Home = () => {
  // Sample static contacts data
  const contacts = [
    { id: 1, name: "John Doe", email: "john.doe@example.com" },
    { id: 2, name: "Jane Smith", email: "jane.smith@example.com" },
    { id: 3, name: "Mary Johnson", email: "mary.johnson@example.com" },
  ];

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-6 text-center">Your Contacts</h1>

      {/* Button to add a new contact */}
      <div className="mb-6 flex justify-end">
        <Link to="/add-contact">
          <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            Add New Contact
          </button>
        </Link>
      </div>

      {/* Contacts list */}
      <div className="space-y-4">
        {contacts.map((contact) => (
          <div
            key={contact.id}
            className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow-sm"
          >
            <div>
              <h2 className="text-xl font-medium">{contact.name}</h2>
              <p className="text-gray-600">{contact.email}</p>
            </div>
            <div className="flex space-x-2">
              {/* Links to edit or delete the contact */}
              <Link
                to={`/edit-contact/${contact.id}`}
                className="text-blue-500 hover:underline"
              >
                Edit
              </Link>
              <button className="text-red-500 hover:underline">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
