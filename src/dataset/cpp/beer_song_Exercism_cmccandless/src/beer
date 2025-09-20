#include "beer_song.h"
#include <string>

namespace beer
{
    inline std::string bottles(int n) { return n == 1 ? " bottle" : " bottles"; }

    std::string verse(int n)
    {
        std::string result;
        result.reserve(200); // Reserve enough space to avoid reallocations
        std::string b = bottles(n);
        result += (n > 0 ? std::to_string(n) : "No more");
        result += b + " of beer on the wall, ";
        result += (n > 0 ? std::to_string(n) : "no more");
        result += b + " of beer.\n";

        if (n > 0)
        {
            result += "Take " + std::string(n == 1 ? "it" : "one") + " down and pass it around, ";
            result += (n == 1 ? "no more" : std::to_string(n - 1));
        }
        else
        {
            result += "Go to the store and buy some more, 99";
        }
        result += bottles(n - 1) + " of beer on the wall.\n";
        return result;
    }

    std::string sing(int start, int stop)
    {
        std::string result;
        result.reserve((start - stop + 1) * 200); // Estimate and reserve space
        for (int i = start; i >= stop; --i)
        {
            result += verse(i);
            if (i > stop) result += '\n';
        }
        return result;
    }
}