// Function to generate initials from first and last name
type InitialsType = {
  firstName: string;
  lastName: string;
};

const generateInitials = ({ firstName, lastName }: InitialsType): string => {
  const firstInitial = firstName ? firstName[0].toUpperCase() : "";
  const lastInitial = lastName ? lastName[0].toUpperCase() : "";
  return `${firstInitial}${lastInitial}`;
};

export default generateInitials;
