#include <stdbool.h>
#include <stddef.h> // For NULL

#define ALL ('z' - 'a' + 1) // Defines the count of letters in the English alphabet (26)

bool is_pangram(const char *sentence)
{
    // Handle NULL or empty string input early to prevent errors and optimize for common edge cases.
    if (sentence == NULL || *sentence == '\0') {
        return false;
    }

    // Use a bitmask to efficiently track found letters.
    // Each bit corresponds to a letter of the alphabet (a=bit 0, b=bit 1, ..., z=bit 25).
    unsigned int seen_letters_mask = 0;

    // Pre-calculate the mask representing all 26 letters found.
    // (1U << ALL) creates a 1 followed by 26 zeros (2^26). Subtracting 1 sets the lowest 26 bits to 1.
    // For ALL=26, this is 0x03FFFFFF. This constant helps in a quick comparison.
    const unsigned int ALL_LETTERS_MASK = (1U << ALL) - 1;

    // Iterate through the sentence character by character until the null terminator is found.
    while (*sentence != '\0') {
        // Cast to unsigned char to avoid potential issues with negative char values
        // when performing comparisons or array indexing, especially with non-ASCII characters.
        unsigned char current_char = (unsigned char)*sentence;

        // Directly check for uppercase and lowercase English alphabet characters.
        // This avoids costly locale-dependent `isalpha` and `tolower` function calls,
        // improving performance and reducing CPU cycles for a fixed alphabet definition.
        if (current_char >= 'a' && current_char <= 'z') {
            // Set the corresponding bit for lowercase letters.
            seen_letters_mask |= (1U << (current_char - 'a'));
        } else if (current_char >= 'A' && current_char <= 'Z') {
            // Set the corresponding bit for uppercase letters.
            seen_letters_mask |= (1U << (current_char - 'A'));
        }

        // Early exit: If all 26 bits in the mask are set, it means all letters have been found.
        // This significantly optimizes performance for pangrams found early in long sentences.
        if (seen_letters_mask == ALL_LETTERS_MASK) {
            return true;
        }

        // Move to the next character in the sentence.
        sentence++;
    }

    // If the loop completes and not all letters were found (i.e., the mask is not full),
    // then the sentence is not a pangram.
    return false;
}