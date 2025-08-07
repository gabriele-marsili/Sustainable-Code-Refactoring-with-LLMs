#include "bob.h"
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h> // For true/false

// chomp function: Removes trailing spaces from the end of a string in-place.
// Optimized to calculate length once and handle empty strings safely.
void chomp(char *str) {
    size_t len = strlen(str);
    if (len == 0) {
        return; // No characters to chomp in an empty string
    }

    // Start from the character just before the null terminator.
    char *p = str + len - 1;

    // Iterate backwards, null-terminating any trailing spaces.
    while (p >= str && *p == ' ') {
        *p = '\0';
        p--;
    }
}

// count function: Counts characters in a string that satisfy a test function.
// Kept as per signature requirement, even if hey_bob is optimized not to use it directly.
int count(char *str, int (*test)(char)) {
    int char_count = 0;
    for(int i = 0; str[i]; i++) {
        if(test(str[i])) {
            char_count++;
        }
    }
    return char_count;
}

// upper function: Checks if a character is an uppercase letter (A-Z).
// Kept as per signature requirement.
int upper(char c) {
    return (c >= 'A' && c <= 'Z');
}

// lower function: Checks if a character is a lowercase letter (a-z).
// Kept as per signature requirement.
int lower(char c) {
    return (c >= 'a' && c <= 'z');
}

// last_char function: Returns the last character of a string.
// Optimized to handle empty strings safely by returning a null character.
char last_char(char *str) {
    size_t len = strlen(str);
    if (len == 0) {
        return '\0'; // Return null character for an empty string
    }
    return str[len - 1];
}

// hey_bob function: Determines Bob's response based on the input string.
// Optimized for fewer string passes, reduced resource usage, and proper memory management.
char *hey_bob(char *str) {
    // 1. Allocate a mutable copy of the input string.
    // Calculate initial length to ensure correct allocation size (+1 for null terminator).
    size_t original_len = strlen(str);
    char *greeting = malloc(original_len + 1);

    // Handle memory allocation failure. This is a crucial sustainability practice.
    if (greeting == NULL) {
        // Returning a static error message is a safe fallback for this problem context.
        return "Error: Memory allocation failed.";
    }

    // Copy the original string content to the newly allocated buffer.
    strcpy(greeting, str);

    // 2. Chomp the trailing spaces from the copied string.
    // This modifies 'greeting' in-place and is done once.
    chomp(greeting);

    // 3. Get the length of the string after chomping. This new length
    // is crucial for subsequent logic and avoids re-calculating strlen repeatedly.
    size_t chomped_len = strlen(greeting);

    // --- Evaluate Bob's responses based on conditions ---

    // Condition A: Silence - Responds "Fine. Be that way!" if the chomped string is empty.
    if (chomped_len == 0) {
        free(greeting); // Free the allocated memory before returning
        return "Fine. Be that way!";
    }

    // Optimization: Perform a single pass over the chomped string to gather
    // all information needed for the "Yelling" and "Question" conditions.
    int upper_case_count = 0;
    int lower_case_count = 0;
    bool ends_with_question_mark = false;

    // Iterate through the chomped string once.
    for (size_t i = 0; i < chomped_len; i++) {
        char c = greeting[i];
        if (upper(c)) { // Utilize the provided `upper` helper function
            upper_case_count++;
        } else if (lower(c)) { // Utilize the provided `lower` helper function
            lower_case_count++;
        }
    }

    // Check if the chomped string ends with a question mark.
    // This is done after the loop using the `chomped_len`.
    if (greeting[chomped_len - 1] == '?') {
        ends_with_question_mark = true;
    }

    // Condition B: Yelling - Responds "Whoa, chill out!" if the chomped string
    // contains no lowercase letters AND more than one uppercase letter.
    // This directly uses the counts from our single pass.
    if (lower_case_count == 0 && upper_case_count > 1) {
        free(greeting); // Free allocated memory
        return "Whoa, chill out!";
    }

    // Condition C: Question - Responds "Sure." if the chomped string ends with a question mark.
    // This condition is checked after "Yelling" as per the original control flow order.
    if (ends_with_question_mark) {
        free(greeting); // Free allocated memory
        return "Sure.";
    }

    // Condition D: Default - Responds "Whatever." for all other cases.
    free(greeting); // Free allocated memory before returning the default response
    return "Whatever.";
}