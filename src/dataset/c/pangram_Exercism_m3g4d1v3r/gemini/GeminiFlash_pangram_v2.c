#include "pangram.h"
#include <string.h>  // For strlen if explicitly needed, but not in the optimized version
#include <stdbool.h> // For bool type
#include <ctype.h>   // For tolower

// The global alphabet_array and clear_alphabet_array are removed
// as they introduce state, performance overhead, and thread-safety issues.

// ALPHABET_SIZE is expected to be defined in "pangram.h", typically 26.

bool is_pangram(const char *sentence) {
    if (sentence == NULL) {
        return false;
    }

    // Use a local array on the stack to store found letters.
    // This avoids global state, explicit clearing, and is cache-friendly.
    // Initializing with {false} sets all elements to false (or 0 for char/int arrays).
    bool alphabet_found[ALPHABET_SIZE] = {false};

    // Keep track of the number of unique letters found.
    int letters_found_count = 0;

    // Iterate through the sentence character by character until the null terminator.
    // This avoids an initial full pass with strlen().
    for (size_t i = 0; sentence[i] != '\0'; i++) {
        char current_char = sentence[i];

        // Convert the character to lowercase to handle both 'a'-'z' and 'A'-'Z' uniformly.
        // Cast to unsigned char to avoid potential undefined behavior with negative char values.
        current_char = (char)tolower((unsigned char)current_char);

        // Check if the character is a lowercase alphabet character.
        if (current_char >= 'a' && current_char <= 'z') {
            // Calculate the index (0 for 'a', 1 for 'b', ..., 25 for 'z').
            size_t index = current_char - 'a';

            // If this letter has not been marked as found yet:
            if (!alphabet_found[index]) {
                alphabet_found[index] = true;   // Mark it as found.
                letters_found_count++;          // Increment the count of unique letters.

                // Early exit optimization: If all 26 letters have been found,
                // we know it's a pangram without checking the rest of the sentence.
                if (letters_found_count == ALPHABET_SIZE) {
                    return true;
                }
            }
        }
    }

    // If the loop finishes and not all letters were found, it's not a pangram.
    return false;
}