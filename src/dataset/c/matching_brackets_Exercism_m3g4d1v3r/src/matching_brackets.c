#include "matching_brackets.h"

void push_to_stack(stack_t *stack, char value) {
    if (stack == NULL) return;
    if (stack->array == NULL) return;
    if (stack->idx == stack->capacity) return;
    stack->array[stack->idx++] = value;
}

char *pop_from_stack(stack_t *stack) {
    char *result;

    if (stack == NULL) return (NULL);
    if (stack->array == NULL) return (NULL);
    if (stack->idx == 0) return (NULL);
    result = &stack->array[--stack->idx];
    return (result);
}

bool is_paired(const char *input) {
    stack_t *stack;
    char *chr_ptr;

    stack = create_stack(strlen(input));
    while (*input != '\0') {
        switch (*input) {
            case '[':
            case '{':
            case '(':
                push_to_stack(stack, *input);
                break;
            case ']':
                chr_ptr = pop_from_stack(stack);
                if (chr_ptr == NULL || *chr_ptr != '[')
                    return free_stack_and_return(stack, false);
                break;
            case '}':
                chr_ptr = pop_from_stack(stack);
                if (chr_ptr == NULL || *chr_ptr != '{')
                    return free_stack_and_return(stack, false);
                break;
            case ')':
                chr_ptr = pop_from_stack(stack);
                if (chr_ptr == NULL || *chr_ptr != '(')
                    return free_stack_and_return(stack, false);
                break;
        }
        input++;
    }
    return free_stack_and_return(stack, stack->idx == 0);
}

stack_t *create_stack(size_t capacity) {
    stack_t *new_stack;

    new_stack = malloc(sizeof(stack_t));
    new_stack->array = malloc(sizeof(char) * capacity);
    new_stack->capacity = capacity;
    new_stack->idx = 0;
    return (new_stack);
}

void free_stack(stack_t *stack) {
    if (stack == NULL) return;
    if (stack->array != NULL) free(stack->array);
    free(stack);
}

bool free_stack_and_return(stack_t *stack, bool result) {
    free_stack(stack);
    return (result);
}
