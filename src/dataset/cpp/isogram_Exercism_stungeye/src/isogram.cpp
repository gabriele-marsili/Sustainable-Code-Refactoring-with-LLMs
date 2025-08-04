#include "isogram.h"

#include <bitset>
#include <cctype>

namespace isogram {
    inline const int letters_in_alphabet = 26;

    bool is_isogram(const std::string& word) {
        std::bitset<letters_in_alphabet> letters_seen;

        for (auto c : word) {
            if (std::isalpha(c) == 0) {
                continue;
            }

            const auto position = std::tolower(c) - 'a';

            if (letters_seen[position]) {
                return false;
            }
            letters_seen.set(position);
        }

        return true;
    }
} // namespace isogram
