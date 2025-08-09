#include <stdbool.h>
#include <ctype.h>
#include <stddef.h> // Required for NULL

// Defines the number of unique English letters (a-z) to check for.
// This relies on 'a' through 'z' being contiguous in the character set.
#define NUM_LETTERS_IN_ALPHABET ('z' - 'a' + 1) // Typically 26

bool is_pangram(const char *sentence)
{
    // Handle null pointer input gracefully to prevent crashes.
    if (sentence == NULL) {
        return false;
    }

    // Use an unsigned integer as a bitmask to efficiently track which letters
    // have been found. Each bit corresponds to a letter of the alphabet (0-25).
    // This reduces memory consumption (typically 4 bytes for an int vs. 26 bytes for a bool array)
    // and can improve cache performance and execution speed due to CPU-native bitwise operations.
    unsigned int letters_found_mask = 0;

    // A counter for unique letters found. This allows for an early exit
    // once all required letters have been found, avoiding unnecessary
    // further processing of the rest of the string.
    int unique_letter_count = 0;

    // Using unsigned char for `c` is generally safer when interacting with `ctype.h` functions,
    // as `char` can be signed on some systems, leading to negative values for extended ASCII
    // characters that might misbehave with `ctype.h` functions expecting non-negative `int` or `EOF`.
    unsigned char c;

    // Iterate through the sentence character by character until the null terminator is reached.
    while ((c = *sentence) != '\0') {
        // Check if the current character is an alphabetic character.
        if (isalpha(c)) {
            // Convert the character to lowercase and calculate its 0-25 index.
            // This relies on 'a' through 'z' being contiguous in the character set.
            int char_index = tolower(c) - 'a';

            // Check if the bit corresponding to this letter is NOT yet set in the mask.
            // (1U << char_index) creates a mask with only the bit for `char_index` set.
            // If `letters_found_mask` bitwise ANDed with this specific bit-mask is 0,
            // it means the bit (and thus the letter) was not previously set/found.
            if (!(letters_found_mask & (1U << char_index))) {
                // If it's a new unique letter:
                // 1. Set the corresponding bit in the mask.
                letters_found_mask |= (1U << char_index);

                // 2. Increment the unique letter count.
                unique_letter_count++;

                // 3. Check for early exit: if all 26 letters (a-z) are found.
                if (unique_letter_count == NUM_LETTERS_IN_ALPHABET) {
                    return true; // Pangram found! Return immediately.
                }
            }
        }
        sentence++; // Move to the next character in the sentence.
    }

    // If the loop completes and we haven't found all unique letters,
    // then the sentence is not a pangram. This also correctly handles
    // empty strings (`*sentence == '\0'` from the start).
    return false;
}