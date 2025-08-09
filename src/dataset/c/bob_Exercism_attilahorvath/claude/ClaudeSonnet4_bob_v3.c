#include "bob.h"
#include <ctype.h>

const char *hey_bob(char *statement) {
    char last_non_space = '\0';
    int has_alpha = 0;
    int has_upper = 0;
    int has_lower = 0;
    
    for (char *p = statement; *p; p++) {
        char c = *p;
        
        if (!isspace(c)) {
            last_non_space = c;
            
            if (isalpha(c)) {
                has_alpha = 1;
                if (isupper(c)) {
                    has_upper = 1;
                } else {
                    has_lower = 1;
                }
            }
        }
    }
    
    if (!last_non_space) {
        return "Fine. Be that way!";
    }
    
    if (last_non_space == '?' && (!has_alpha || !has_upper || has_lower)) {
        return "Sure.";
    }
    
    if (has_alpha && has_upper && !has_lower) {
        return "Whoa, chill out!";
    }
    
    return "Whatever.";
}