#include "pangram.h"
#include <ctype.h>  // For tolower
#include <stddef.h> // For NULL

bool is_pangram(const char *sentence)
{
    // Handle NULL input sentence as per the original behavior.
    if (sentence == NULL) {
        return false;
    }

    // Use a bitmask to efficiently track the presence of each letter from 'a' to 'z'.
    // Each bit in 'found_letters_mask' corresponds to a unique letter.
    // For example, bit 0 for 'a', bit 1 for 'b', ..., bit 25 for 'z'.
    unsigned int found_letters_mask = 0;
    
    // Keep a count of the unique letters found so far.
    // A pangram requires exactly 26 unique letters.
    int unique_letter_count = 0;

    // Iterate through the input sentence character by character until the null terminator is reached.
    for (int i = 0; sentence[i] != '\0'; i++) {
        // Convert the current character to lowercase to ensure case-insensitivity.
        // Cast to unsigned char to prevent issues with negative char values on systems
        // where char is signed by default and sentence[i] might be negative.
        unsigned char c = tolower((unsigned char)sentence[i]);

        // Check if the character is a lowercase English letter.
        if (c >= 'a' && c <= 'z') {
            // Calculate the bit position for the current letter.
            // 'a' maps to bit 0, 'b' to bit 1, ..., 'z' to bit 25.
            int bit_pos = c - 'a';
            
            // Check if this letter has not been found yet by inspecting its corresponding bit
            // in 'found_letters_mask'. If the bit is 0, the letter is new.
            if (!((found_letters_mask >> bit_pos) & 1)) {
                // If the letter is new, set its corresponding bit to 1 using a bitwise OR.
                found_letters_mask |= (1u << bit_pos);
                // Increment the count of unique letters found.
                unique_letter_count++;

                // If all 26 unique letters have been found, we can immediately return true
                // without processing the rest of the sentence. This is a significant optimization
                // for long sentences that are pangrams.
                if (unique_letter_count == 26) {
                    return true;
                }
            }
        }
    }

    // After iterating through the entire sentence, return true if exactly 26 unique letters were found,
    // otherwise return false.
    return unique_letter_count == 26;
}