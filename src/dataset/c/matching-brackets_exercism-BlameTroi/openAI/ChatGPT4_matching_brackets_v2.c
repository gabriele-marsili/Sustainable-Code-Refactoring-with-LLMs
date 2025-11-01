#include "matching_brackets.h"

// does this open a bracket?
static inline bool is_opener(const char c) {
    return c == '{' || c == '(' || c == '[';
}

// does this close a bracket?
static inline bool is_closer(const char c) {
    return c == '}' || c == ')' || c == ']';
}

// what is the opener for this closer?
static inline char opener_for(const char c) {
    switch (c) {
        case '}': return '{';
        case ')': return '(';
        case ']': return '[';
        default: return '\0';
    }
}

// are all the bracket characters in the string closed and nested properly?
bool is_paired(const char *input) {
    char stack[100]; // local stack with fixed size
    int sp = 0;      // stack pointer

    for (const char *curr = input; *curr != '\0'; ++curr) {
        if (is_opener(*curr)) {
            if (sp >= 100) return false; // prevent stack overflow
            stack[sp++] = *curr;
        } else if (is_closer(*curr)) {
            if (sp == 0 || stack[--sp] != opener_for(*curr)) return false;
        }
    }

    return sp == 0; // success if stack is empty
}