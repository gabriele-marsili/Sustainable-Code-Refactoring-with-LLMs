#include "pangram.h"

// Include necessary standard headers for bool, ctype functions, and NULL
#include <stdbool.h>
#include <ctype.h>
#include <stddef.h> // Required for NULL

bool is_pangram(const char *sentence)
{
    // Handle NULL sentence case as per original behavior.
    if (sentence == NULL) {
        return false;
    }

    // Use a boolean array to efficiently track which letters of the alphabet have been seen.
    // The size is 26 for 'a' through 'z'.
    // Initialize all elements to false.
    bool seen_letters[26] = {false};

    // Counter for the number of unique alphabet letters found.
    int unique_letter_count = 0;

    // Iterate through each character of the input sentence.
    // This loop runs once for each character in the sentence, providing O(N) complexity.
    for (int i = 0; sentence[i] != '\0'; i++) {
        // Convert the current character to lowercase.
        // It's good practice to cast to unsigned char before passing to ctype functions
        // to avoid issues with negative char values if char is signed by default.
        char lower_char = tolower((unsigned char)sentence[i]);

        // Check if the character is an English alphabet letter ('a' through 'z').
        if (lower_char >= 'a' && lower_char <= 'z') {
            // Calculate the index for the 'seen_letters' array.
            // 'a' maps to index 0, 'b' to 1, ..., 'z' to 25.
            int index = lower_char - 'a';

            // If this letter has not been marked as seen before:
            if (!seen_letters[index]) {
                // Mark the letter as seen.
                seen_letters[index] = true;
                // Increment the count of unique letters found.
                unique_letter_count++;

                // Optimization: If all 26 unique letters have been found,
                // we can immediately return true without processing the rest of the sentence.
                if (unique_letter_count == 26) {
                    return true;
                }
            }
        }
    }

    // After processing the entire sentence, check if all 26 unique letters were found.
    return (unique_letter_count == 26);
}