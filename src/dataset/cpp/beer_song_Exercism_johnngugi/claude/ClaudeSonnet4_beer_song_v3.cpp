#include <string>
#include "beer_song.h"

using namespace std;

namespace beer {

    static const string zero_bottles = "No more bottles of beer on the wall, no more bottles of beer.\n"
            "Go to the store and buy some more, 99 bottles of beer on the wall.\n";

    static const string one_bottle = "1 bottle of beer on the wall, 1 bottle of beer.\n"
            "Take it down and pass it around, no more bottles of beer on the wall.\n";

    string verse(int verse_num) {
        if (verse_num == 0) {
            return zero_bottles;
        }

        if (verse_num == 1) {
            return one_bottle;
        }

        const int remaining = verse_num - 1;
        const string bottle_word = (remaining == 1) ? " bottle" : " bottles";
        
        string result;
        result.reserve(120);
        
        result += to_string(verse_num);
        result += " bottles of beer on the wall, ";
        result += to_string(verse_num);
        result += " bottles of beer.\nTake one down and pass it around, ";
        result += to_string(remaining);
        result += bottle_word;
        result += " of beer on the wall.\n";

        return result;
    }

    string sing(int from) {
        string result;
        result.reserve(from * 120 + 100);

        for (int i = from; i > 0; --i) {
            result += verse(i);
            result += '\n';
        }
        result += zero_bottles;
        return result;
    }

    string sing(int from, int to) {
        string result;
        result.reserve((from - to + 1) * 120);

        for (int i = from; i >= to; --i) {
            result += verse(i);
            if (i > to) {
                result += '\n';
            }
        }
        return result;
    }

}