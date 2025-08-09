#include "pangram.h"
#include <ctype.h>
#include <string.h>

// The original 'letter' function is retained as its behavior is part of the original interface,
// and its performance impact on a single character is generally minimal compared to string traversal.
// It correctly identifies alphabet characters and returns their 0-25 index (case-insensitive)
// or -1 for non-alphabet characters.
int letter(char c) {
    if((c < 'a' || 'z' < c) && (c < 'A' || 'Z' < c)) return -1;
    return tolower(c) - 'a';
}

// Define a bitmask representing all 26 letters being found.
// (1U << 26) creates a bit at position 26. Subtracting 1 sets all bits from 0 to 25.
#define ALL_LETTERS_MASK ((1U << 26) - 1)

int is_pangram(const char *words) {
    // Handle NULL input gracefully, as per original behavior.
    if (words == NULL) {
        return 0;
    }

    // Use a single unsigned integer as a bitmask to track the presence of each letter.
    // This significantly reduces memory usage (from 26 ints to 1 unsigned int)
    // and improves CPU cache efficiency.
    unsigned int found_letters_mask = 0;

    // Iterate through the input string character by character.
    // The loop terminates when the null terminator ('\0') is encountered.
    for (const char *p = words; *p; ++p) {
        // Get the 0-indexed position of the letter (0-25) or -1 if not a letter.
        int l = letter(*p);

        // If 'l' is a valid letter index (0-25):
        if (l >= 0) {
            // Set the corresponding bit in the mask to indicate that this letter has been found.
            // Using 1U for the shift ensures the literal is unsigned.
            found_letters_mask |= (1U << l);

            // Early exit optimization:
            // If all 26 bits are set (meaning all letters have been found),
            // we can immediately return 1 without processing the rest of the string.
            // This significantly improves performance for long strings that are pangrams.
            if (found_letters_mask == ALL_LETTERS_MASK) {
                return 1;
            }
        }
    }

    // After iterating through the entire string, check if the mask contains all 26 bits set.
    // If it does, the string is a pangram; otherwise, it is not.
    // This replaces the second loop from the original implementation.
    return (found_letters_mask == ALL_LETTERS_MASK);
}