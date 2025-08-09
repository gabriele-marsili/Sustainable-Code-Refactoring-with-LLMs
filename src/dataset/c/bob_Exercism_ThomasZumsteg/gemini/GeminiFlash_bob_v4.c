#include "bob.h"
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

void chomp(char *str) {
    for(char *p = str + strlen(str) - 1; str <= p && *p == ' '; p--) {
        *p = '\0';
    }
}

int count(char *str, int (*test)(char)) {
    int count = 0;
    for(int i = 0; str[i]; i++) {
        if(test(str[i])) {
            count++;
        }
    }
    return count;
}

int upper(char c) {
    return 'A' <= c && c <= 'Z';
}

int lower(char c) {
    return 'a' <= c && c <= 'z';
}

char last_char(char *str) {
    return str[strlen(str) - 1];
}

char *hey_bob(char *str) {
    // Optimized implementation:
    // 1. Eliminates dynamic memory allocation (malloc/strcpy) and associated leaks.
    //    The 'greeting' buffer in the original code was only for internal computation
    //    and its memory was never freed, leading to a leak.
    // 2. Reduces redundant string traversals by consolidating logic into fewer passes.
    // 3. Operates directly on the input string to determine relevant characteristics
    //    without modifying it or creating unnecessary copies.

    // Get the initial length of the string once.
    size_t len = strlen(str);

    // 1. Determine the effective length of the string after "chomping" trailing spaces.
    //    This simulates the effect of `chomp` without modifying the original string.
    size_t effective_len = len;
    while (effective_len > 0 && str[effective_len - 1] == ' ') {
        effective_len--;
    }

    // Condition 1: String is empty or contains only spaces after "chomping".
    // This directly covers the original `strcmp(greeting, "") == 0` check.
    if (effective_len == 0) {
        return "Fine. Be that way!";
    }

    // 2. Count upper and lower case characters within the effective string.
    //    The character at `effective_len - 1` is also the "last character"
    //    after chomping, so we'll store it for the '?' check.
    int lower_count = 0;
    int upper_count = 0;

    for (size_t i = 0; i < effective_len; i++) {
        char current_char = str[i];
        if (lower(current_char)) {
            lower_count++;
        } else if (upper(current_char)) {
            upper_count++;
        }
    }

    // Condition 2: Is it an all-caps question (no lowercase, and more than one uppercase)?
    // This covers the original `count(greeting, &lower) == 0 && count(greeting, &upper) > 1` logic.
    if (lower_count == 0 && upper_count > 1) {
        return "Whoa, chill out!";
    }

    // Condition 3: Does it end with a question mark (after chomping)?
    // This covers the original `last_char(greeting) == '?'` logic.
    if (str[effective_len - 1] == '?') {
        return "Sure.";
    }

    // Default response if no other conditions are met.
    return "Whatever.";
}