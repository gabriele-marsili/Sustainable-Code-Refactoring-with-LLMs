#include "bob.h"
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

void chomp(char *str) {
    for(char *p = strlen(str) + str - 1; str <= p && *p == ' '; p--) {
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
    // Determine the effective length of the string after removing trailing spaces,
    // which simulates the effect of chomp without modifying the input string
    // or allocating a new one.
    int str_len = 0;
    while (str[str_len] != '\0') {
        str_len++;
    }

    int effective_end_idx = str_len - 1;
    while (effective_end_idx >= 0 && str[effective_end_idx] == ' ') {
        effective_end_idx--;
    }

    // If effective_end_idx is -1, the string was empty or contained only spaces.
    // This maps to the `strcmp(greeting, "") == 0` condition.
    if (effective_end_idx == -1) {
        return "Fine. Be that way!";
    }

    // Now, iterate through the "chomped" part of the string to gather properties
    // like letter counts and the last non-space character.
    int upper_case_letters = 0;
    int lower_case_letters = 0;
    char last_significant_char = '\0'; // Will hold the last non-space character

    for (int i = 0; i <= effective_end_idx; i++) {
        char c = str[i];
        if (upper(c)) {
            upper_case_letters++;
        } else if (lower(c)) {
            lower_case_letters++;
        }
        // The last character after trimming whitespace is at effective_end_idx
        // This is equivalent to last_char(chomped_string)
        if (i == effective_end_idx) {
            last_significant_char = c;
        }
    }

    // Check for "shouting" condition: no lowercase letters and more than one uppercase letter.
    // This implicitly means it contains letters, as upper_case_letters > 1 would be true.
    if (lower_case_letters == 0 && upper_case_letters > 1) {
        return "Whoa, chill out!";
    }
    // Check for "question" condition: the last non-space character is '?'.
    else if (last_significant_char == '?') {
        return "Sure.";
    }

    // Default response
    return "Whatever.";
}