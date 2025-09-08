#include <string>
#include "beer_song.h"

namespace beer {

    const std::string one_bottle = "1 bottle of beer on the wall, 1 bottle of beer.\n"
                                   "Take it down and pass it around, no more bottles of beer on the wall.\n";

    const std::string zero_bottles = "No more bottles of beer on the wall, no more bottles of beer.\n"
                                     "Go to the store and buy some more, 99 bottles of beer on the wall.\n";

    std::string verse(int verse_num) {
        if (verse_num == 0) {
            return zero_bottles;
        }
        if (verse_num == 1) {
            return one_bottle;
        }

        return std::to_string(verse_num) + " bottles of beer on the wall, " + std::to_string(verse_num) +
               " bottles of beer.\nTake one down and pass it around, " +
               std::to_string(verse_num - 1) + ((verse_num - 1 == 1) ? 
               " bottle of beer on the wall.\n" : " bottles of beer on the wall.\n");
    }

    std::string sing(int from) {
        std::string result;
        for (int i = from; i > 0; --i) {
            result += verse(i) + "\n";
        }
        result += zero_bottles;
        return result;
    }

    std::string sing(int from, int to) {
        std::string result;
        for (int i = from; i >= to; --i) {
            result += verse(i) + "\n";
        }
        if (!result.empty()) result.pop_back(); // Remove the last newline
        return result;
    }

}