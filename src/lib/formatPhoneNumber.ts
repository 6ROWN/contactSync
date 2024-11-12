// phoneFormatter.ts
export const formatPhoneNumber = (phone: string): string => {
  // Remove any non-numeric characters
  const cleaned = phone.replace(/\D/g, "");

  // Check if it's an international number and format accordingly
  if (cleaned.length === 12) {
    // International format (assuming 12 digits for country code + phone number)
    return `+${cleaned.slice(0, 3)} (${cleaned.slice(3, 6)}) ${cleaned.slice(
      6,
      9
    )}-${cleaned.slice(9)}`;
  }

  // US-based phone format (for 10 digits)
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(
      6
    )}`;
  }

  // Return the raw number if it doesn't match the expected length
  return phone;
};
