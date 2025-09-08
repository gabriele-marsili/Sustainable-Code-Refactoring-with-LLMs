#include "beer_song.h"
#include <string>

namespace beer
{
    inline std::string bottles(int n) { return n == 1 ? " bottle" : " bottles"; }

    std::string verse(int n)
    {
        std::string result;
        result.reserve(128); // Reserve memory to reduce reallocations

        std::string b = bottles(n);
        result += (n > 0 ? std::to_string(n) : "No more") + b + " of beer on the wall, ";
        result += (n > 0 ? std::to_string(n) : "no more") + b + " of beer.\n";

        if (n > 0)
        {
            result += "Take " + std::string(n == 1 ? "it" : "one") + " down and pass it around, ";
            result += (n == 1 ? "no more" : std::to_string(n - 1)) + bottles(n - 1) + " of beer on the wall.\n";
        }
        else
        {
            result += "Go to the store and buy some more, 99 bottles of beer on the wall.\n";
        }

        return result;
    }

    std::string sing(int start, int stop)
    {
        std::string result;
        result.reserve((start - stop + 1) * 128); // Estimate memory to reduce reallocations

        for (int i = start; i >= stop; --i)
        {
            result += verse(i);
            if (i > stop) result += '\n';
        }

        return result;
    }
}