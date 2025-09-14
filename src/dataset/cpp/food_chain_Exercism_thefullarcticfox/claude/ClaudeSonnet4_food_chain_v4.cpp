#include "food_chain.h"
#include <array>
#include <string_view>

namespace food_chain {
    struct AnimalData {
        std::string_view animal;
        std::string_view phrase;
    };
    
    static constexpr std::array<AnimalData, 8> animals = {{
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
        const int idx = verse_num - 1;
        std::string res;
        res.reserve(256);
        
        res += "I know an old lady who swallowed a ";
        res += animals[idx].animal;
        res += ".\n";
        
        if (verse_num > 1) {
            res += animals[idx].phrase;
            res += "\n";
        }
        
        if (verse_num == 8)
            return res;
            
        for (int i = verse_num - 1; i > 0; --i) {
            res += "She swallowed the ";
            res += animals[i].animal;
            res += " to catch the ";
            res += animals[i - 1].animal;
            if (i == 2)
                res += " that wriggled and jiggled and tickled inside her";
            res += ".\n";
        }
        
        res += animals[0].phrase;
        res += "\n";
        return res;
    }

    std::string verses(int first, int last) {
        std::string res;
        res.reserve((last - first + 1) * 256);
        
        for (int i = first; i <= last; ++i) {
            res += verse(i);
            res += "\n";
        }
        return res;
    }

    std::string sing() {
        return verses(1, 8);
    }
}