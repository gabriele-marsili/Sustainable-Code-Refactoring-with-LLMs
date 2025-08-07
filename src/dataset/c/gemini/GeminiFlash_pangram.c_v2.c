#include "pangram.h"
#include <ctype.h>   // For tolower()
#include <stddef.h>  // For NULL

bool is_pangram(const char *sentence)
{
    if (sentence == NULL) {
        return false;
    }

    // A bitmask to efficiently track the presence of each letter from 'a' to 'z'.
    // Each bit represents a letter: bit 0 for 'a', bit 1 for 'b', ..., bit 25 for 'z'.
    unsigned int alphabet_mask = 0;

    // The target mask when all 26 English letters ('a' through 'z') have been found.
    // This is equivalent to setting the first 26 bits to 1: (1 << 26) - 1.
    // In hexadecimal, this value is 0x3FFFFFF.
    const unsigned int ALL_LETTERS_MASK = (1U << 26) - 1;

    // Iterate through the sentence character by character until the null terminator.
    for (int i = 0; sentence[i] != '\0'; i++) {
        // Cast to unsigned char before passing to tolower() to avoid undefined behavior
        // with negative char values if char is signed by default.
        unsigned char c = sentence[i];
        unsigned char lower_c = tolower(c);

        // Check if the character is a lowercase English alphabet letter.
        if (lower_c >= 'a' && lower_c <= 'z') {
            // Calculate the bit position for the current letter (0 for 'a', 1 for 'b', etc.).
            int bit_pos = lower_c - 'a';

            // Set the corresponding bit in the alphabet_mask.
            // Using bitwise OR ensures that if a bit is already set, it remains set.
            alphabet_mask |= (1U << bit_pos);

            // Optimization: If all 26 letters have been found, we can stop early
            // as the sentence is already confirmed to be a pangram.
            if (alphabet_mask == ALL_LETTERS_MASK) {
                return true;
            }
        }
    }

    // After processing the entire sentence, return true if all 26 bits in the mask are set,
    // indicating that every letter of the alphabet was found. Otherwise, return false.
    return (alphabet_mask == ALL_LETTERS_MASK);
}