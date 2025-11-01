#include "matching_brackets.h"
#include <stdbool.h>
#include <stdlib.h>
#include <string.h>

bool is_paired(const char *input) {
    if (input == NULL || *input == '\0') return true;

    size_t size = strlen(input);
    char *stack = (char *)malloc(size * sizeof(char));
    if (!stack) return false; 

    int top = -1;
    for (size_t i = 0; i < size; ++i) {
        char curr = input[i];
        switch (curr) {
            case '(':
            case '[':
            case '{':
                if (top + 1 >= (int)size) {
                    free(stack);
                    return false;
                }
                stack[++top] = curr;
                break;
            case ')':
                if (top < 0 || stack[top] != '(') {
                    free(stack);
                    return false;
                }
                top--;
                break;
            case ']':
                if (top < 0 || stack[top] != '[') {
                    free(stack);
                    return false;
                }
                top--;
                break;
            case '}':
                if (top < 0 || stack[top] != '{') {
                    free(stack);
                    return false;
                }
                top--;
                break;
            default:
                break;
        }
    }

    free(stack);
    return top == -1;
}