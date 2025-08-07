#include "bob.h"
#include <string>
#include <cctype>
using namespace std;

string bob::hey(string statement)
{
    bool has_letters = false;
    bool all_uppercase = true;
    bool has_question_mark = false;

    size_t i = 0;
    size_t len = statement.length();

    // Trim leading spaces
    while (i < len && isspace(statement[i])) ++i;
    if (i == len) return "Fine. Be that way!";

    // Trim trailing spaces
    size_t j = len - 1;
    while (j > i && isspace(statement[j])) --j;

    for (size_t k = i; k <= j; ++k)
    {
        char c = statement[k];
        if (isalpha(c))
        {
            has_letters = true;
            if (!isupper(c)) all_uppercase = false;
        }
    }

    if (has_letters && all_uppercase)
        return "Whoa, chill out!";

    if (statement[j] == '?')
        return "Sure.";

    return "Whatever.";
}