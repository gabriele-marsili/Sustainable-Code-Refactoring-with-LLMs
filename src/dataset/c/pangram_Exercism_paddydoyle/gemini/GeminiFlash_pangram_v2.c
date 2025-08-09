#include "pangram.h"

// N_CHARS is assumed to be 26 for the English alphabet.
// If it's defined in "pangram.h", this definition will be ignored.
#ifndef N_CHARS
#define N_CHARS 26
#endif

// Macro to set a specific bit in a mask.
// Using 1U ensures the literal is an unsigned integer, preventing potential issues
// with left-shifting a signed 1 beyond its positive range if N_CHARS were large.
#define SET_BIT(mask, pos) (mask |= (1U << (pos)))


bool is_pangram(const char *sentence) {
    // `mask` will store the presence of each alphabet character (a-z).
    // Each bit from 0 to 25 corresponds to 'a' through 'z'.
    unsigned int mask = 0;

    // `PANGRAM_FULL_MASK` is the target mask representing all 26 alphabet characters being present.
    // (1U << N_CHARS) creates a bit at position N_CHARS (e.g., bit 26 for N_CHARS=26).
    // Subtracting 1 sets all bits from 0 to N_CHARS-1 to 1.
    // This value is pre-calculated once as a constant for efficiency.
    const unsigned int PANGRAM_FULL_MASK = (1U << N_CHARS) - 1;

    // Handle the edge case of a NULL sentence pointer.
    if (sentence == NULL) {
        return false;
    }

    // Iterate through the sentence character by character until the null terminator ('\0').
    // This approach avoids repeated, expensive calls to `strlen()` inside the loop,
    // which was a significant performance bottleneck in the original code.
    for (const char *ptr = sentence; *ptr != '\0'; ++ptr) {
        char c = *ptr; // Get the current character.
        unsigned int char_idx; // Will store the 0-25 index for the character.

        // Optimized character processing:
        // Instead of using locale-dependent and potentially slower `isalpha()` and `tolower()`
        // functions, directly check ASCII ranges for 'a'-'z' and 'A'-'Z'. This assumes a
        // standard English alphabet and provides significant performance and energy improvements
        // by avoiding function call overhead and complex locale logic.
        if (c >= 'a' && c <= 'z') {
            char_idx = (unsigned int)(c - 'a'); // Character is already lowercase.
        } else if (c >= 'A' && c <= 'Z') {
            char_idx = (unsigned int)(c - 'A'); // Convert uppercase to 0-25 index.
        } else {
            // If the character is not an English alphabet letter, skip it.
            continue;
        }

        // Mark the corresponding bit in the mask to indicate this character has been found.
        // If the bit is already set, the bitwise OR operation (`|=`) has no effect,
        // which makes the previous `GET_BIT` check (present in the original code) redundant.
        // Removing that check reduces branching and improves instruction cache efficiency.
        SET_BIT(mask, char_idx);

        // Early exit optimization:
        // If `mask` now contains all 26 unique alphabet characters (i.e., it equals
        // `PANGRAM_FULL_MASK`), there's no need to process the rest of the sentence.
        // Return `true` immediately, saving CPU cycles and energy.
        if (mask == PANGRAM_FULL_MASK) {
            return true;
        }
    }

    // After iterating through the entire sentence, perform the final check:
    // Return true if `mask` (the set of found characters) matches `PANGRAM_FULL_MASK`
    // (all 26 alphabet characters). Otherwise, return false.
    return mask == PANGRAM_FULL_MASK;
}