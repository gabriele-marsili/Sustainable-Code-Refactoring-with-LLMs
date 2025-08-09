export const isPangram = (text = "") => {
  const letters = "abcdefghijklmnopqrstuvwxyz";
  const cleanedText = text.toLowerCase().replace(/[^a-z]/g, "");

  // Create a Set of unique characters from the cleaned text.
  // Using a Set allows for O(1) average time complexity for character lookups,
  // significantly improving performance over repeated string searches (e.g., .includes()).
  // This also limits memory usage, as the Set will store at most 26 unique characters.
  const charSet = new Set(cleanedText);

  // Iterate through each letter of the alphabet.
  // This loop will run a maximum of 26 times.
  for (let i = 0; i < letters.length; i++) {
    const char = letters[i];
    // If the current alphabet letter is not found in the unique characters
    // extracted from the text, it's not a pangram.
    // Return false immediately to save further computation and resources (early exit).
    if (!charSet.has(char)) {
      return false;
    }
  }

  // If the loop completes, it means all alphabet letters were found in the text,
  // indicating it is a pangram.
  return true;
};