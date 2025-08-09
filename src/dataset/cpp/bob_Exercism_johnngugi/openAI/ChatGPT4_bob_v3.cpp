#include "bob.h"
#include <string>
#include <cctype>
using namespace std;

string bob::hey(string statement)
{
    bool has_alpha = false;
    bool all_upper = true;
    bool has_question = false;

    size_t i = 0;
    while (i < statement.size() && isspace(statement[i])) ++i;
    if (i == statement.size()) return "Fine. Be that way!";

    for (char c : statement) {
        if (isalpha(c)) {
            has_alpha = true;
            if (!isupper(c)) all_upper = false;
        }
    }

    for (auto it = statement.rbegin(); it != statement.rend(); ++it) {
        if (isspace(*it)) continue;
        if (*it == '?') has_question = true;
        break;
    }

    if (has_alpha && all_upper) return "Whoa, chill out!";
    if (has_question) return "Sure.";
    return "Whatever.";
}