#include "bob.h"
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// Function to remove trailing spaces from a string.
// This function modifies the string in place.
void chomp(char *str) {
    // Get the length of the string.
    size_t len = strlen(str);
    
    // If the string is empty, there's nothing to chomp.
    if (len == 0) {
        return;
    }

    // Start from the last character and move backwards.
    // If a character is a space, replace it with a null terminator.
    char *p = str + len - 1;
    while (p >= str && *p == ' ') {
        *p = '\0';
        p--;
    }
}

// Function to count characters in a string that satisfy a given test function.
// This function's signature and functionality are preserved as per instructions,
// though its direct use within hey_bob has been optimized out for specific cases.
int count(char *str, int (*test)(char)) {
    int char_count = 0;
    for(int i = 0; str[i]; i++) {
        if(test(str[i])) {
            char_count++;
        }
    }
    return char_count;
}

// Helper function to check if a character is an uppercase letter.
// Preserved as per original.
int upper(char c) {
    return (c >= 'A' && c <= 'Z');
}

// Helper function to check if a character is a lowercase letter.
// Preserved as per original.
int lower(char c) {
    return (c >= 'a' && c <= 'z');
}

// Function to return the last character of a string.
// Preserved as per original, although its direct use within hey_bob is now optimized out.
char last_char(char *str) {
    size_t len = strlen(str);
    if (len == 0) {
        // Original code implies str has length >= 1. Returning '\0' for empty string is safer.
        return '\0';
    }
    return str[len - 1];
}

// Main function to determine Bob's response based on the input string.
char *hey_bob(char *str) {
    // Allocate a mutable copy of the input string to allow for modification (chomp).
    // Add +1 for the null terminator.
    size_t original_len = strlen(str);
    char *greeting = (char *)malloc(original_len + 1);

    // Handle allocation failure. While not explicitly in the original,
    // this is good practice for robustness. Returns a default literal.
    if (greeting == NULL) {
        return "Whatever.";
    }

    // Copy the input string into the mutable buffer.
    strcpy(greeting, str);

    // Apply chomp to remove trailing spaces from the copy.
    // This modifies 'greeting' in place.
    chomp(greeting);

    // Get the new length of the string after chomping.
    size_t current_len = strlen(greeting);

    // Initialize flags and counters for the single pass optimization.
    int lower_char_count = 0;
    int upper_char_count = 0;
    int ends_with_question_mark = 0;

    // Single pass through the `greeting` string (after chomping)
    // to gather all necessary character analysis data.
    for (size_t i = 0; i < current_len; i++) {
        char c = greeting[i];
        if (upper(c)) {
            upper_char_count++;
        } else if (lower(c)) {
            lower_char_count++;
        }
    }

    // Check if the chomped string ends with a question mark.
    // This must be done after chomp, and on the effective length.
    if (current_len > 0 && greeting[current_len - 1] == '?') {
        ends_with_question_mark = 1;
    }

    char *response;

    // Apply Bob's conversational rules in their specific order of precedence.

    // Rule 1: "Fine. Be that way!"
    // This applies if the string is empty or contains only spaces after chomping.
    // `chomp` makes a string like "   " into "", so `current_len == 0` is the correct check.
    if (current_len == 0) {
        response = "Fine. Be that way!";
    }
    // Rule 2: "Whoa, chill out!"
    // Applies if there are no lowercase letters and more than one uppercase letter.
    // This implicitly means it contains actual letters, as `upper` only detects 'A'-'Z'.
    else if (lower_char_count == 0 && upper_char_count > 1) {
        response = "Whoa, chill out!";
    }
    // Rule 3: "Sure."
    // Applies if the string ends with a question mark. This rule comes after the "all caps" rule.
    else if (ends_with_question_mark) {
        response = "Sure.";
    }
    // Rule 4: "Whatever."
    // This is the default response for all other cases.
    else {
        response = "Whatever.";
    }

    // Free the dynamically allocated memory before returning.
    // This prevents memory leaks, crucial for sustainable computing.
    free(greeting);

    return response;
}