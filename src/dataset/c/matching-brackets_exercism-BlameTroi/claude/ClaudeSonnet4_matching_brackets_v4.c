#include "matching_brackets.h"

static inline bool is_opener(const char c) {
    return (c == '{') | (c == '(') | (c == '[');
}

static inline bool is_closer(const char c) {
    return (c == '}') | (c == ')') | (c == ']');
}

static inline char opener_for(const char c) {
    switch (c) {
        case '}': return '{';
        case ')': return '(';
        case ']': return '[';
        default: return '\0';
    }
}

bool is_paired(const char *input) {
    char stack[64];
    int sp = 0;
    
    for (const char *curr = input; *curr; curr++) {
        if (is_opener(*curr)) {
            if (sp >= 64) return false;
            stack[sp++] = *curr;
        } else if (is_closer(*curr)) {
            if (sp == 0 || stack[--sp] != opener_for(*curr)) {
                return false;
            }
        }
    }
    
    return sp == 0;
}