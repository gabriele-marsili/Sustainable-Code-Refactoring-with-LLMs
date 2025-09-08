#include "beer_song.h"
#include <string>

namespace beer
{
    inline std::string bottles(int n) { return n == 1 ? " bottle" : " bottles"; }

    std::string verse(int n)
    {
        std::string b = bottles(n);
        std::string result;

        if (n > 0)
        {
            result += std::to_string(n) + b + " of beer on the wall, " + std::to_string(n) + b + " of beer.\n";
            result += "Take " + std::string(n == 1 ? "it" : "one") + " down and pass it around, ";
            result += (n - 1 > 0 ? std::to_string(n - 1) : "no more") + bottles(n - 1) + " of beer on the wall.\n";
        }
        else
        {
            result += "No more bottles of beer on the wall, no more bottles of beer.\n";
            result += "Go to the store and buy some more, 99 bottles of beer on the wall.\n";
        }

        return result;
    }

    std::string sing(int start, int stop)
    {
        std::string result;
        for (int i = start; i >= stop; --i)
        {
            result += verse(i);
            if (i > stop) result += '\n';
        }
        return result;
    }
}