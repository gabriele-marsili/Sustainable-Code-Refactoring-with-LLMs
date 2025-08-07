#include <string>   // For std::string
#include <cctype>   // For std::isalpha, std::tolower
#include "pangram.h" // Keep original header

namespace pangram {

    bool is_pangram(std::string text) {
        // Use an unsigned int as a bitmask to track seen letters.
        // Each bit from 0 to 25 corresponds to 'a' through 'z'.
        unsigned int seen_letters = 0;

        // The target mask represents all 26 bits set (for 'a' through 'z').
        // (1U << 26) - 1 evaluates to 0b11...1 (26 ones) which is 0x3FFFFFF.
        const unsigned int ALL_LETTERS_MASK = (1U << 26) - 1;

        for (char c : text) {
            if (std::isalpha(c)) {
                // Convert char to lowercase and get its 0-indexed position (0 for 'a', 1 for 'b', etc.)
                unsigned int bit_index = std::tolower(c) - 'a';

                // Ensure the character is within the 'a'-'z' range to avoid out-of-bounds bit_index
                // (Though std::tolower should map 'A'-'Z' to 'a'-'z', and other isalpha chars might map elsewhere)
                // This check implicitly handles cases where tolower might produce values outside 'a'-'z'
                // for non-ASCII alphabetic characters if they were intended to be ignored.
                if (bit_index < 26) {
                    // Set the corresponding bit in the seen_letters mask.
                    seen_letters |= (1U << bit_index);

                    // Early exit: if all 26 letters have been seen, we can stop processing.
                    if (seen_letters == ALL_LETTERS_MASK) {
                        return true;
                    }
                }
            }
        }

        // After checking all characters, return true if all 26 bits are set.
        return seen_letters == ALL_LETTERS_MASK;
    }
}