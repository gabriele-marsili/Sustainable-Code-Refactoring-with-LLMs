#include <string>
#include <bitset>
#include <cctype> // For std::isalpha and std::tolower

namespace pangram {

    bool is_pangram(std::string text) {
        // Use std::bitset for efficient tracking of found letters.
        // A bitset of 26 bits is extremely memory-efficient (typically 4 bytes).
        std::bitset<26> found_letters;

        // Keep a count of unique letters found. This allows for an early exit
        // once all 26 unique letters are identified.
        int unique_letter_count = 0;

        // Iterate through each character in the input string.
        // Pass by value (`char c`) for individual characters is suitable here.
        for (char c : text) {
            // Check if the character is an alphabetic letter.
            if (std::isalpha(c)) {
                // Convert the character to lowercase and determine its 0-25 index.
                int index = std::tolower(c) - 'a';

                // If this letter has not been marked as found yet, mark it.
                // `test()` checks if a bit is set, `set()` sets a bit.
                if (!found_letters.test(index)) {
                    found_letters.set(index);
                    unique_letter_count++;

                    // If all 26 unique letters have been found, we can immediately
                    // return true, avoiding further string processing.
                    if (unique_letter_count == 26) {
                        return true;
                    }
                }
            }
        }

        // If the loop completes without finding all 26 letters (i.e., the early
        // exit was not triggered), check if all bits are set in the bitset.
        // This confirms if all 26 unique letters were present in the text.
        // `all()` is a direct and efficient way to check this on a bitset.
        return found_letters.all();
    }
}