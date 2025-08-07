#include "bob.h"
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

char *hey_bob(char *str) {
    // Find the end of the string, skipping trailing spaces
    int len = strlen(str);
    int end = len - 1;
    while (end >= 0 && str[end] == ' ') {
        end--;
    }
    
    // Check if string is empty after trimming
    if (end < 0) {
        return "Fine. Be that way!";
    }
    
    // Single pass analysis
    int has_upper = 0;
    int has_lower = 0;
    int is_question = (str[end] == '?');
    
    for (int i = 0; i <= end; i++) {
        char c = str[i];
        if (c >= 'A' && c <= 'Z') {
            has_upper = 1;
        } else if (c >= 'a' && c <= 'z') {
            has_lower = 1;
        }
        
        // Early exit if we found both cases
        if (has_upper && has_lower) {
            break;
        }
    }
    
    // Determine response
    if (!has_lower && has_upper) {
        return "Whoa, chill out!";
    } else if (is_question) {
        return "Sure.";
    }
    
    return "Whatever.";
}

void chomp(char *str) {
    for(char *p = strlen(str) + str - 1; str <= p && *p == ' '; p--) {
        *p = '\0';
    }
}

int count(char *str, int (*test)(char)) {
    int count = 0;
    for(int i = 0; str[i]; i++) { if(test(str[i])) count++; }
    return count;
}

int upper(char c) { return 'A' <= c && c <= 'Z'; }
int lower(char c) { return 'a' <= c && c <= 'z'; }
char last_char(char *str) { return str[strlen(str) - 1]; }