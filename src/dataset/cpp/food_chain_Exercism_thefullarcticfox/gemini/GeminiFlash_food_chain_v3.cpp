#include "food_chain.h"
#include <array>
#include <string>

namespace food_chain {

const std::array<std::pair<std::string_view, std::string_view>, 8> versemap = {
    std::make_pair("fly", "I don't know why she swallowed the fly. Perhaps she'll die."),
    std::make_pair("spider", "It wriggled and jiggled and tickled inside her."),
    std::make_pair("bird", "How absurd to swallow a bird!"),
    std::make_pair("cat", "Imagine that, to swallow a cat!"),
    std::make_pair("dog", "What a hog, to swallow a dog!"),
    std::make_pair("goat", "Just opened her throat and swallowed a goat!"),
    std::make_pair("cow", "I don't know how she swallowed a cow!"),
    std::make_pair("horse", "She's dead, of course!")
};

std::string verse(int verse_num) {
    std::string res;
    res.reserve(256); 

    const auto& [animal, phrase] = versemap[verse_num - 1];
    res += "I know an old lady who swallowed a ";
    res += animal;
    res += ".\n";

    if (verse_num > 1) {
        res += phrase;
        res += "\n";
    }

    if (verse_num == 8) {
        return res;
    }

    int current_verse = verse_num;
    while (current_verse > 1) {
        res += "She swallowed the ";
        res += versemap[current_verse - 1].first;
        --current_verse;
        res += " to catch the ";
        res += versemap[current_verse - 1].first;

        if (current_verse == 2) {
            res += " that wriggled and jiggled and tickled inside her";
        }
        res += ".\n";
    }

    res += versemap[0].second;
    res += "\n";
    return res;
}

std::string verses(int first, int last) {
    std::string res;
    res.reserve((last - first + 1) * 256);

    for (int i = first; i <= last; ++i) {
        res += verse(i);
        if (i < last) {
            res += "\n";
        }
    }
    return res;
}

std::string sing() {
    return verses(1, 8);
}

}  // namespace food_chain