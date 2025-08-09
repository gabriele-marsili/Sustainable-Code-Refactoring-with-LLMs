#include "bob.h"
#include <cctype>

string bob::hey(string input)
{
    size_t end = input.find_last_not_of(" \t\n\r\f\v");
    if (end == string::npos) return "Fine. Be that way!";
    input.resize(end + 1);

    bool hasLetter = false;
    bool isShouting = true;

    for (char ch : input)
    {
        if (std::isalpha(static_cast<unsigned char>(ch)))
        {
            hasLetter = true;
            if (std::islower(static_cast<unsigned char>(ch)))
            {
                isShouting = false;
                break;
            }
        }
    }

    if (hasLetter && isShouting) return "Whoa, chill out!";
    if (input.back() == '?') return "Sure.";
    return "Whatever.";
}