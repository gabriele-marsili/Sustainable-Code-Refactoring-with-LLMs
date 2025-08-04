#include "pangram.h"

#include <bitset>

namespace pangram {
    inline const int letters_in_alphabet = 26;

    // Track presence of case-insensitive Roman letters
    // in a sentence using a bitset.
    bool is_pangram(std::string_view sentence) {
        std::bitset<letters_in_alphabet> letters_seen;

        // Letters tracked by their ASCII table position.
        // i.e. letters_seen[0] represents both 'A' and 'a'.
        for (auto c : sentence) {
            if ((c >= 'A') && (c <= 'Z' )) {
                letters_seen.set(c - 'A');
            }

            if ((c >= 'a') && (c <= 'z')) {
                letters_seen.set(c - 'a');
            }
        }

        // Have all the Roman letters been seen? 
        return letters_seen.all();
    }
} // namespace pangram
