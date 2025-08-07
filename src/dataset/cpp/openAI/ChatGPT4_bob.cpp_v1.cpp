#include "bob.h"
#include <string>
#include <cctype>
using namespace std;

string bob::hey(string statement)
{
    bool has_letters = false;
    bool all_uppercase = true;
    bool has_question_mark = false;

    size_t start = 0;
    size_t end = statement.size();

    while (start < end && isspace(statement[start])) ++start;
    while (end > start && isspace(statement[end - 1])) --end;

    if (start == end)
        return "Fine. Be that way!";

    for (size_t i = start; i < end; ++i)
    {
        char c = statement[i];
        if (isalpha(c))
        {
            has_letters = true;
            if (!isupper(c))
                all_uppercase = false;
        }
    }

    if (has_letters && all_uppercase)
        return "Whoa, chill out!";

    if (statement[end - 1] == '?')
        return "Sure.";

    return "Whatever.";
}