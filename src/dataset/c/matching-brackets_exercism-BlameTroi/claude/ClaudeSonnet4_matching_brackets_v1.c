// exercism matching-brackets, are brackets matched and
// nested correctly?
// t.brumley, june 2022

#include "matching_brackets.h"

// Combined lookup table for bracket operations
static const char bracket_pairs[] = {
    '{', '}',
    '(', ')',
    '[', ']',
    '\0'
};

// does this open a bracket?
static bool is_opener(const char c) {
    const char *p = bracket_pairs;
    while (*p) {
        if (*p == c) return true;
        p += 2;
    }
    return false;
}

// does this close a bracket?
static bool is_closer(const char c) {
    const char *p = bracket_pairs + 1;
    while (*p) {
        if (*p == c) return true;
        p += 2;
    }
    return false;
}

// what is the opener for this closer?
static char opener_for(const char c) {
    const char *p = bracket_pairs + 1;
    while (*p) {
        if (*p == c) return *(p - 1);
        p += 2;
    }
    return '\0';
}

// are all the bracket characters in the string closed and nested
// properly?
bool is_paired(const char *input) {
    // Reduced stack size based on typical use cases
    char stack[64];
    int sp = 0;
    const char *curr = input;

    // Single pass through string with early termination
    while (*curr) {
        char c = *curr;
        
        if (is_opener(c)) {
            if (sp >= 64) return false; // Stack overflow check
            stack[sp++] = c;
        } else if (is_closer(c)) {
            if (sp == 0) return false; // No matching opener
            if (stack[--sp] != opener_for(c)) return false; // Mismatch
        }
        
        curr++;
    }

    return sp == 0;
}