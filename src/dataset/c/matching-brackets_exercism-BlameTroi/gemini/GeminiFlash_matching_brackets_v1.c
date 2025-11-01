// exercism matching-brackets, are brackets matched and
// nested correctly?
// t.brumley, june 2022

#include "matching_brackets.h"
#include <stdbool.h>

// are all the bracket characters in the string closed and nested
// properly?
bool is_paired(const char *input) {
    // simple local stack to keep track of current active brackets
    // size is arbitrary and almost certainly too big
#define MAXSTACK 100
    int sp = 0;                     // stack pointer
    char stack[MAXSTACK];           // and the stack
    char c;                         // work character

    // scan the string and keep track of brackets
    for (const char *curr = input; *curr != '\0'; ++curr) {
        c = *curr;
        if (c == '{' || c == '(' || c == '[') {
            if (sp >= MAXSTACK) return false; // Stack overflow
            stack[sp++] = c;
        } else if (c == '}' || c == ')' || c == ']') {
            if (sp == 0) return false; // Unmatched closing bracket

            char opener;
            if (c == '}') opener = '{';
            else if (c == ')') opener = '(';
            else opener = '[';

            if (stack[--sp] != opener) return false; // Mismatched brackets
        }
    }

    // success is being at the end of the string with an empty stack
    return (sp == 0);
}