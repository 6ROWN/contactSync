import React from "react";
import { TfiMoreAlt } from "react-icons/tfi";
import generateInitials from "../lib/generateInitials";

// Define the type for a single contact object
interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  birthday: string;
  company: string;
  notes: string;
  photo: string;
  tags: string;
}

interface ListContactCardItemProps {
  contact: Contact;
}

export const ListContactCardItem: React.FC<ListContactCardItemProps> = ({
  contact,
}) => {
  return (
    <>
      <tr className="border-b hover:bg-gray-50 transition-all">
        <td className="p-4">
          {contact.photo ? (
            <img
              src={contact.photo}
              loading="lazy"
              alt={`${contact.firstName} ${contact.lastName}`}
              className="w-16 h-16 rounded-full object-cover"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center text-white text-2xl font-medium">
              {generateInitials({
                firstName: contact.firstName,
                lastName: contact.lastName,
              })}
            </div>
          )}
        </td>
        <td className="p-4">{`${contact.firstName} ${contact.lastName}`}</td>
        <td className="p-4">{contact.email}</td>
        <td className="p-4">{contact.phone}</td>
        <td className="p-4">{contact.company}</td>
        <td className="p-4">{contact.address}</td>
        <td className="p-4">
          <button className="text-blue-500 hover:text-blue-700">
            <TfiMoreAlt />
          </button>
        </td>
      </tr>
    </>
  );
};
