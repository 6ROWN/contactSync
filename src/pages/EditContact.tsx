import React, { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { db } from "../config/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input"; // Import PhoneInput and isValidPhoneNumber
import "react-phone-number-input/style.css";
import { useAuth } from "../hooks/useAuth";
import { useLocation } from "react-router-dom";

type ContactFormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string | undefined;
  address: string;
  company: string;
  birthday: string;
  notes: string;
  tags: string;
  photo: string | null;
};

const EditContact: React.FC = () => {
  const { user } = useAuth();
  const { state } = useLocation();
  const { contact } = state || {};

  console.log(contact);

  const [formData, setFormData] = useState<ContactFormData>({
    firstName: contact?.firstName || "",
    lastName: contact?.lastName || "",
    email: contact?.email || "",
    phone: contact?.phone || "",
    address: contact?.address || "",
    company: contact?.company || "",
    birthday: contact?.birthday || "",
    notes: contact?.notes || "",
    tags: contact?.tags || "",
    photo: contact?.photo || null,
  });

  const [errors, setErrors] = useState<Partial<ContactFormData>>({});
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhoneChange = (value: string | undefined) => {
    setFormData((prev) => ({ ...prev, phone: value }));
  };

  const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "contact_images");

      try {
        // Upload the photo to Cloudinary
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/duahxnvcp/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        );

        const data = await response.json();

        if (data.secure_url) {
          setFormData((prev) => ({ ...prev, photo: data.secure_url }));
        }
      } catch (error) {
        console.error("Error uploading photo to Cloudinary:", error);
      }
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<ContactFormData> = {};

    if (!formData.firstName) newErrors.firstName = "First name is required.";
    if (!formData.lastName) newErrors.lastName = "Last name is required.";
    if (!formData.email) newErrors.email = "Email is required.";
    if (!formData.phone) newErrors.phone = "Phone number is required.";
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Please enter a valid email address.";
    if (formData.phone && !isValidPhoneNumber(formData.phone))
      newErrors.phone = "Please enter a valid phone number.";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  console.log(contact);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Ensure contact exists and has a valid ID
    if (!contact || !contact.id) {
      console.error("Contact or contact ID is missing");
      toast.error("Failed to update contact. Contact ID is missing.");
      return; // Early exit if there is no valid contact
    }

    if (validateForm()) {
      try {
        const updatedContact = {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          company: formData.company,
          birthday: formData.birthday,
          notes: formData.notes,
          tags: formData.tags,
          photo: formData.photo || null,
          userId: user?.uid,
        };

        // Update the document only if contact.id exists
        const contactDocRef = doc(db, "contacts", contact.id);
        await updateDoc(contactDocRef, updatedContact);

        // Show success toast using Sonner
        toast.success("Contact updated successfully!");

        // Redirect to the home page after showing the toast
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } catch (error) {
        console.error("Error updating contact:", error);
        toast.error("Failed to update contact.");
      }
    }
  };

  return (
    <div className="h-full flex justify-center items-center bg-gray-100 p-8">
      <div className="p-8 rounded-lg shadow-lg w-full max-w-2xl">
        <h2 className="text-xl font-semibold mb-6 text-center">New Contact</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Photo Upload */}
          <div className="mt-6 flex flex-col items-center justify-center">
            <label htmlFor="photo" className="cursor-pointer">
              <div className="relative w-32 h-32">
                <img
                  src={formData.photo || "src/assets/icons/user.png"}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover border-4 border-gray-200 hover:border-blue-400 transition duration-300"
                />
                <div className="absolute bottom-0 right-1 bg-blue-500 text-white rounded-full p-2 shadow-lg hover:bg-blue-400 transition duration-200">
                  {formData.photo ? (
                    <FiEdit className="w-5 h-5" />
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 4v16m8-8H4" />
                    </svg>
                  )}
                </div>
              </div>
            </label>

            {/* File input */}
            <input
              id="photo"
              name="photo"
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="hidden"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-gray-700">
                First Name
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Enter first name"
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm">{errors.firstName}</p>
              )}
            </div>

            <div>
              <label htmlFor="lastName" className="block text-gray-700">
                Last Name
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Enter last name"
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm">{errors.lastName}</p>
              )}
            </div>
          </div>

          {/* Email Address */}
          <div>
            <label htmlFor="email" className="block text-gray-700">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter email address"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          {/* Phone Number */}
          <div>
            <label htmlFor="phone" className="block text-gray-700">
              Phone Number
            </label>
            <PhoneInput
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handlePhoneChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter phone number"
              defaultCountry="US"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone}</p>
            )}
          </div>

          {/* Address */}
          <div>
            <label htmlFor="address" className="block text-gray-700">
              Address
            </label>
            <input
              id="address"
              name="address"
              type="text"
              value={formData.address}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter address"
            />
          </div>

          {/* Company */}
          <div>
            <label htmlFor="company" className="block text-gray-700">
              Company
            </label>
            <input
              id="company"
              name="company"
              type="text"
              value={formData.company}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter company"
            />
          </div>

          {/* Birthday */}
          <div>
            <label htmlFor="birthday" className="block text-gray-700">
              Birthday
            </label>
            <input
              id="birthday"
              name="birthday"
              type="date"
              value={formData.birthday}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          {/* Notes */}
          <div>
            <label htmlFor="notes" className="block text-gray-700">
              Notes
            </label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter notes"
            />
          </div>

          {/* Tags */}
          <div>
            <label htmlFor="tags" className="block text-gray-700">
              Tags
            </label>
            <input
              id="tags"
              name="tags"
              type="text"
              value={formData.tags}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter tags"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-400 transition duration-300"
          >
            Edit Contact
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditContact;
