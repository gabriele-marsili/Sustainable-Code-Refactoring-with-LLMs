#include <array>    // For std::array
#include <cctype>   // For std::isalpha, std::tolower
// No longer needs <algorithm> for std::all_of or <vector> for std::vector<bool>
#include "pangram.h" // Assumed to define the namespace and function declaration

namespace pangram {

    bool is_pangram(std::string text) { // Parameter type must remain std::string due to signature constraint

        // Use std::array for fixed-size small arrays. It's stack-allocated and avoids the
        // potential overhead of std::vector<bool>'s specialization (bit packing/unpacking)
        // for this small, fixed size.
        // Aggregate initialization {} ensures all elements are value-initialized to false.
        std::array<bool, 26> exists{};

        int found_count = 0; // Tracks the number of unique alphabet letters found

        // Iterate through the characters of the (copied) string.
        // Copying char is negligible overhead compared to string copy.
        for (char c : text) {
            // Check if the character is an alphabet letter.
            if (std::isalpha(c)) {
                // Convert the character to lowercase and calculate its 0-25 index.
                int index = std::tolower(c) - 'a';

                // If this letter has not been found yet (its flag is false).
                if (!exists[index]) {
                    exists[index] = true; // Mark it as found.
                    found_count++;        // Increment the count of unique letters.

                    // If all 26 unique letters have been found, we can short-circuit and return true.
                    // This is the primary runtime optimization for pangrams, avoiding further processing.
                    if (found_count == 26) {
                        return true;
                    }
                }
            }
        }

        // If the loop completes, return true only if all 26 unique letters were found.
        return found_count == 26;
    }
}