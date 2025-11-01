#include "bob.h"
#include <string>
#include <cctype>
using namespace std;

string bob::hey(string statement)
{
    bool spaces_only = true;
    bool all_uppercase = true;
    bool has_letters = false;
    bool has_question_mark = false;

    // Trim trailing spaces and check for question mark
    size_t end = statement.find_last_not_of(" \t\n\r\f\v");
    if (end != string::npos) {
        has_question_mark = (statement[end] == '?');
        statement = statement.substr(0, end + 1);
    } else {
        return "Fine. Be that way!";
    }

    for (char c : statement) {
        if (!isspace(c)) spaces_only = false;
        if (isalpha(c)) {
            has_letters = true;
            if (!isupper(c)) all_uppercase = false;
        }
        if (!spaces_only && !all_uppercase) break;
    }

    if (spaces_only) return "Fine. Be that way!";
    if (all_uppercase && has_letters) return "Whoa, chill out!";
    if (has_question_mark) return "Sure.";
    return "Whatever.";
}