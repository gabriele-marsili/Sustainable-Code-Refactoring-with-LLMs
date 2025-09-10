#include "matching_brackets.h"
#include <stdbool.h>
#include <stdlib.h>
#include <string.h>

void push_to_stack(stack_t *stack, char value) {
    if (!stack || !stack->array || stack->idx == stack->capacity) return;
    stack->array[stack->idx++] = value;
}

char pop_from_stack(stack_t *stack) {
    if (!stack || !stack->array || stack->idx == 0) return '\0';
    return stack->array[--stack->idx];
}

bool is_paired(const char *input) {
    if (!input) return true;

    size_t len = strlen(input);
    stack_t *stack = malloc(sizeof(stack_t));
    if (!stack) return false;

    stack->array = malloc(len * sizeof(char));
    if (!stack->array) {
        free(stack);
        return false;
    }
    stack->capacity = len;
    stack->idx = 0;

    for (size_t i = 0; i < len; ++i) {
        char c = input[i];
        switch (c) {
            case '[':
            case '{':
            case '(':
                push_to_stack(stack, c);
                break;
            case ']':
                if (pop_from_stack(stack) != '[') {
                    free(stack->array);
                    free(stack);
                    return false;
                }
                break;
            case '}':
                if (pop_from_stack(stack) != '{') {
                    free(stack->array);
                    free(stack);
                    return false;
                }
                break;
            case ')':
                if (pop_from_stack(stack) != '(') {
                    free(stack->array);
                    free(stack);
                    return false;
                }
                break;
        }
    }

    bool result = (stack->idx == 0);
    free(stack->array);
    free(stack);
    return result;
}

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