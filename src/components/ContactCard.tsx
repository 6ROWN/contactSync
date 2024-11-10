// ContactCard.js
import React from "react";
import { Contact } from "./TabLayout";

interface ContactCardProps {
  contact: Contact; // Define 'contact' prop type
  isGridView: boolean; // Define 'isGridView' prop type
}

const ContactCard: React.FC<ContactCardProps> = ({ contact, isGridView }) => {
  return (
    <div
      className={`${
        isGridView
          ? "bg-gray-100 p-4 rounded-lg shadow-sm"
          : "flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow-sm"
      }`}
    >
      <div>
        <h2 className="text-xl font-medium">{contact.name}</h2>
        <p className="text-gray-600">{contact.email}</p>
      </div>
      {/* If in list view, show actions */}
      {!isGridView && (
        <div className="flex space-x-2">
          <button className="text-blue-500 hover:underline">Edit</button>
          <button className="text-red-500 hover:underline">Delete</button>
        </div>
      )}
    </div>
  );
};

export default ContactCard;
