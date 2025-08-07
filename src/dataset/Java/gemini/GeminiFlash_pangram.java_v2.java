class PangramChecker {

  boolean isPangram(String input) {
    // Convert the input to lowercase once to handle case-insensitivity.
    // This creates a new string, but it's a necessary step and done only once.
    var text = input.toLowerCase();

    // Use an integer as a bitmask to track seen letters.
    // Each bit from 0 to 25 corresponds to a letter 'a' to 'z'.
    // For example, bit 0 represents 'a', bit 1 represents 'b', and so on.
    int seenLettersBitmask = 0; // Initialize with all bits off

    // Iterate through the characters of the lowercase input string.
    // This is a single pass over the string, making it O(N) where N is the length of the input.
    for (int i = 0; i < text.length(); i++) {
      char c = text.charAt(i);

      // Check if the character is a lowercase English letter.
      if (c >= 'a' && c <= 'z') {
        // Calculate the bit position (0 for 'a', 1 for 'b', ..., 25 for 'z').
        int bitPosition = c - 'a';
        // Set the corresponding bit in the bitmask using a bitwise OR operation.
        // This marks the letter as seen.
        seenLettersBitmask |= (1 << bitPosition);
      }
    }

    // After processing the entire string, check if all 26 bits are set in the bitmask.
    // The mask for all 26 letters being present is a sequence of 26 ones (0b00...0111...111).
    // (1 << 26) results in a number with the 26th bit set (0b100...000).
    // Subtracting 1 from it creates a number with the first 26 bits set (0b011...111).
    int allLettersMask = (1 << 26) - 1;

    // If the accumulated bitmask matches the 'all letters seen' mask, it's a pangram.
    // This final check is an O(1) operation.
    return seenLettersBitmask == allLettersMask;
  }

}