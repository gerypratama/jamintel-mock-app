export default function capitalizeStr(str) {
  // Split the string by underscores
  let words = str.split("_");

  // Capitalize each word and join with spaces
  let capitalized = words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");

  return capitalized;
}
