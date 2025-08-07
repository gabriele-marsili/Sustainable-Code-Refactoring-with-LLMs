#include "pangram.h"
#include <ctype.h>  // Required for tolower
#include <stdbool.h> // Required for bool type if not already included by pangram.h

bool is_pangram(const char *sentence)
{
    if (sentence == NULL) {
        return false;
    }

    // A bitmask to efficiently track the presence of each letter from 'a' to 'z'.
    // Each bit corresponds to a letter: bit 0 for 'a', bit 1 for 'b', ..., bit 25 for 'z'.
    // Using an unsigned int minimizes memory usage for the tracker.
    unsigned int found_letters_mask = 0;

    // This constant represents the state where all 26 bits (letters) are set.
    // It's calculated as (2^26 - 1), which is a sequence of 26 ones in binary.
    // Using a constant avoids recalculation and improves readability.
    const unsigned int ALL_LETTERS_MASK = (1U << 26) - 1;

    // Iterate through the input sentence character by character.
    // This single loop replaces the nested loops of the original, reducing complexity from O(N*M) to O(N).
    for (int i = 0; sentence[i] != '\0'; i++) {
        // Convert the character to lowercase.
        // Casting to unsigned char before passing to tolower is a defensive practice
        // to prevent undefined behavior with negative char values (common for signed char types).
        unsigned char c = tolower((unsigned char)sentence[i]);

        // Check if the character is a lowercase English alphabet letter.
        // This avoids processing non-alphabetic characters.
        if (c >= 'a' && c <= 'z') {
            // Calculate the bit position for the current letter.
            // 'a' maps to 0, 'b' to 1, and so on.
            unsigned int bit_pos = c - 'a';

            // Set the corresponding bit in the mask.
            // The |= operator ensures that if the bit is already set, it remains set.
            found_letters_mask |= (1U << bit_pos);

            // Early exit optimization:
            // If the mask now indicates that all 26 letters have been found,
            // we can return true immediately without processing the rest of the sentence.
            // This significantly reduces execution time for long sentences that are pangrams.
            if (found_letters_mask == ALL_LETTERS_MASK) {
                return true;
            }
        }
    }

    // After iterating through the entire sentence, check if all 26 letters were found.
    // If the loop completes without an early exit, this final check determines the result.
    return (found_letters_mask == ALL_LETTERS_MASK);
}