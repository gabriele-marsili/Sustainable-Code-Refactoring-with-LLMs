#include <string>
#include "beer_song.h"

using namespace std;

namespace beer {

    static const string one_bottle = "1 bottle of beer on the wall, 1 bottle of beer.\n"
            "Take it down and pass it around, no more bottles of beer on the wall.\n";

    static const string zero_bottles = "No more bottles of beer on the wall, no more bottles of beer.\n"
            "Go to the store and buy some more, 99 bottles of beer on the wall.\n";

    string verse(int verse_num) {
        if (verse_num == 0) {
            return zero_bottles;
        }

        if (verse_num == 1) {
            return one_bottle;
        }

        string result;
        result.reserve(128);
        
        string num_str = to_string(verse_num);
        string next_num_str = to_string(verse_num - 1);
        
        result += num_str;
        result += " bottles of beer on the wall, ";
        result += num_str;
        result += " bottles of beer.\nTake one down and pass it around, ";
        result += next_num_str;
        result += (verse_num == 2) ? " bottle of beer on the wall.\n" : " bottles of beer on the wall.\n";

        return result;
    }

    string sing(int from) {
        string result;
        result.reserve(from * 128 + 128);

        for (int i = from; i > 0; --i) {
            result += verse(i);
            result += '\n';
        }
        result += zero_bottles;
        return result;
    }

    string sing(int from, int to) {
        string result;
        result.reserve((from - to + 1) * 128);

        for (int i = from; i >= to; --i) {
            result += verse(i);
            if (i > to) result += '\n';
        }
        return result;
    }

}