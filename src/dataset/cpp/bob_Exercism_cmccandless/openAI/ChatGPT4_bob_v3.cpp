#include "bob.h"
#include <cctype>

string bob::hey(string input)
{
    size_t end = input.find_last_not_of(" \t\n\r\f\v");
    if (end == string::npos) return "Fine. Be that way!";

    bool hasLetter = false;
    bool isShouting = true;

    for (size_t i = 0; i <= end; ++i)
    {
        char ch = input[i];
        if (isalpha(ch))
        {
            hasLetter = true;
            if (!isupper(ch))
            {
                isShouting = false;
            }
        }
        else if (islower(ch))
        {
            isShouting = false;
        }
    }

    if (hasLetter && isShouting) return "Whoa, chill out!";
    if (input[end] == '?') return "Sure.";
    return "Whatever.";
}