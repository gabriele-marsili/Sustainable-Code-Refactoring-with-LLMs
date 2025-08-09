#include <string>    // For std::string
#include <cctype>    // For std::isalpha, std::tolower
#include "pangram.h" // Required header as per original snippet

namespace pangram {

    bool is_pangram(std::string text) {
        // Use an unsigned int as a bitmask to efficiently track found letters.
        // Each bit from 0 to 25 will represent a letter 'a' to 'z'.
        // Bit 0 for 'a', Bit 1 for 'b', ..., Bit 25 for 'z'.
        unsigned int found_letters_mask = 0;

        // The target mask representing all 26 letters found (bits 0-25 set).
        // (1U << 26) creates a number with the 26th bit set (0-indexed), using an unsigned literal.
        // Subtracting 1 sets all bits from 0 to 25 (i.e., 2^26 - 1).
        const unsigned int ALL_LETTERS_MASK = (1U << 26) - 1;

        // Iterate through each character in the input string.
        // A range-based for loop is efficient and readable.
        // No need for a reference (`char& c`) as we are only reading characters.
        for (char c : text) {
            // Check if the character is an alphabetic character.
            if (std::isalpha(c)) {
                // Convert the character to lowercase to ensure case-insensitivity.
                char lower_c = std::tolower(c);

                // Calculate the bit position for the current letter.
                // 'a' corresponds to bit 0, 'b' to bit 1, and so on, up to 'z' at bit 25.
                int bit_pos = lower_c - 'a';
                
                // Set the corresponding bit in the `found_letters_mask`.
                // The bitwise OR operator (`|=`) ensures that if the bit is already set,
                // it remains set; otherwise, it gets set.
                // Use 1U to ensure the shift operation is performed with an unsigned literal.
                found_letters_mask |= (1U << bit_pos);

                // Early exit optimization:
                // If the `found_letters_mask` now matches the `ALL_LETTERS_MASK`,
                // it means all 26 unique letters have been found. We can return true immediately
                // without processing the rest of the string.
                if (found_letters_mask == ALL_LETTERS_MASK) {
                    return true;
                }
            }
        }

        // If the loop completes and we haven't returned yet,
        // it means we have processed the entire string.
        // Return true if `found_letters_mask` matches `ALL_LETTERS_MASK`
        // (i.e., all unique letters were found), otherwise return false.
        return found_letters_mask == ALL_LETTERS_MASK;
    }
}