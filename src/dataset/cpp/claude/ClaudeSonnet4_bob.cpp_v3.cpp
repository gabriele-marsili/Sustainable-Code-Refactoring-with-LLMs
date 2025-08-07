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
    bool has_non_space = false;
    bool all_upper = true;
    
    // Single pass through the string
    for (char c : statement) {
        if (!isspace(c)) {
            has_non_space = true;
            if (isalpha(c)) {
                has_alpha = true;
                if (!isupper(c)) {
                    all_upper = false;
                }
            }
        }
    }
    
    if (!has_non_space) {
        return "Fine. Be that way!";
    }
    
    if (has_alpha && all_upper) {
        return "Whoa, chill out!";
    }
    
    // Check for question mark from the end
    for (auto it = statement.rbegin(); it != statement.rend(); ++it) {
        if (*it == '?') {
            return "Sure.";
        }
        if (!isspace(*it)) {
            break;
        }
    }
    
    return "Whatever.";
}