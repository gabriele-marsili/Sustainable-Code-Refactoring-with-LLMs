function generateHashtag(str) {
  const trimmed = str.trim();
  if (!trimmed) return false;

  const outputString = "#" + trimmed
    .split(/\s+/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");

  return outputString.length > 140 ? false : outputString;
}

export default generateHashtag;