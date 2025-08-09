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
    for(int i = 0; str[i]; i++) { if(test(str[i])) count++; }
    return count;
}

int upper(char c) { return 'A' <= c && c <= 'Z'; }
int lower(char c) { return 'a' <= c && c <= 'z'; }
char last_char(char *str) { return str[strlen(str) - 1]; }

char *hey_bob(char *str) {
    // Calculate the length of the string once to avoid repeated calls to strlen.
    size_t len = strlen(str);

    // Find the effective end of the string by skipping trailing spaces.
    // This effectively "chomps" the string without modifying it or allocating new memory.
    // Using long for effective_end_idx to correctly handle cases where len is 0.
    long effective_end_idx = len - 1;
    while (effective_end_idx >= 0 && str[effective_end_idx] == ' ') {
        effective_end_idx--;
    }

    // Rule 1: Empty or whitespace-only string
    // If effective_end_idx is less than 0, it means no non-space characters were found.
    if (effective_end_idx < 0) {
        return "Fine. Be that way!";
    }

    // Analyze the content of the "effective" string (from index 0 up to effective_end_idx).
    // This single pass gathers information needed for the shouting rule.
    int num_upper = 0;
    int num_lower = 0;
    for (int i = 0; i <= effective_end_idx; i++) {
        if (upper(str[i])) {
            num_upper++;
        } else if (lower(str[i])) {
            num_lower++;
        }
    }

    // Rule 2: Shouting (all uppercase letters and more than one uppercase letter)
    // This condition exactly matches the original `count(greeting, &lower) == 0 && count(greeting, &upper) > 1`.
    if (num_lower == 0 && num_upper > 1) {
        return "Whoa, chill out!";
    }

    // Rule 3: Question (last non-space character is '?')
    // Check the character at the effective_end_idx.
    if (str[effective_end_idx] == '?') {
        return "Sure.";
    }

    // Rule 4: Default response
    return "Whatever.";
}