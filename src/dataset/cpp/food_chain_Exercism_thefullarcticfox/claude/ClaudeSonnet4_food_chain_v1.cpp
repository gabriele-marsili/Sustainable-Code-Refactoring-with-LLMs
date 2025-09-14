#include "food_chain.h"
#include <array>
#include <string_view>

namespace food_chain {
    struct VerseData {
        std::string_view animal;
        std::string_view phrase;
    };
    
    static constexpr std::array<VerseData, 8> verse_data{{
        {"fly", "I don't know why she swallowed the fly. Perhaps she'll die."},
        {"spider", "It wriggled and jiggled and tickled inside her."},
        {"bird", "How absurd to swallow a bird!"},
        {"cat", "Imagine that, to swallow a cat!"},
        {"dog", "What a hog, to swallow a dog!"},
        {"goat", "Just opened her throat and swallowed a goat!"},
        {"cow", "I don't know how she swallowed a cow!"},
        {"horse", "She's dead, of course!"}
    }};
    
    std::string verse(int verse_num) {
        const auto& data = verse_data[verse_num - 1];
        
        std::string res;
        res.reserve(256); // Pre-allocate reasonable capacity
        
        res += "I know an old lady who swallowed a ";
        res += data.animal;
        res += ".\n";
        
        if (verse_num > 1) {
            res += data.phrase;
            res += "\n";
        }
        
        if (verse_num == 8)
            return res;
            
        for (int i = verse_num; i > 1; --i) {
            res += "She swallowed the ";
            res += verse_data[i - 1].animal;
            res += " to catch the ";
            res += verse_data[i - 2].animal;
            if (i == 2)
                res += " that wriggled and jiggled and tickled inside her";
            res += ".\n";
        }
        
        res += verse_data[0].phrase;
        res += "\n";
        return res;
    }

    std::string verses(int first, int last) {
        std::string res;
        res.reserve((last - first + 1) * 256); // Pre-allocate based on expected size
        
        for (int i = first; i <= last; ++i) {
            res += verse(i);
            res += "\n";
        }
        return res;
    }

    std::string sing() {
        return verses(1, 8);
    }
}  // namespace food_chain