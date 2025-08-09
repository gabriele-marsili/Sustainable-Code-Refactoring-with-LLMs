public class PangramChecker {

    public boolean isPangram(String input) {
        // Use an integer as a bitmask to track the presence of each letter.
        // Each bit from 0 to 25 represents a letter (a-z).
        int seenLetters = 0;
        final int ALPHABET_SIZE = 26;
        // The mask representing all 26 letters (bits 0-25 set to 1).
        // (1 << 26) creates a number with only the 27th bit set (index 26).
        // Subtracting 1 sets all bits from 0 to 25 to 1.
        final int ALL_LETTERS_MASK = (1 << ALPHABET_SIZE) - 1;

        // Iterate through each character of the input string.
        for (int i = 0; i < input.length(); i++) {
            char c = input.charAt(i);

            if (c >= 'A' && c <= 'Z') {
                // If it's an uppercase letter, calculate its position (0-25)
                // and set the corresponding bit in 'seenLetters'.
                seenLetters |= (1 << (c - 'A'));
            } else if (c >= 'a' && c <= 'z') {
                // If it's a lowercase letter, calculate its position (0-25)
                // and set the corresponding bit in 'seenLetters'.
                seenLetters |= (1 << (c - 'a'));
            }

            // Early exit: If all 26 bits are set in 'seenLetters',
            // it means we have found all letters, so it's a pangram.
            // This avoids unnecessary iterations over the rest of the string.
            if (seenLetters == ALL_LETTERS_MASK) {
                return true;
            }
        }

        // After checking all characters, return true if all 26 bits are set,
        // indicating that every letter of the alphabet was found.
        return seenLetters == ALL_LETTERS_MASK;
    }
}