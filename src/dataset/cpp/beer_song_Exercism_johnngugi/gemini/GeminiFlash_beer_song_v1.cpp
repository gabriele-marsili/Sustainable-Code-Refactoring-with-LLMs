#include <string>
#include <array>
#include "beer_song.h"

using namespace std;

namespace beer {

    const string one_bottle = "1 bottle of beer on the wall, 1 bottle of beer.\n"
                              "Take it down and pass it around, no more bottles of beer on the wall.\n";

    const string zero_bottles = "No more bottles of beer on the wall, no more bottles of beer.\n"
                                "Go to the store and buy some more, 99 bottles of beer on the wall.\n";

    string verse(int verse_num) {
        if (verse_num == 0) {
            return zero_bottles;
        }

        if (verse_num == 1) {
            return one_bottle;
        }

        string result = to_string(verse_num) + " bottles of beer on the wall, " + to_string(verse_num) + " bottles of beer.\n"
                        "Take one down and pass it around, " + to_string(verse_num - 1) +
                        ((verse_num - 1 == 1) ? " bottle of beer on the wall.\n" : " bottles of beer on the wall.\n");

        return result;
    }

    string sing(int from) {
        string result;
        result.reserve(from * 200);

        for (int i = from; i > 0; --i) {
            result += verse(i) + "\n";
        }
        result += "No more bottles of beer on the wall, no more bottles of beer.\n"
                  "Go to the store and buy some more, 99 bottles of beer on the wall.\n";
        return result;
    }

    string sing(int from, int to) {
        string result;
        result.reserve((from - to + 1) * 200);

        for (int i = from; i >= to; --i) {
            result += verse(i) + "\n";
        }
        if (!result.empty()) {
            result.pop_back();
        }
        return result;
    }

}