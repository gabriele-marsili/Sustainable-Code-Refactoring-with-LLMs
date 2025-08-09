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
    bool has_question = false;
    
    // Single pass through the string
    for (char c : statement) {
        if (isalpha(c)) {
            has_alpha = true;
            if (!isupper(c)) {
                all_uppercase = false;
            }
        } else if (c == '?') {
            has_question = true;
        }
    }
    
    // Check if string contains only whitespace
    bool only_whitespace = true;
    for (char c : statement) {
        if (!isspace(c)) {
            only_whitespace = false;
            break;
        }
    }
    
    if (only_whitespace) {
        return "Fine. Be that way!";
    }
    
    if (has_alpha && all_uppercase) {
        return "Whoa, chill out!";
    }
    
    // Check for question mark at end (ignoring trailing whitespace)
    if (has_question) {
        for (auto it = statement.rbegin(); it != statement.rend(); ++it) {
            if (*it == '?') {
                return "Sure.";
            } else if (!isspace(*it)) {
                break;
            }
        }
    }
    
    return "Whatever.";
}