public class Pangrams {
    public static boolean isPangram(String words) {
        // A bitmask to keep track of seen alphabet letters.
        // Each bit represents a letter from 'a' to 'z'.
        // For example, bit 0 for 'a', bit 1 for 'b', ..., bit 25 for 'z'.
        int alphabetMask = 0;

        // Counter for the number of unique letters still needed to be found.
        // There are 26 letters in the English alphabet.
        int lettersToFind = 26; 

        // Iterate through each character of the input string.
        // Using charAt(i) avoids creating a new char array from the string,
        // reducing memory allocation and improving performance.
        for (int i = 0; i < words.length(); i++) {
            char ch = words.charAt(i);

            // Convert the character to lowercase.
            // This handles both 'A'-'Z' and 'a'-'z' characters efficiently.
            if (ch >= 'A' && ch <= 'Z') {
                ch = (char) (ch - 'A' + 'a'); // Convert uppercase to lowercase
            }

            // Check if the character is a lowercase English letter.
            if (ch >= 'a' && ch <= 'z') {
                // Calculate the bit index for the current letter (0-25).
                int bitIndex = ch - 'a';

                // Check if the bit for this letter is not already set in the mask.
                // If it's not set, it means we've found a new unique letter.
                if ((alphabetMask & (1 << bitIndex)) == 0) {
                    alphabetMask |= (1 << bitIndex); // Set the bit for this letter
                    lettersToFind--; // Decrement the count of letters we still need

                    // If 'lettersToFind' becomes 0, it means all 26 unique letters
                    // have been found, so we can return true immediately.
                    // This is an early exit optimization for performance.
                    if (lettersToFind == 0) {
                        return true;
                    }
                }
            }
        }

        // After iterating through all characters, if 'lettersToFind' is 0,
        // it means all 26 letters were found. Otherwise, not all were present.
        return lettersToFind == 0;
    }
}