#include "matching_brackets.h"
#include <stdbool.h>

bool is_paired(const char *input) {
    if (input == NULL) return true;

    const char *curr = input;
    char stack[128]; // Reduced stack size, typical nesting depth is unlikely to exceed this.
    int sp = 0;

    while (*curr != '\0') {
        char c = *curr;
        switch (c) {
            case '{':
            case '(':
            case '[':
                if (sp >= sizeof(stack)) return false; // Stack overflow check
                stack[sp++] = c;
                break;
            case '}':
                if (sp == 0 || stack[sp - 1] != '{') return false;
                sp--;
                break;
            case ')':
                if (sp == 0 || stack[sp - 1] != '(') return false;
                sp--;
                break;
            case ']':
                if (sp == 0 || stack[sp - 1] != '[') return false;
                sp--;
                break;
            default:
                // Ignore non-bracket characters
                break;
        }
        curr++;
    }

    return sp == 0;
}