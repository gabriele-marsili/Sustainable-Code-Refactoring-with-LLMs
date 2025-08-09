#include "bob.h"
#include <ctype.h>

const char *hey_bob(char *statement) {
    int has_letter = 0;
    int has_lower = 0;
    int has_upper = 0;
    char last_non_space = '\0';
    
    for (char *p = statement; *p; p++) {
        char c = *p;
        
        if (!isspace(c)) {
            last_non_space = c;
            
            if (isalpha(c)) {
                has_letter = 1;
                if (islower(c)) {
                    has_lower = 1;
                } else {
                    has_upper = 1;
                }
            }
        }
    }
    
    if (last_non_space == '?' && (!has_letter || !has_upper || has_lower)) {
        return "Sure.";
    }
    
    if (has_letter && has_upper && !has_lower) {
        return "Whoa, chill out!";
    }
    
    if (last_non_space == '\0') {
        return "Fine. Be that way!";
    }
    
    return "Whatever.";
}