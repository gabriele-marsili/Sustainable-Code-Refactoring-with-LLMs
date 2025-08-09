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
    
    // Check conditions
    bool silent = !has_non_whitespace;
    bool question = (last_non_whitespace == '?');
    bool capital = has_letter && has_uppercase && !has_lowercase;
    
    if (silent)
        return ("Fine. Be that way!");
    else if (question && capital)
        return ("Calm down, I know what I'm doing!");
    else if (question)
        return ("Sure.");
    else if (capital)
        return ("Whoa, chill out!");
    
    return ("Whatever.");
}

bool ends_with_question_mark(char *chr) {
    if (*chr == '\0') return false;
    
    char *end = chr;
    while (*end != '\0') end++;
    end--;
    
    while (end >= chr && isspace(*end)) end--;
    
    return (end >= chr && *end == '?');
}

bool has_all_capital_letters(char *chr) {
    bool has_letter = false;
    
    while (*chr != '\0') {
        if (*chr >= 'a' && *chr <= 'z')
            return false;
        else if (*chr >= 'A' && *chr <= 'Z')
            has_letter = true;
        chr++;
    }
    return has_letter;
}

bool silent_message(char *chr) {
    while (*chr != '\0') {
        if (!isspace(*chr)) return false;
        chr++;
    }
    return true;
}