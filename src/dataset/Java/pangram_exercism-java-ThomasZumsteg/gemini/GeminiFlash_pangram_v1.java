public class Pangrams {
    public static boolean isPangram(String words) {
        if (words == null) {
            // A null string cannot be a pangram.
            // The original code would throw a NullPointerException on words.toLowerCase(),
            // so returning false is a more robust and energy-efficient handling of null input,
            // avoiding an exception pathway.
            return false;
        }

        // A bitmask to efficiently track the presence of each letter from 'a' to 'z'.
        // There are 26 letters, so we need 26 bits.
        // Each bit corresponds to a letter: bit 0 for 'a', bit 1 for 'b', ..., bit 25 for 'z'.
        int seenLetters = 0;

        // The target mask when all 26 letters have been found.
        // (1 << 26) - 1 results in a 32-bit integer with the lowest 26 bits set to 1.
        final int ALL_LETTERS_MASK = (1 << 26) - 1;

        // Iterate through the input string character by character.
        // This avoids creating a new String object for `toLowerCase()` of the entire string
        // and also avoids creating a new char array with `toCharArray()`.
        for (int i = 0; i < words.length(); i++) {
            char c = words.charAt(i);

            // Convert character to lowercase if it's an uppercase letter.
            // This is more efficient than calling words.toLowerCase() on the entire string
            // as it avoids a full string transformation and new object allocation.
            if (c >= 'A' && c <= 'Z') {
                c = (char) (c - 'A' + 'a');
            }

            // Check if the character is a lowercase letter ('a' through 'z').
            if (c >= 'a' && c <= 'z') {
                // Calculate the bit position for the current letter (0 for 'a', 1 for 'b', etc.).
                int bitPosition = c - 'a';
                // Set the corresponding bit in the 'seenLetters' mask.
                // The '|=' operator (bitwise OR assignment) ensures that once a bit is set, it remains set.
                seenLetters |= (1 << bitPosition);

                // Early exit optimization: if all 26 bits are set, it means we have found
                // all the required letters, so we can return true immediately without
                // processing the rest of the string. This significantly reduces execution time
                // for long pangram strings.
                if (seenLetters == ALL_LETTERS_MASK) {
                    return true;
                }
            }
        }

        // After iterating through all characters, check if the 'seenLetters' mask
        // matches the 'ALL_LETTERS_MASK'. If they are equal, all letters of the alphabet
        // were present in the string; otherwise, they were not.
        return seenLetters == ALL_LETTERS_MASK;
    }
}