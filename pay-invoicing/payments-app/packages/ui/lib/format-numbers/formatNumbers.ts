// takes a raw number and returns a formatted number with commas (eg 30084 -> 30k+)
function formatRawNumberToK(number: number) {
  if (number >= 1000000) {
    return (number / 1000000).toFixed(1).replace(/\.0$/, "") + "M+";
  }
  if (number >= 1000) {
    return (number / 1000).toFixed(1).replace(/\.0$/, "") + "k+";
  }
  return number.toString();
}

// Function to format a raw number into a user friendly with commas (e.g., 10000 to 10,000)
const formatNumberWithCommas = (number: number | string): string => {
  if (number === null || number === undefined) {
    return "";
  }
  // Remove existing commas and convert to string
  const numStr = number.toString().replace(/,/g, "");

  // Check if the string is a valid number
  if (isNaN(Number(numStr.replace(/,/g, "")))) {
    return number.toString(); // Return original string if not a valid number
  }

  // Split into integer and decimal parts
  const parts = numStr.split(".");
  // Format integer part with commas
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  // Join back and return
  return parts.join(".");
};

export { formatRawNumberToK, formatNumberWithCommas };
