import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import { db } from "../config/firebase";
import { doc, getDoc, deleteDoc } from "firebase/firestore"; // Firestore methods
import { LoadingIndicator } from "../components/LoadingIndicator";
import { FaUserCircle } from "react-icons/fa"; // Placeholder icon for photo if missing
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { BiChevronLeft } from "react-icons/bi";
import { Contact } from "../types/contact";
import { auth } from "../config/firebase";
import { toast } from "sonner";

const ContactDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [contact, setContact] = useState<Contact | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      return;
    }

    const fetchContact = async () => {
      try {
        const contactDoc = await getDoc(doc(db, "contacts", id));
        if (contactDoc.exists()) {
          const contactData = {
            id: contactDoc.id,
            ...contactDoc.data(),
          } as Contact;
          setContact(contactData);
        } else {
          console.error("Contact not found");
          navigate("/404"); // Redirect to 404 if contact is not found
        }
      } catch (error) {
        console.error("Error fetching contact:", error);
        navigate("/404"); // Redirect to 404 in case of error
      } finally {
        setLoading(false);
      }
    };

    fetchContact();
  }, [id, navigate]);

  if (loading) {
    return <LoadingIndicator />;
  }

  if (!contact) {
    return <div>Contact not found</div>;
  }

  // Handle Edit Contact
  const handleEdit = () => {
    if (contact?.userId === auth?.currentUser?.uid) {
      navigate(`/edit/${contact.id}`, { state: { contact } });
    } else {
      toast.error("User not authorized to edit this post");
    }
  };

  // Handle Delete Contact
  const handleDelete = async () => {
    if (contact?.userId === auth?.currentUser?.uid) {
      const confirmed = window.confirm(
        "Are you sure you want to delete this contact?"
      );
      if (confirmed) {
        try {
          await deleteDoc(doc(db, "contacts", contact.id));
          toast.success(`Contact deleted successfully!`);

          navigate("/");
        } catch (error) {
          toast.error("Error deleting contact. Please try again.");
          console.error(error);
        }
      }
    } else {
      toast.error("User not authorized to delete this post");
    }
  };

  return (
    <div className="relative max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg border border-blue-200 my-12">
      {/* Back Button */}
      <BiChevronLeft
        onClick={() => navigate(-1)}
        className="absolute top-4 left-2 size-8 cursor-pointer text-gray-600"
      />

      <div className="flex flex-col space-y-4 items-center space-x-6 mb-6">
        <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-300">
          {contact.photo ? (
            <img
              src={contact.photo}
              alt={`${contact.firstName} ${contact.lastName}`}
              className="w-full h-full object-cover"
            />
          ) : (
            <FaUserCircle className="w-full h-full text-gray-300" />
          )}
        </div>
        <div>
          <div className="flex items-end space-x-4">
            <h1 className="text-3xl font-semibold text-gray-800">
              {contact.firstName} {contact.lastName}
            </h1>
            <span className="bg-blue-100 rounded-md px-2 text-sm">
              {contact?.tags}
            </span>
          </div>

          <div className="flex items-center justify-center space-x-4 mt-4">
            <HiOutlineBuildingOffice2 size={24} />
            <p className="text-sm text-gray-500">{contact.company}</p>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <span className="font-semibold text-gray-700">Email:</span>
          <p className="text-gray-600">{contact.email}</p>
        </div>
        <div className="flex items-center space-x-4">
          <span className="font-semibold text-gray-700">Phone:</span>
          <p className="text-gray-600">{contact.phone}</p>
        </div>
        <div className="flex items-center space-x-4">
          <span className="font-semibold text-gray-700">Address:</span>
          <p className="text-gray-600">{contact.address}</p>
        </div>
        <div className="flex items-center space-x-4">
          <span className="font-semibold text-gray-700">Birthday:</span>
          <p className="text-gray-600">
            {new Date(contact.birthday).toDateString()}
          </p>
        </div>
        {contact.notes && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold text-gray-800">Notes</h3>
            <p className="text-gray-600">{contact.notes}</p>
          </div>
        )}
      </div>

      {/* Edit and Delete Buttons */}
      <div className="flex justify-between space-x-4 mt-6">
        <button
          onClick={handleEdit}
          className="flex-1 bg-blue-500 hover:bg-blue-400 text-white rounded-md py-2"
        >
          Edit Contact
        </button>
        <button
          onClick={handleDelete}
          className="flex-1 bg-red-500 hover:bg-red-400 text-white rounded-md py-2"
        >
          Delete Contact
        </button>
      </div>
    </div>
  );
};

export default ContactDetailsPage;
