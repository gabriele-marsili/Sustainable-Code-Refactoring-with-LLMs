// exercism matching-brackets, are brackets matched and
// nested correctly?
// t.brumley, june 2022

#include "matching_brackets.h"

// Combined bracket checking using lookup table
static inline bool process_bracket(char c, char *stack, int *sp) {
    // Using bit manipulation for faster bracket detection
    // ASCII values: ( = 40, ) = 41, [ = 91, ] = 93, { = 123, } = 125
    switch (c) {
        case '(': case '[': case '{':
            stack[(*sp)++] = c;
            return true;
        case ')':
            return *sp > 0 && stack[--(*sp)] == '(';
        case ']':
            return *sp > 0 && stack[--(*sp)] == '[';
        case '}':
            return *sp > 0 && stack[--(*sp)] == '{';
        default:
            return true; // Non-bracket characters are ignored
    }
}

// are all the bracket characters in the string closed and nested
// properly?
bool is_paired(const char *input) {
    // Reduced stack size based on typical use cases
    char stack[64];
    int sp = 0;
    
    // Single pass through string with early termination
    for (const char *curr = input; *curr; curr++) {
        // Quick check for bracket characters using ASCII ranges
        if ((*curr >= '(' && *curr <= ')') || 
            (*curr >= '[' && *curr <= ']') || 
            (*curr >= '{' && *curr <= '}')) {
            
            if (!process_bracket(*curr, stack, &sp) || sp >= 64) {
                return false;
            }
        }
    }
    
    return sp == 0;
}