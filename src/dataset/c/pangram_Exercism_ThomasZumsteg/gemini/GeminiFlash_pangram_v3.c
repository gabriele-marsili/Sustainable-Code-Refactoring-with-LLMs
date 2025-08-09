#include "pangram.h"
#include <ctype.h>
#include <string.h>

#define LETTERS 26

// Optimized letter function:
// Improves performance by avoiding a `tolower` function call for every character.
// Directly checks character ranges and calculates the index, which can be faster
// due to reduced function call overhead and more direct CPU operations.
int letter(char c) {
    if (c >= 'a' && c <= 'z') {
        return c - 'a';
    }
    if (c >= 'A' && c <= 'Z') {
        return c - 'A';
    }
    return -1; // Not an English letter (a-z)
}

// Optimized is_pangram function:
// - Reduces memory footprint: Uses a single `unsigned int` bitmask (4 bytes)
//   to track seen letters, instead of an array of 26 integers (104 bytes).
//   This significantly improves cache utilization and reduces memory bandwidth.
// - Improves CPU efficiency: Employs bitwise operations, which are very fast.
//   Includes an early exit condition, returning immediately once all 26 unique
//   letters are found. This drastically reduces processing time for long strings
//   that are pangrams, leading to lower energy consumption.
int is_pangram(const char *words) {
    if (words == NULL) {
        return 0; // Preserve original behavior for NULL input
    }

    unsigned int seen_letters_mask = 0; // Bitmask to represent seen letters (0-25)
    int unique_letters_count = 0;      // Counter for how many unique letters found

    // Iterate through the input string character by character
    for (const char *p = words; *p != '\0'; p++) {
        int idx = letter(*p); // Get the 0-25 index for the letter, or -1 if not a letter

        if (idx >= 0) { // Check if the character is a valid English letter (a-z)
            // Create a bitmask for the current letter's position
            unsigned int current_letter_bit = (1U << idx);

            // Check if this specific letter's bit was NOT set previously
            if (!(seen_letters_mask & current_letter_bit)) {
                seen_letters_mask |= current_letter_bit; // Set the bit for this letter as seen
                unique_letters_count++;                  // Increment the count of unique letters found

                // Early exit: If all 26 unique letters have been identified,
                // the string is a pangram, so return true immediately.
                if (unique_letters_count == LETTERS) {
                    return 1;
                }
            }
        }
    }

    // After processing the entire string, check if all 26 unique letters were found.
    // This covers cases where the pangram is completed at the very end of the string
    // or for shorter strings. The mask `(1U << LETTERS) - 1` represents all 26 bits set.
    return (seen_letters_mask == ((1U << LETTERS) - 1));
}