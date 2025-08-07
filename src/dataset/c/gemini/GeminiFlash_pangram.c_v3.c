#include "pangram.h"
#include <ctype.h> // For tolower

bool is_pangram(const char *sentence)
{
    // Handle NULL sentence input as per original functionality.
    if (sentence == NULL) {
        return false;
    }

    // Use a bitmask to efficiently track found letters.
    // Each bit from 0 to 25 will represent a letter from 'a' to 'z'.
    unsigned int found_letters_mask = 0;

    // A constant mask representing all 26 lowercase English letters set.
    // (1U << 26) results in a 1 at bit position 26. Subtracting 1 sets all bits from 0 to 25.
    const unsigned int ALL_LETTERS_MASK = (1U << 26) - 1;

    // Iterate through the sentence once.
    // This reduces complexity from O(N*M) to O(N), where N is sentence length and M is alphabet size.
    for (int i = 0; sentence[i] != '\0'; ++i) {
        char c = sentence[i];
        
        // Convert the character to lowercase.
        // Cast to unsigned char to avoid potential issues with negative char values and EOF handling.
        c = (char)tolower((unsigned char)c);

        // Check if the character is a lowercase English letter.
        if (c >= 'a' && c <= 'z') {
            // Calculate the bit position (0 for 'a', 1 for 'b', ..., 25 for 'z').
            // Set the corresponding bit in the mask.
            found_letters_mask |= (1U << (c - 'a'));

            // Early exit optimization: If all 26 letters have been found,
            // we can stop processing the rest of the sentence immediately.
            if (found_letters_mask == ALL_LETTERS_MASK) {
                return true;
            }
        }
    }

    // After iterating through the entire sentence, check if all 26 bits
    // corresponding to 'a' through 'z' are set in the mask.
    return (found_letters_mask == ALL_LETTERS_MASK);
}