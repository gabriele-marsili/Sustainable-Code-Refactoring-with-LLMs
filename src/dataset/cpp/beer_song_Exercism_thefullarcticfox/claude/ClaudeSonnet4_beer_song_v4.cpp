#include "beer_song.h"
#include <string>
#include <stdexcept>

namespace beer_song {
    std::string n_bottles_tostring(int n) {
        if (n == 0) {
            return "no more bottles";
        } else if (n == 1) {
            return "1 bottle";
        } else {
            return std::to_string(n) + " bottles";
        }
    }

    std::string verse(int number) {
        if (number < 0 || number > 99)
            throw std::invalid_argument("no such verse");

        std::string bottlestr = n_bottles_tostring(number);
        std::string res;
        res.reserve(120);

        res += bottlestr;
        res[0] = std::toupper(res[0]);
        res += " of beer on the wall, ";
        res += bottlestr;
        res += " of beer.\n";

        if (number) {
            res += "Take ";
            res += (number == 1) ? "it" : "one";
            res += " down and pass it around, ";
            res += n_bottles_tostring(number - 1);
        } else {
            res += "Go to the store and buy some more, ";
            res += n_bottles_tostring(99);
        }
        
        res += " of beer on the wall.\n";
        return res;
    }

    std::string sing(int first, int last) {
        std::string res;
        res.reserve((first - last + 1) * 130);
        
        for (int i = first; i >= last; --i) {
            res += verse(i);
            if (i != last) {
                res += '\n';
            }
        }
        return res;
    }
}