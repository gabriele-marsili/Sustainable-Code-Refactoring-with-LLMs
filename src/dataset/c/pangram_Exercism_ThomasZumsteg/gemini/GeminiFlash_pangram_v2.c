#include "pangram.h"

// Defined constants for clarity and potential re-use.
#define LETTERS 26
// ALL_LETTERS_MASK is a bitmask where all 26 bits (0 through 25) are set.
// This is used for checking if all letters have been found when a bitmask is used.
// (1u << LETTERS) generates a bit with only the 26th bit set (0-indexed).
// Subtracting 1 results in all bits from 0 to 25 being set.
#define ALL_LETTERS_MASK ((1u << LETTERS) - 1)

// letter function:
// Converts an alphabet character to its 0-25 index (e.g., 'a'/'A' -> 0, 'b'/'B' -> 1).
// Returns -1 if the character is not an English alphabet letter.
// This version is optimized to leverage ASCII character properties for speed.
int letter(char c) {
    // This technique converts uppercase letters to lowercase without branching
    // and leaves lowercase letters unchanged, assuming ASCII.
    // 'A' (0x41) | 0x20 = 'a' (0x61)
    // 'a' (0x61) | 0x20 = 'a' (0x61)
    char lower_c = c | 32;

    // Check if the character (now lowercase) falls within the 'a' to 'z' range.
    if (lower_c >= 'a' && lower_c <= 'z') {
        return lower_c - 'a'; // Calculate the 0-based index.
    }
    return -1; // Not an English alphabet character.
}

// is_pangram function:
// Determines if the given string is a pangram (contains every letter of the alphabet at least once).
// This version is optimized for performance and resource consumption.
int is_pangram(const char *words) {
    // Handle NULL input string as per original functionality.
    if (words == NULL) {
        return 0;
    }

    // Use an unsigned integer as a bitmask to efficiently track which letters have been found.
    // Each bit represents a letter (e.g., bit 0 for 'a', bit 1 for 'b', ..., bit 25 for 'z').
    unsigned int found_letters_mask = 0;

    // Keep a count of unique letters found. This enables early exit optimization.
    int unique_letters_count = 0;

    // Iterate through the input string character by character until the null terminator is reached.
    for (const char *p = words; *p; p++) {
        // Get the 0-25 index for the current character using the optimized 'letter' function.
        int l = letter(*p);

        // If 'l' is a valid letter index (0 to 25).
        if (l >= 0) {
            // Calculate the bit corresponding to the current letter.
            // (1u << l) creates an integer with only the 'l'-th bit set.
            unsigned int current_bit = (1u << l);

            // Check if this specific letter's bit is NOT already set in our mask.
            // This avoids redundant operations if the letter has already been processed.
            if (!(found_letters_mask & current_bit)) {
                found_letters_mask |= current_bit; // Set the bit for the newly found letter.
                unique_letters_count++;            // Increment the count of unique letters found.

                // If we have found all 26 unique letters, we can immediately return 1 (true).
                // This is a significant optimization for long strings that are pangrams,
                // as it avoids processing the remainder of the string.
                if (unique_letters_count == LETTERS) {
                    return 1;
                }
            }
        }
    }

    // After iterating through the entire string, return 1 if all 26 unique letters were found
    // (i.e., unique_letters_count reached LETTERS), otherwise return 0.
    return unique_letters_count == LETTERS;
}