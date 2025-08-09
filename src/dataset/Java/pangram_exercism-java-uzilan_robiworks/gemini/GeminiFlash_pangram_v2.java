public class PangramChecker {

    public boolean isPangram(String input) {
        // Use a long to represent the 26 letters (a-z).
        // Each bit from 0 to 25 will correspond to a letter.
        // This uses less memory (8 bytes for a long) and allows for very fast bitwise operations,
        // compared to a boolean array (26 booleans + array overhead).
        long seenLetters = 0L;

        // The target value for 'seenLetters' when all 26 letters (a-z) have been found.
        // (1L << 26) creates a long with only the 26th bit set (0-indexed).
        // Subtracting 1 results in all bits from 0 to 25 being set to 1.
        final long ALL_LETTERS_MASK = (1L << 26) - 1;

        // Iterate through each character of the input string.
        for (int i = 0; i < input.length(); i++) {
            char c = input.charAt(i);
            int index;

            // Determine the 0-25 index for the letter, ignoring case.
            if (c >= 'A' && c <= 'Z') {
                index = c - 'A';
            } else if (c >= 'a' && c <= 'z') {
                index = c - 'a';
            } else {
                // If the character is not an English alphabet letter, skip it.
                continue;
            }

            // Set the corresponding bit in 'seenLetters'.
            // Using bitwise OR (|) ensures that once a bit is set, it stays set.
            seenLetters |= (1L << index);

            // Early exit optimization: If all 26 bits are set,
            // we've found all letters, so we can return true immediately
            // without processing the rest of the string.
            if (seenLetters == ALL_LETTERS_MASK) {
                return true;
            }
        }

        // After iterating through the entire string, if the 'seenLetters' mask
        // matches the 'ALL_LETTERS_MASK', then all letters were found.
        return seenLetters == ALL_LETTERS_MASK;
    }
}