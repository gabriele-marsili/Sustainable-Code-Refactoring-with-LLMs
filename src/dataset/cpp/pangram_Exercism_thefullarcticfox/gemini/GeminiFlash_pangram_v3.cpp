#include "pangram.h"
#include <cctype>   // For std::isalpha, std::tolower
#include <bitset>   // For std::bitset
#include <string>   // For std::string

namespace pangram {
    bool is_pangram(const std::string& str) {
        // Use a bitset to efficiently track the presence of each letter (a-z).
        // A bitset of 26 bits is extremely memory-efficient (typically 4 bytes)
        // and offers O(1) access and modification.
        std::bitset<26> letters_found;

        // Keep a count of unique letters found to enable early exit.
        int unique_letter_count = 0;

        for (char ch : str) {
            // It's good practice to cast to unsigned char before passing to
            // cctype functions like std::isalpha and std::tolower. This prevents
            // undefined behavior for char values that might be negative if char is signed.
            unsigned char uc_ch = static_cast<unsigned char>(ch);

            // Check if the character is an alphabetic character.
            if (std::isalpha(uc_ch)) {
                // Convert the character to lowercase. This ensures both 'A' and 'a'
                // map to the same internal representation.
                unsigned char lower_ch = std::tolower(uc_ch);

                // Calculate the index for the bitset. 'a' maps to 0, 'b' to 1, ..., 'z' to 25.
                int index = lower_ch - 'a';

                // Basic bounds check for robustness, though for standard English alphabet
                // and correctly handled cctype functions, this range should be guaranteed.
                if (index >= 0 && index < 26) {
                    // Check if this letter has not been found yet.
                    if (!letters_found.test(index)) {
                        // Mark the letter as found in the bitset.
                        letters_found.set(index);
                        // Increment the count of unique letters.
                        unique_letter_count++;

                        // Early exit optimization: If all 26 letters have been found,
                        // there's no need to process the rest of the string.
                        if (unique_letter_count == 26) {
                            return true;
                        }
                    }
                }
            }
        }

        // After iterating through the entire string, return true only if all 26
        // unique letters were found. This handles cases where the string might
        // be too short or doesn't contain all letters.
        return unique_letter_count == 26;
    }
} // namespace pangram