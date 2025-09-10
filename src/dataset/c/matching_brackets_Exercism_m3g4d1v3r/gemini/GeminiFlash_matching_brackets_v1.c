#include "matching_brackets.h"
#include <stdbool.h>
#include <stdlib.h>
#include <string.h>

typedef struct {
    char *array;
    size_t capacity;
    size_t idx;
} stack_t;

stack_t *create_stack(size_t capacity) {
    stack_t *new_stack = malloc(sizeof(stack_t));
    if (!new_stack) return NULL;

    new_stack->array = malloc(sizeof(char) * capacity);
    if (!new_stack->array) {
        free(new_stack);
        return NULL;
    }

    new_stack->capacity = capacity;
    new_stack->idx = 0;
    return new_stack;
}

void free_stack(stack_t *stack) {
    if (stack) {
        free(stack->array);
        free(stack);
    }
}

bool free_stack_and_return(stack_t *stack, bool result) {
    free_stack(stack);
    return result;
}

bool is_paired(const char *input) {
    if (!input) return true;

    size_t len = strlen(input);
    stack_t *stack = create_stack(len);
    if (!stack) return false;

    for (size_t i = 0; i < len; ++i) {
        char c = input[i];
        switch (c) {
            case '[':
            case '{':
            case '(':
                if (stack->idx == stack->capacity) {
                    free_stack(stack);
                    return false;
                }
                stack->array[stack->idx++] = c;
                break;
            case ']':
                if (stack->idx == 0 || stack->array[stack->idx - 1] != '[') {
                    free_stack(stack);
                    return false;
                }
                stack->idx--;
                break;
            case '}':
                if (stack->idx == 0 || stack->array[stack->idx - 1] != '{') {
                    free_stack(stack);
                    return false;
                }
                stack->idx--;
                break;
            case ')':
                if (stack->idx == 0 || stack->array[stack->idx - 1] != '(') {
                    free_stack(stack);
                    return false;
                }
                stack->idx--;
                break;
        }
    }

    bool result = (stack->idx == 0);
    free_stack(stack);
    return result;
}