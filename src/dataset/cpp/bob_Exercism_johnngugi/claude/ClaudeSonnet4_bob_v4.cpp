#include "bob.h"
#include <string>
#include <cctype>
using namespace std;

string bob::hey(string statement)
{
    if (statement.empty()) {
        return "Fine. Be that way!";
    }
    
    bool has_alpha = false;
    bool all_uppercase = true;
    bool has_question_mark = false;
    
    // Single pass through the string
    for (char c : statement) {
        if (isalpha(c)) {
            has_alpha = true;
            if (!isupper(c)) {
                all_uppercase = false;
            }
        } else if (c == '?') {
            has_question_mark = true;
        }
    }
    
    // Check if string contains only whitespace
    bool spaces_only = true;
    for (char c : statement) {
        if (!isspace(c)) {
            spaces_only = false;
            break;
        }
    }
    
    if (spaces_only) {
        return "Fine. Be that way!";
    }
    
    if (all_uppercase && has_alpha) {
        return "Whoa, chill out!";
    }
    
    // Check for question mark at end (ignoring trailing whitespace)
    if (!has_question_mark) {
        for (auto it = statement.rbegin(); it != statement.rend(); ++it) {
            if (*it == '?') {
                has_question_mark = true;
                break;
            } else if (!isspace(*it)) {
                break;
            }
        }
    }
    
    if (has_question_mark) {
        return "Sure.";
    }
    
    return "Whatever.";
}