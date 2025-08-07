#include <string>   // For std::string
#include <bitset>   // For std::bitset
#include "pangram.h" // Original header, must be included.

namespace pangram {

    bool is_pangram(std::string text) {
        // Use std::bitset for efficient and compact storage of 26 boolean flags.
        // This is a fixed-size, compile-time array of bits, stored on the stack
        // for small sizes like 26, avoiding heap allocation overhead. It initializes
        // all bits to 0 (false) by default.
        std::bitset<26> exists;

        // Maintain a counter for the number of unique letters found.
        // This allows for an early exit optimization, significantly improving
        // performance for strings that are pangrams or contain all letters
        // early in the sequence.
        int unique_letters_count = 0;

        // Iterate through each character of the input string.
        // Using `const char& c` efficiently references each character without
        // creating unnecessary copies, which is good practice for range-based for loops.
        for (const char& c : text) {
            // Optimize character classification and conversion.
            // Directly checking the ASCII/UTF-8 range for 'a'-'z' and 'A'-'Z'
            // is generally faster and avoids the overhead of locale-dependent
            // `isalpha` and `tolower` function calls.
            if (c >= 'a' && c <= 'z') {
                // Calculate the 0-indexed position for lowercase letters ('a' -> 0, 'b' -> 1, etc.).
                int index = c - 'a';
                // If this letter hasn't been marked as seen yet (bit is 0).
                if (!exists.test(index)) {
                    exists.set(index);          // Mark the letter as seen (set bit to 1).
                    unique_letters_count++;     // Increment the count of unique letters found.
                }
            } else if (c >= 'A' && c <= 'Z') {
                // Same logic for uppercase letters, mapping 'A' to 0, 'B' to 1, etc.
                int index = c - 'A';
                if (!exists.test(index)) {
                    exists.set(index);
                    unique_letters_count++;
                }
            }

            // Early exit: If all 26 unique letters have been found, the string is
            // confirmed to be a pangram. Return true immediately to minimize
            // further processing.
            if (unique_letters_count == 26) {
                return true;
            }
        }

        // If the loop completes, it means no early exit occurred.
        // The string is a pangram only if exactly 26 unique letters were found
        // by the end of processing the entire string.
        return unique_letters_count == 26;
    }
}