#include <string>    // For std::string
#include <cctype>    // For std::isalpha, std::tolower

// The original pangram.h is assumed to provide the declaration for is_pangram.
// No other standard library headers are strictly necessary for the optimized
// implementation, thus reducing dependencies where possible.
#include "pangram.h" 

namespace pangram {

    bool is_pangram(std::string text) {
        // Use an unsigned integer as a bitmask to efficiently track the presence
        // of each letter of the English alphabet ('a' through 'z').
        // Each bit corresponds to a letter: bit 0 for 'a', bit 1 for 'b', ..., bit 25 for 'z'.
        unsigned int alphabet_mask = 0;

        // The target mask value when all 26 letters have been found.
        // This is (2^26 - 1), represented as 26 set bits.
        // Using 1U ensures the literal is unsigned.
        const unsigned int FULL_ALPHABET_MASK = (1U << 26) - 1;

        // Iterate over each character in the input string.
        // Using a range-based for loop is clean and efficient.
        for (char c : text) {
            // Convert the character to unsigned char before passing to cctype functions
            // like std::isalpha and std::tolower. This prevents potential issues
            // with negative char values if char is signed by default.
            unsigned char uc = static_cast<unsigned char>(c);

            // Check if the character is an alphabetic letter.
            if (std::isalpha(uc)) {
                // Convert the character to its lowercase equivalent.
                // This handles both uppercase and lowercase letters correctly.
                char lower_c = static_cast<char>(std::tolower(uc));

                // Ensure the lowercase character is within the 'a'-'z' range.
                // This accounts for standard English alphabet letters and avoids
                // mapping non-ASCII alphabetic characters (if any) to bits.
                if (lower_c >= 'a' && lower_c <= 'z') {
                    // Calculate the bit position (0-25) for the current letter.
                    // Set the corresponding bit in the alphabet_mask using a bitwise OR.
                    alphabet_mask |= (1U << (lower_c - 'a'));

                    // Early exit optimization: If all 26 bits are set, it means
                    // all letters of the alphabet have been found. We can immediately
                    // return true without processing the rest of the string.
                    // This significantly improves performance for long strings that are pangrams.
                    if (alphabet_mask == FULL_ALPHABET_MASK) {
                        return true;
                    }
                }
            }
        }

        // If the loop completes without an early exit, it means we've processed
        // all characters. Return true only if the final alphabet_mask contains
        // all 26 bits, indicating all letters were found. Otherwise, return false.
        return alphabet_mask == FULL_ALPHABET_MASK;
    }
}