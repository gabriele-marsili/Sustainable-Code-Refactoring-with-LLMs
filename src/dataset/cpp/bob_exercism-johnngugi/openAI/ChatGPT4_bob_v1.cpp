#include "bob.h"
#include <string>
#include <cctype>
using namespace std;

string bob::hey(string statement)
{
    bool spaces_only = true;
    bool all_uppercase = true;
    bool has_question_mark = false;
    bool has_letters = false;

    for (char c : statement)
    {
        if (!isspace(c))
            spaces_only = false;

        if (isalpha(c))
        {
            has_letters = true;
            if (!isupper(c))
                all_uppercase = false;
        }

        if (!spaces_only && !all_uppercase)
            break;
    }

    if (spaces_only)
        return "Fine. Be that way!";
    if (all_uppercase && has_letters)
        return "Whoa, chill out!";

    for (auto it = statement.rbegin(); it != statement.rend(); ++it)
    {
        if (*it == '?')
        {
            has_question_mark = true;
            break;
        }
        else if (!isspace(*it))
            break;
    }

    if (has_question_mark)
        return "Sure.";

    return "Whatever.";
}