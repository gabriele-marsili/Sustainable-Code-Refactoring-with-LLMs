#include "bob.h"
#include <string>
#include <cctype>
using namespace std;

string bob::hey(string statement)
{
    bool spaces_only = true;
    bool all_uppercase = true;
    bool has_question_mark = false;
    bool contains_alpha = false;

    for (char c : statement)
    {
        if (!isspace(c))
            spaces_only = false;

        if (isalpha(c))
        {
            contains_alpha = true;
            if (!isupper(c))
                all_uppercase = false;
        }

        if (!spaces_only && !all_uppercase)
            break;
    }

    if (spaces_only)
        return "Fine. Be that way!";
    if (all_uppercase && contains_alpha)
        return "Whoa, chill out!";

    for (auto it = statement.rbegin(); it != statement.rend(); ++it)
    {
        if (*it == '?')
        {
            has_question_mark = true;
            break;
        }
        if (!isspace(*it))
            break;
    }

    return has_question_mark ? "Sure." : "Whatever.";
}