#include "matching_brackets.h"

void push_to_stack(stack_t *stack, char value) {
    if (stack && stack->array && stack->idx < stack->capacity) {
        stack->array[stack->idx++] = value;
    }
}

char *pop_from_stack(stack_t *stack) {
    return (stack && stack->array && stack->idx > 0) ? &stack->array[--stack->idx] : NULL;
}

bool is_paired(const char *input) {
    if (!input) return false;

    size_t length = strlen(input);
    stack_t *stack = create_stack(length);
    if (!stack) return false;

    for (; *input; input++) {
        char *chr_ptr;
        switch (*input) {
            case '[': case '{': case '(':
                push_to_stack(stack, *input);
                break;
            case ']':
                chr_ptr = pop_from_stack(stack);
                if (!chr_ptr || *chr_ptr != '[')
                    return free_stack_and_return(stack, false);
                break;
            case '}':
                chr_ptr = pop_from_stack(stack);
                if (!chr_ptr || *chr_ptr != '{')
                    return free_stack_and_return(stack, false);
                break;
            case ')':
                chr_ptr = pop_from_stack(stack);
                if (!chr_ptr || *chr_ptr != '(')
                    return free_stack_and_return(stack, false);
                break;
        }
    }
    return free_stack_and_return(stack, stack->idx == 0);
}

stack_t *create_stack(size_t capacity) {
    stack_t *new_stack = malloc(sizeof(stack_t));
    if (!new_stack) return NULL;

    new_stack->array = malloc(capacity);
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