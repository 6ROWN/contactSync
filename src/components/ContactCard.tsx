import React, { useState, useEffect, useCallback } from "react";
import { db } from "../config/firebase";
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  startAfter,
  DocumentSnapshot,
  Timestamp,
} from "firebase/firestore";
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
  createdAt: Timestamp;
}

interface ContactCardProps {
  isGridView: boolean;
  searchTerm: string;
}

export const ContactCard: React.FC<ContactCardProps> = ({
  isGridView,
  searchTerm,
}) => {
  const [contacts, setContacts] = useState<Contact[] | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [lastVisible, setLastVisible] = useState<DocumentSnapshot | null>(null);
  const [hasMore, setHasMore] = useState(true);

  // Memoize fetchContacts with useCallback to avoid re-creating the function on every render
  const fetchContacts = useCallback(
    async (nextPage: boolean = false) => {
      setLoading(true);

      try {
        let q;
        if (nextPage && lastVisible) {
          // For the next page, start after the last visible document
          q = query(
            collection(db, "contacts"),
            orderBy("createdAt", "desc"), // Order by createdAt in descending order
            startAfter(lastVisible), // Start from the last loaded contact
            limit(6) // Limit results per page
          );
        } else {
          // For the first page, get the first 6 documents
          q = query(
            collection(db, "contacts"),
            orderBy("createdAt", "desc"), // Order by createdAt in descending order
            limit(6)
          );
        }

        const querySnapshot = await getDocs(q);
        const contactsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Contact[];

        if (querySnapshot.empty) {
          setHasMore(false);
        } else {
          setContacts((prevContacts) =>
            nextPage ? [...(prevContacts || []), ...contactsData] : contactsData
          );
          setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]); // Set the last document for pagination
        }
      } catch (error) {
        console.error("Error fetching contacts: ", error);
      } finally {
        setLoading(false);
      }
    },
    [lastVisible]
  ); // Only include `lastVisible` as a dependency

  // Fetch contacts when component mounts
  useEffect(() => {
    fetchContacts();
  }, []); // Add `fetchContacts` to the dependency array

  // Filter contacts based on the search term
  const filteredContacts = contacts?.filter((contact) => {
    const fullName = `${contact.firstName ?? ""} ${
      contact.lastName ?? ""
    }`.toLowerCase();
    const email = contact.email?.toLowerCase() ?? "";
    const phone = contact.phone ?? "";

    return (
      fullName.includes(searchTerm.toLowerCase()) ||
      email.includes(searchTerm.toLowerCase()) ||
      phone.includes(searchTerm)
    );
  });

  if (loading) {
    return <LoadingIndicator />;
  }

  if (!contacts || contacts.length === 0) {
    return (
      <div className="my-20 text-center text-gray-600">
        It seems like there are no contacts to show right now. Add some to stay
        connected!
      </div>
    );
  }

  return (
    <div className="px-4 py-6">
      <div
        className={`${
          isGridView
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            : "space-y-4"
        }`}
      >
        {isGridView ? (
          filteredContacts?.map((contact) => (
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
                {filteredContacts?.map((contact) => (
                  <ListContactCardItem key={contact.id} contact={contact} />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-end items-center mt-6">
        <button
          onClick={() => fetchContacts(true)} // Load next page
          disabled={!hasMore}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Load more
        </button>
      </div>
    </div>
  );
};
