export function isPangram(sentence) {
  // Convert the sentence to lowercase and remove leading/trailing whitespace.
  // This ensures case-insensitivity and handles common input variations,
  // preparing the input for efficient character lookup.
  const lowercasedSentence = sentence.trim().toLowerCase();

  // Create a Set of unique characters from the processed sentence.
  // Using a Set provides average O(1) time complexity for checking character existence,
  // which is significantly more efficient than repeated `indexOf` calls (O(N) each)
  // in the original approach, especially for long sentences.
  // This step contributes to reducing CPU cycles and execution time.
  const sentenceChars = new Set(lowercasedSentence);

  // Iterate through all 26 lowercase English alphabet letters from 'a' to 'z'.
  // Using character codes (ASCII 97-122) for iteration is efficient and avoids
  // creating intermediate array/string structures for the alphabet.
  for (let i = 0; i < 26; i++) {
    const charCode = 97 + i; // Calculate the ASCII code for the current letter ('a' through 'z')
    const char = String.fromCharCode(charCode); // Convert the ASCII code back to a character

    // If the current alphabet character is NOT found in our set of sentence characters,
    // then the sentence is not a pangram. We can immediately return false (early exit)
    // as there's no need to check further characters. This early exit minimizes
    // unnecessary computations, further reducing execution time and energy consumption.
    if (!sentenceChars.has(char)) {
      return false;
    }
  }

  // If the loop completes, it means all 26 alphabet letters were found in the sentence.
  // Therefore, the sentence is a pangram.
  return true;
}