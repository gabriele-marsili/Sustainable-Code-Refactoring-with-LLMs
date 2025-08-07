#include "bob.h"
#include <string>
#include <cctype>
using namespace std;

string bob::hey(string statement)
{
    bool contains_non_space = false;
    bool contains_alpha = false;
    bool contains_lowercase_alpha = false;

    for (char c : statement)
    {
        if (!isspace(c))
        {
            contains_non_space = true;
        }

        if (isalpha(c))
        {
            contains_alpha = true;
            if (islower(c))
            {
                contains_lowercase_alpha = true;
            }
        }

        // Equivalent to original's '!spaces_only && !all_uppercase' break condition
        if (contains_non_space && contains_lowercase_alpha)
        {
            break; 
        }
    }

    if (!contains_non_space)
    {
        return "Fine. Be that way!";
    }
    else if (!contains_lowercase_alpha && contains_alpha)
    {
        return "Whoa, chill out!";
    }

    for (string::reverse_iterator it = statement.rbegin(); it != statement.rend(); ++it)
    {
        if (*it == '?')
        {
            return "Sure.";
        }
        else if (!isspace(*it))
        {
            break;
        }
    }

    return "Whatever.";
}