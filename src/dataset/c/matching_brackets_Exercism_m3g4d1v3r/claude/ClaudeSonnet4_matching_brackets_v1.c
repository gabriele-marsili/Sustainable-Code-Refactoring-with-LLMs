#include "matching_brackets.h"

void push_to_stack(stack_t *stack, char value) {
    if (stack == NULL || stack->array == NULL || stack->idx == stack->capacity) return;
    stack->array[stack->idx++] = value;
}

char *pop_from_stack(stack_t *stack) {
    if (stack == NULL || stack->array == NULL || stack->idx == 0) return NULL;
    return &stack->array[--stack->idx];
}

bool is_paired(const char *input) {
    if (input == NULL) return true;
    
    size_t len = strlen(input);
    if (len == 0) return true;
    
    // Count brackets to optimize stack size
    size_t bracket_count = 0;
    for (size_t i = 0; i < len; i++) {
        char c = input[i];
        if (c == '[' || c == '{' || c == '(' || c == ']' || c == '}' || c == ')') {
            bracket_count++;
        }
    }
    
    if (bracket_count == 0) return true;
    
    stack_t *stack = create_stack((bracket_count / 2) + 1);
    if (stack == NULL) return false;
    
    const char *ptr = input;
    while (*ptr != '\0') {
        char c = *ptr;
        switch (c) {
            case '[':
            case '{':
            case '(':
                push_to_stack(stack, c);
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
        ptr++;
    }
    
    bool result = (stack->idx == 0);
    free_stack(stack);
    return result;
}

stack_t *create_stack(size_t capacity) {
    stack_t *new_stack = malloc(sizeof(stack_t));
    if (new_stack == NULL) return NULL;
    
    new_stack->array = malloc(sizeof(char) * capacity);
    if (new_stack->array == NULL) {
        free(new_stack);
        return NULL;
    }
    
    new_stack->capacity = capacity;
    new_stack->idx = 0;
    return new_stack;
}

void free_stack(stack_t *stack) {
    if (stack == NULL) return;
    free(stack->array);
    free(stack);
}

bool free_stack_and_return(stack_t *stack, bool result) {
    free_stack(stack);
    return result;
}