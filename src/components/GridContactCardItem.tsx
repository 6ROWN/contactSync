import React from "react";
import { TfiMoreAlt } from "react-icons/tfi";
import generateInitials from "../lib/generateInitials";
import { CiMail } from "react-icons/ci";
import { MdOutlineLocalPhone } from "react-icons/md";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { formatPhoneNumber } from "../lib/formatPhoneNumber";

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

interface GridContactCardItemProps {
  contact: Contact;
}

export const GridContactCardItem: React.FC<GridContactCardItemProps> = ({
  contact,
}) => {
  return (
    <div className="bg-slate-50 border bottom-1 p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="flex flex-col">
        <div className="flex items-center justify-between w-full">
          <div className="flex space-x-4">
            {/* If photo exists, show it; else, show initials */}
            {contact.photo ? (
              <img
                src={contact.photo}
                loading="lazy"
                alt={`${contact.firstName} ${contact.lastName}`}
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-white font-medium">
                {generateInitials({
                  firstName: contact.firstName,
                  lastName: contact.lastName,
                })}
              </div>
            )}

            <div>
              <h2 className="text-base font-medium">{`${contact.firstName} ${contact.lastName}`}</h2>
              <h6 className="text-xs text-gray-500">
                {new Date(contact.birthday).toDateString()}
              </h6>
            </div>
          </div>

          <div>
            <TfiMoreAlt />
          </div>
        </div>
        <hr className="w-full border-t border-gray-300 my-4" />
        <div className="flex flex-col space-y-4">
          <div className="flex space-x-4 ">
            <CiMail size={24} />
            <h3 className="">{contact?.email}</h3>
          </div>
          <div className="flex space-x-4 ">
            <MdOutlineLocalPhone size={24} />
            <h3 className="">{formatPhoneNumber(contact?.phone)}</h3>
          </div>
          <div className="flex space-x-4 ">
            <HiOutlineBuildingOffice2 size={24} />

            <h3 className="">{contact?.company}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};
