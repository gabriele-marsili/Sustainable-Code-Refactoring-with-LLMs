#include <string>
#include <bitset>
#include <cctype>

namespace pangram {

    bool is_pangram(std::string text) {
        std::bitset<26> found_letters;
        int unique_count = 0;

        for (char c_raw : text) {
            unsigned char c = static_cast<unsigned char>(c_raw);

            if (std::isalpha(c)) {
                int index = std::tolower(c) - 'a';
                
                if (!found_letters.test(index)) {
                    found_letters.set(index);
                    unique_count++;
                    if (unique_count == 26) {
                        return true;
                    }
                }
            }
        }
        
        return unique_count == 26;
    }
}