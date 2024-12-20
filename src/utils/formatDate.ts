export const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp); // Convert seconds to milliseconds if necessary
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const formatEndDate = (timestamp: number): string => {
  const date = new Date(timestamp); // Convert seconds to milliseconds if necessary
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
  });
};

export const formatEndTimeDate = (timestamp: number): string => {
  const date = new Date(timestamp);
  return date.toLocaleString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true, // Use 24-hour format; set to true for 12-hour format with AM/PM
  });
};