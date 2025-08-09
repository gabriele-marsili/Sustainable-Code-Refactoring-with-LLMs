#include "bob.h"

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
        if (*chr >= 'a' && *chr <= 'z') return false;
        if (*chr >= 'A' && *chr <= 'Z') has_letter = true;
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

char *hey_bob(char *greeting) {
    if (*greeting == '\0') return "Fine. Be that way!";
    
    bool question = false;
    bool capital = false;
    bool has_letter = false;
    bool has_non_space = false;
    
    char *ptr = greeting;
    char *last_non_space = NULL;
    
    while (*ptr != '\0') {
        if (!isspace(*ptr)) {
            has_non_space = true;
            last_non_space = ptr;
            if (*ptr >= 'a' && *ptr <= 'z') {
                capital = false;
            } else if (*ptr >= 'A' && *ptr <= 'Z') {
                if (!has_letter) capital = true;
                has_letter = true;
            }
        }
        ptr++;
    }
    
    if (!has_non_space) return "Fine. Be that way!";
    
    question = (last_non_space && *last_non_space == '?');
    capital = (capital && has_letter);
    
    if (question && capital) return "Calm down, I know what I'm doing!";
    if (question) return "Sure.";
    if (capital) return "Whoa, chill out!";
    return "Whatever.";
}