#include <string>   // For std::string
#include <bitset>   // For std::bitset
#include <cctype>   // For std::isalpha, std::tolower
// #include "pangram.h" // Assuming this header provides the necessary declarations

namespace pangram {

    bool is_pangram(std::string text) {
        std::bitset<26> found_letters; // Initializes all 26 bits to false

        for (char c : text) {
            if (std::isalpha(c)) {
                // Calculate index (0-25) for 'a'-'z'
                found_letters.set(std::tolower(c) - 'a');

                // Early exit: if all 26 letters have been found, we can stop immediately.
                if (found_letters.all()) {
                    return true;
                }
            }
        }

        // If the loop finishes, check if all 26 letters were found.
        // This handles cases where the string might be short or not contain all letters.
        return found_letters.all();
    }
}