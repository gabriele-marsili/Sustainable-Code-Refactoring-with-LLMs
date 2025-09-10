#include "food_chain.h"
#include <array>

using namespace std;

namespace
{
    constexpr std::array<std::string_view, 9> phrases = {
        "",
        "fly",
        "spider",
        "bird",
        "cat",
        "dog",
        "goat",
        "cow",
        "horse",
    };

    constexpr std::array<std::string_view, 9> extras = {
        "",
        "I don't know why she swallowed the fly. Perhaps she'll die.",
        "wriggled and jiggled and tickled inside her.",
        "How absurd to swallow a bird!",
        "Imagine that, to swallow a cat!",
        "What a hog, to swallow a dog!",
        "Just opened her throat and swallowed a goat!",
        "I don't know how she swallowed a cow!",
        "She's dead, of course!",
    };

    std::string verse_impl(int n)
    {
        std::string result;
        result.reserve(256); 

        result += "She swallowed the ";
        result += phrases[n + 1];
        result += " to catch the ";
        result += phrases[n];
        result += ".";

        if (n == 2)
        {
            result += " that ";
            result += extras[n];
            result += "\n";
        }
        else
        {
            result += ".\n";
        }

        result += verse_impl(n - 1);
        return result;
    }
}

std::string food_chain::verse(int n, bool root)
{
    std::string result;
    result.reserve(256);

    if (root)
    {
        result += "I know an old lady who swallowed a ";
        result += phrases[n];
        result += ".\n";
        result += extras[n];
        result += "\n";
    }
    else
    {
        result += "She swallowed the ";
        result += phrases[n + 1];
        result += " to catch the ";
        result += phrases[n];
        result += ".";

        if (n == 2)
        {
            result += " that ";
            result += extras[n];
            result += "\n";
        }
        else
        {
            result += ".\n";
        }
        result += extras[n];
        result += "\n";
    }

    if (n > 1 && n < 8)
    {
        result += verse_impl(n - 1);
    }

    return result;
}