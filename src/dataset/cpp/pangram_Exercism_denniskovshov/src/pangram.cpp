#include <bitset>
#include "pangram.h"

namespace pangram {
    // this solution assumes string comes in ascii or compatible code page that allocates 1 byte to ascii chars
    static constexpr int ascii_lowercase_start = 97;
    static constexpr int ascii_uppercase_start = 65;

    bool is_pangram(const std::string& text) {
        // another common solution is to use a hashmap<char, bool> which adds more flexibility
        // we can also just use one bitset, using two for clarity
        std::bitset<26> lowercase_flags;
        std::bitset<26> uppercase_flags; 
        bool is_pangram = false;

        for (size_t i = 0; i < text.length(); i++) {
            char ch = text[i];

            if (std::islower(ch)) {
                auto flag_position = ch % ascii_lowercase_start;
                lowercase_flags.set(flag_position, true);
            }
            else if (std::isupper(ch)) {
                auto flag_position = ch % ascii_uppercase_start;
                uppercase_flags.set(flag_position, true);
            }
        }
        
        is_pangram = (lowercase_flags | uppercase_flags).all();

        return is_pangram;
    }
}  // namespace pangram
 