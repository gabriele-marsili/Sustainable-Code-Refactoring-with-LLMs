#include "bob.h"
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h> // For 'true' and 'false'

// Note: The original 'chomp' function modifies the string in-place.
// The optimized 'hey_bob' avoids this by logically determining the string's
// effective length, thus not requiring a copy or modification of the input.
// This function is kept for signature preservation as per instructions,
// but it's not directly used by the optimized 'hey_bob'.
void chomp(char *str) {
    // Pointer to the character just before the null terminator
    char *p = str + strlen(str) - 1;

    // Iterate backwards, setting trailing spaces to null terminators
    while (p >= str && *p == ' ') {
        *p = '\0';
        p--;
    }
}

// Note: The original 'count' function iterates through the string to count characters.
// The optimized 'hey_bob' combines these checks into a single loop for efficiency.
// This function is kept for signature preservation as per instructions.
int count(char *str, int (*test)(char)) {
    int c = 0;
    for (size_t i = 0; str[i] != '\0'; i++) {
        if (test(str[i])) {
            c++;
        }
    }
    return c;
}

// These helper functions are already very efficient and are kept as is.
int upper(char c) {
    return (c >= 'A' && c <= 'Z');
}

int lower(char c) {
    return (c >= 'a' && c <= 'z');
}

// The original 'last_char' function could lead to undefined behavior for empty strings.
// This version makes it robust by handling empty strings gracefully.
char last_char(char *str) {
    size_t len = strlen(str);
    if (len == 0) {
        return '\0'; // Return null char for an empty string, indicating no last character.
    }
    return str[len - 1];
}

char *hey_bob(char *str) {
    // 1. Determine the 'effective' length of the string by ignoring trailing spaces.
    // This avoids modifying the original string and eliminates the need for malloc/strcpy.
    size_t len = strlen(str);
    size_t effective_len = len;
    while (effective_len > 0 && str[effective_len - 1] == ' ') {
        effective_len--;
    }

    // 2. Check if the 'effective' string is empty or contains only whitespace.
    // This is the first rule for Bob's responses.
    if (effective_len == 0) {
        return "Fine. Be that way!";
    }

    // 3. Perform a single pass over the 'effective' string to determine properties
    // needed for the 'yell' and 'question' checks. This replaces multiple
    // 'count' and 'last_char' calls, significantly reducing CPU cycles.
    bool has_lower_char = false;
    int num_upper_chars = 0;

    for (size_t i = 0; i < effective_len; i++) {
        char c = str[i];
        if (lower(c)) {
            has_lower_char = true;
        } else if (upper(c)) {
            num_upper_chars++;
        }
    }

    // 4. Check for "Whoa, chill out!" (yelling).
    // The original logic checks for no lowercase characters AND more than one uppercase character.
    // This condition takes precedence over "question" if both apply (e.g., "WHAT?!").
    if (!has_lower_char && num_upper_chars > 1) {
        return "Whoa, chill out!";
    }

    // 5. Check for "Sure." (question).
    // This is checked only if it's not a yell.
    if (str[effective_len - 1] == '?') {
        return "Sure.";
    }

    // 6. Default response if no other conditions are met.
    return "Whatever.";
}