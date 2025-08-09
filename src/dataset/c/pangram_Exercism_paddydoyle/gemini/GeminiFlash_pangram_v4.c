#include "pangram.h"

#include <ctype.h>
#include <string.h> // Kept for consistency with original includes, though strlen is no longer used.

#define N_CHARS 26

// Precompute the full mask representing all 26 alphabet characters.
// (1U << N_CHARS) creates a mask with the 27th bit (index 26) set.
// Subtracting 1 from it sets all bits from 0 to 25 to 1.
#define PANGRAM_FULL_MASK ((1U << N_CHARS) - 1U)

#define SET_BIT(mask, pos) (mask |= (1 << (pos)))
#define GET_BIT(mask, pos) ((mask >> (pos)) & 1)


bool is_pangram(const char *sentence) {
    // Test for edge case.
    if (sentence == NULL) {
        return false;
    }

    unsigned int mask = 0; // Bitmask to track encountered letters.

    // Iterate through the sentence using a pointer for improved performance.
    // This avoids repeated calls to strlen(), reducing complexity from O(L^2) to O(L).
    for (const char *p = sentence; *p != '\0'; ++p) {
        // Convert the character to lowercase.
        // Casting to unsigned char is crucial for ctype.h functions to avoid
        // undefined behavior with negative char values.
        char c_lower = tolower((unsigned char)*p);

        // Check if the character is a lowercase alphabet character.
        // This implicitly handles non-alphabetic characters (which tolower would
        // typically return unchanged if they are not uppercase letters)
        // without needing a separate isalpha() call.
        if (c_lower >= 'a' && c_lower <= 'z') {
            // Set the corresponding bit in the mask.
            // No need to check if the bit is already set, as 'OR'ing with 1 has no effect
            // if the bit is already 1.
            SET_BIT(mask, c_lower - 'a');

            // Early exit optimization: If all 26 alphabet characters have been found,
            // we can immediately return true, saving further iterations.
            if (mask == PANGRAM_FULL_MASK) {
                return true;
            }
        }
    }

    // After iterating through the entire string, check if the collected mask
    // matches the full pangram mask (meaning all 26 unique alphabet characters were found).
    return mask == PANGRAM_FULL_MASK;
}