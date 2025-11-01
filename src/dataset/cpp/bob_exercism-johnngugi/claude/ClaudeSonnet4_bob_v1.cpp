#include "bob.h"
#include <string>
#include <cctype>
using namespace std;

string bob::hey(string statement)
{
    if (statement.empty()) {
        return "Fine. Be that way!";
    }

    bool spaces_only = true;
    bool all_uppercase = true;
    bool has_alpha = false;
    bool has_question_mark = false;

    // Single pass through the string
    for (char c : statement) {
        if (!isspace(c)) {
            spaces_only = false;
            if (c == '?') {
                has_question_mark = true;
            }
        }
        
        if (isalpha(c)) {
            has_alpha = true;
            if (!isupper(c)) {
                all_uppercase = false;
            }
        }
    }

    // Find last non-space character to check for question mark
    if (!spaces_only && !has_question_mark) {
        for (auto it = statement.rbegin(); it != statement.rend(); ++it) {
            if (!isspace(*it)) {
                has_question_mark = (*it == '?');
                break;
            }
        }
    }

    if (spaces_only) {
        return "Fine. Be that way!";
    }
    
    if (all_uppercase && has_alpha) {
        return "Whoa, chill out!";
    }
    
    if (has_question_mark) {
        return "Sure.";
    }
    
    return "Whatever.";
}