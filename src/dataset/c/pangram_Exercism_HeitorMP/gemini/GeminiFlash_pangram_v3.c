#include "pangram.h"
#include <stdbool.h> // For bool type
#include <ctype.h>   // For tolower

bool is_pangram(const char *sentence)
{
    // A bitmask to efficiently track the presence of each lowercase English letter.
    // Each bit corresponds to a letter (e.g., bit 0 for 'a', bit 1 for 'b', ..., bit 25 for 'z').
    unsigned int seen_letters_mask = 0;

    // A counter for the number of unique letters found.
    int unique_letter_count = 0;

    // Handle NULL sentence input as per original functionality.
    if (sentence == NULL) {
        return false;
    }

    // Iterate through each character of the sentence.
    // This is a single pass (O(N) complexity) over the input string.
    for (int i = 0; sentence[i] != '\0'; ++i) {
        // Convert the current character to its lowercase equivalent.
        // Casting to unsigned char before passing to tolower() is a common
        // defensive practice to avoid issues with negative char values.
        char current_char_lower = tolower((unsigned char)sentence[i]);

        // Check if the character is a lowercase English alphabet letter ('a' through 'z').
        if (current_char_lower >= 'a' && current_char_lower <= 'z') {
            // Calculate the bit index (0-25) for the current letter.
            // 'a' maps to 0, 'b' to 1, etc.
            int bit_position = current_char_lower - 'a';

            // Create a bit pattern with the relevant bit set.
            unsigned int letter_bit = (1U << bit_position);

            // Check if this letter's bit is NOT already set in our mask.
            // This means we have found a unique letter that we haven't encountered before.
            if (!(seen_letters_mask & letter_bit)) {
                // Set the corresponding bit in the mask to mark this letter as seen.
                seen_letters_mask |= letter_bit;

                // Increment the count of unique letters found.
                unique_letter_count++;

                // Optimization: If we have already found all 26 unique English letters,
                // we can return true immediately without processing the rest of the sentence.
                // This significantly reduces unnecessary computation for long sentences.
                if (unique_letter_count == 26) {
                    return true;
                }
            }
        }
    }

    // After iterating through the entire sentence, return true if all 26 unique
    // letters were found, otherwise return false.
    return unique_letter_count == 26;
}