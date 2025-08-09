#include "pangram.h"
#include <stddef.h> // For NULL

// The original global alphabet_array and clear_alphabet_array are removed.
// This optimization moves the tracking state to a local variable within `is_pangram`.
// This improves cache locality, removes global mutable state (enhancing thread-safety
// if `is_pangram` were called concurrently), and simplifies the logic by
// eliminating redundant array clearing operations.

bool is_pangram(const char *sentence) {
    if (sentence == NULL) {
        return false;
    }

    // Use a bitmask to efficiently track the presence of each letter.
    // Each bit corresponds to a letter of the alphabet (e.g., bit 0 for 'a', bit 1 for 'b', etc.).
    // An unsigned int can comfortably hold 26 bits.
    unsigned int found_letters_mask = 0;

    // Calculate the target mask where all bits for the alphabet are set.
    // ALPHABET_SIZE is typically 26 for the English alphabet.
    const unsigned int ALL_LETTERS_MASK = (1U << ALPHABET_SIZE) - 1;

    // Iterate through the sentence character by character until the null terminator is reached.
    // This combines the string length determination and character processing into a single pass,
    // reducing CPU cycles and improving data cache utilization.
    for (size_t i = 0; sentence[i] != '\0'; ++i) {
        char chr = sentence[i];

        // Normalize character to lowercase to simplify range checks.
        if (chr >= 'A' && chr <= 'Z') {
            chr += ('a' - 'A');
        }

        // If the character is a lowercase letter, set the corresponding bit in the mask.
        if (chr >= 'a' && chr <= 'z') {
            found_letters_mask |= (1U << (chr - 'a'));
        }

        // Early exit optimization: If all letters have already been found,
        // there's no need to process the rest of the sentence.
        if (found_letters_mask == ALL_LETTERS_MASK) {
            return true;
        }
    }

    // After iterating through the entire sentence, check if all required bits (letters) are set in the mask.
    return found_letters_mask == ALL_LETTERS_MASK;
}