#include "bob.h"

char *hey_bob(char *greeting) {
    if (*greeting == '\0') return ("Fine. Be that way!");
    
    char *ptr = greeting;
    bool has_letter = false;
    bool has_lowercase = false;
    bool has_uppercase = false;
    bool has_non_whitespace = false;
    char last_non_whitespace = '\0';
    
    // Single pass through the string
    while (*ptr != '\0') {
        if (!isspace(*ptr)) {
            has_non_whitespace = true;
            last_non_whitespace = *ptr;
            
            if (*ptr >= 'a' && *ptr <= 'z') {
                has_letter = true;
                has_lowercase = true;
            } else if (*ptr >= 'A' && *ptr <= 'Z') {
                has_letter = true;
                has_uppercase = true;
            }
        }
        ptr++;
    }
    
    if (!has_non_whitespace) return ("Fine. Be that way!");
    
    bool is_question = (last_non_whitespace == '?');
    bool is_yelling = (has_letter && has_uppercase && !has_lowercase);
    
    if (is_question && is_yelling)
        return ("Calm down, I know what I'm doing!");
    else if (is_question)
        return ("Sure.");
    else if (is_yelling)
        return ("Whoa, chill out!");
    
    return ("Whatever.");
}