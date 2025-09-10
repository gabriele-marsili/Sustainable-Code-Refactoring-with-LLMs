#include "food_chain.h"
#include <array>
#include <string>
#include <sstream>

namespace food_chain {
    std::string verse(int verse_num) {
        static const std::array<std::pair<std::string, std::string>, 8> versemap{
            std::make_pair("fly", "I don't know why she swallowed the fly. Perhaps she'll die."),
            std::make_pair("spider", "It wriggled and jiggled and tickled inside her."),
            std::make_pair("bird", "How absurd to swallow a bird!"),
            std::make_pair("cat", "Imagine that, to swallow a cat!"),
            std::make_pair("dog", "What a hog, to swallow a dog!"),
            std::make_pair("goat", "Just opened her throat and swallowed a goat!"),
            std::make_pair("cow", "I don't know how she swallowed a cow!"),
            std::make_pair("horse", "She's dead, of course!")
        };

        std::ostringstream res;
        res << "I know an old lady who swallowed a " << versemap[verse_num - 1].first << ".\n";
        if (verse_num > 1) {
            res << versemap[verse_num - 1].second << "\n";
        }
        if (verse_num == 8) {
            return res.str();
        }
        for (int i = verse_num; i > 1; --i) {
            res << "She swallowed the " << versemap[i - 1].first
                << " to catch the " << versemap[i - 2].first;
            if (i == 3) {
                res << " that wriggled and jiggled and tickled inside her";
            }
            res << ".\n";
        }
        res << versemap[0].second << "\n";
        return res.str();
    }

    std::string verses(int first, int last) {
        std::ostringstream res;
        for (int i = first; i <= last; ++i) {
            res << verse(i) << "\n";
        }
        return res.str();
    }

    std::string sing() {
        return verses(1, 8);
    }
}  // namespace food_chain