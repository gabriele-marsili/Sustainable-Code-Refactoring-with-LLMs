#include "pangram.h"
#include <ctype.h> // Required for tolower

bool is_pangram(const char *sentence)
{
    // Handle NULL sentence edge case as in the original implementation.
    if (sentence == NULL) {
        return false;
    }

    // Use a bitset (represented by an unsigned int) to efficiently track seen letters.
    // Each bit corresponds to a letter of the English alphabet (a-z).
    // For example, bit 0 represents 'a', bit 1 represents 'b', ..., bit 25 represents 'z'.
    unsigned int seen_letters = 0; // Initialize all bits to 0 (no letters seen yet).

    // We need to find 26 unique letters to confirm it's a pangram.
    int found_count = 0;

    // Iterate through the sentence character by character until the null terminator is found.
    for (int i = 0; sentence[i] != '\0'; i++) {
        // Convert the current character to lowercase.
        // Cast to unsigned char before passing to tolower to avoid potential issues
        // with signed char values outside the EOF/unsigned char range.
        unsigned char current_char_lower = tolower((unsigned char)sentence[i]);

        // Check if the character is a lowercase English alphabet letter ('a' through 'z').
        if (current_char_lower >= 'a' && current_char_lower <= 'z') {
            // Calculate the corresponding bit position (0-25) for the current letter.
            unsigned int bit_pos = current_char_lower - 'a';

            // Check if this letter's bit is NOT already set in our bitset.
            // If the bit is not set, it means we haven't encountered this unique letter yet.
            if (!((seen_letters >> bit_pos) & 1)) {
                // Set the bit for this letter to mark it as seen.
                seen_letters |= (1 << bit_pos);
                found_count++; // Increment the count of unique letters found.

                // Optimization: If all 26 letters have been found, we can stop early
                // and return true, as it's definitely a pangram.
                if (found_count == 26) {
                    return true;
                }
            }
        }
    }

    // After iterating through the entire sentence, return true if exactly 26 unique
    // letters were found, otherwise return false.
    return found_count == 26;
}