#include "bob.h"
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

char *hey_bob(char *str) {
    int len = strlen(str);
    if (len == 0) return "Fine. Be that way!";
    
    // Find last non-space character and check for letters in one pass
    int last_non_space = -1;
    int has_upper = 0;
    int has_lower = 0;
    
    for (int i = 0; i < len; i++) {
        char c = str[i];
        if (c != ' ') {
            last_non_space = i;
        }
        if (c >= 'A' && c <= 'Z') {
            has_upper = 1;
        } else if (c >= 'a' && c <= 'z') {
            has_lower = 1;
        }
    }
    
    if (last_non_space == -1) return "Fine. Be that way!";
    
    char last_char = str[last_non_space];
    
    if (!has_lower && has_upper) {
        if (last_char == '?') return "Calm down, I know what I'm doing!";
        return "Whoa, chill out!";
    }
    
    if (last_char == '?') return "Sure.";
    
    return "Whatever.";
}