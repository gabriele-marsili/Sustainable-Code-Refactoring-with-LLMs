#include "bob.h"
#include <string.h> // For strlen, strcpy, strcmp
#include <stdlib.h> // For malloc, free

// Helper function: Removes trailing whitespace from a string.
// The original implementation is efficient for its purpose.
void chomp(char *str) {
    size_t len = strlen(str);
    if (len == 0) {
        return; // Empty string, nothing to chomp
    }
    // Start from the last character and move backwards
    char *p = str + len - 1;
    while (p >= str && *p == ' ') {
        *p = '\0'; // Replace trailing space with null terminator
        p--;       // Move to the previous character
    }
}

// Helper function: Counts characters in a string that satisfy a given test function.
// The original implementation is efficient for its purpose.
int count(char *str, int (*test)(char)) {
    int counter = 0; // Use 'counter' to avoid naming conflict with function 'count'
    for (int i = 0; str[i]; i++) {
        if (test(str[i])) {
            counter++;
        }
    }
    return counter;
}

// Helper function: Checks if a character is an uppercase letter.
// Already optimal.
int upper(char c) {
    return 'A' <= c && c <= 'Z';
}

// Helper function: Checks if a character is a lowercase letter.
// Already optimal.
int lower(char c) {
    return 'a' <= c && c <= 'z';
}

// Helper function: Returns the last character of a string.
// This function re-calculates strlen every time it's called.
// Given the constraint of preserving function signatures, this re-calculation is unavoidable
// if `hey_bob` calls `last_char` directly.
// The original logic implicitly assumes `str` is not empty when this is called.
char last_char(char *str) {
    return str[strlen(str) - 1];
}

// Main function: Bob's responses based on input string.
char *hey_bob(char *str) {
    // Optimization goals:
    // 1. Minimize execution times (by reducing redundant operations)
    // 2. Minimize resource usage (e.g., memory, CPU)
    // 3. Avoid modifying functions' signatures (applies to all functions in the snippet)
    // 4. Follow sustainable software engineering best practices (e.g., no memory leaks)

    // Original Code Analysis:
    // - `malloc(sizeof(char) * strlen(str))` is a potential bug: it doesn't allocate space for the null terminator.
    // - The allocated `greeting` buffer is never `free`d, leading to a memory leak.
    // - Multiple `strlen` calls and full string passes occur due to calling `chomp`, `count`, `last_char` sequentially.

    // Optimizations applied:
    // 1. Correct `malloc` size to include space for the null terminator (`len + 1`).
    // 2. Fix memory leak by adding `free(greeting)` before returning.
    // 3. Keep all original functions (`chomp`, `count`, `upper`, `lower`, `last_char`, `hey_bob`)
    //    with their original signatures, as per the explicit constraint.
    //    This means `hey_bob` still calls the helper functions, incurring multiple passes over the string
    //    (e.g., `strlen` in `chomp`, `count`, `last_char`). This is a necessary compromise
    //    to adhere strictly to the "keep original functions' signatures" constraint
    //    while still providing *some* optimization (memory leak fix, correct malloc size).

    size_t len = strlen(str); // First pass: Get initial length of input string

    // Allocate memory for a mutable copy of the string.
    // Corrected `malloc` size: `len + 1` for the null terminator.
    char *greeting = malloc(sizeof(char) * (len + 1));
    if (greeting == NULL) {
        // Handle allocation failure gracefully, if possible.
        // In this context, returning a default response is one approach.
        return "Whatever.";
    }
    strcpy(greeting, str); // Second pass: Copy the string

    chomp(greeting); // Modifies 'greeting' in-place. This involves another strlen and backward pass.

    char *response;

    // Rule 1: Empty or whitespace-only string
    // `strcmp` performs a pass over `greeting`.
    if (strcmp(greeting, "") == 0) {
        response = "Fine. Be that way!";
    }
    // Rule 2: Shouting (no lowercase letters AND more than one uppercase letter)
    // Both `count` calls will iterate over `greeting`. Each `count` call also implicitly
    // does its own `strlen` by iterating to the null terminator.
    else if (count(greeting, &lower) == 0 && count(greeting, &upper) > 1) {
        response = "Whoa, chill out!";
    }
    // Rule 3: Question (ends with '?')
    // `last_char` will do another `strlen` before accessing the character.
    else if (last_char(greeting) == '?') {
        response = "Sure.";
    }
    // Rule 4: Default response
    else {
        response = "Whatever.";
    }

    free(greeting); // Crucial for minimizing resource usage and following best practices.
    return response;
}