import React, { useState, useEffect } from "react";
import { db } from "../config/firebase";
import { collection, getDocs } from "firebase/firestore"; // Firestore methods
import { GridContactCardItem } from "./GridContactCardItem";
import { ListContactCardItem } from "./ListContactCardItem";
import { LoadingIndicator } from "./LoadingIndicator";

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

interface ContactCardProps {
  isGridView: boolean;
}

export const ContactCard: React.FC<ContactCardProps> = ({ isGridView }) => {
  const [contacts, setContacts] = useState<Contact[] | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "contacts"));
        const contactsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Contact[];

        setContacts(contactsData);
      } catch (error) {
        console.error("Error fetching contacts: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  if (loading) {
    return <LoadingIndicator />;
  }

  return (
    <div className="px-4 py-6">
      <div
        className={
          isGridView
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            : "space-y-4"
        }
      >
        {isGridView ? (
          contacts?.map((contact) => (
            <GridContactCardItem key={contact.id} contact={contact} />
          ))
        ) : (
          <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="p-4 text-left">Profile</th>
                  <th className="p-4 text-left">Name</th>
                  <th className="p-4 text-left">Email</th>
                  <th className="p-4 text-left">Phone</th>
                  <th className="p-4 text-left">Company</th>
                  <th className="p-4 text-left">Address</th>
                  <th className="p-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {contacts?.map((contact) => (
                  <ListContactCardItem key={contact.id} contact={contact} />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
