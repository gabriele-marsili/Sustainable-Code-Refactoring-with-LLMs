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
    
    stack_t *stack = create_stack(len / 2 + 1);
    if (stack == NULL) return false;
    
    const char *ptr = input;
    while (*ptr != '\0') {
        switch (*ptr) {
            case '[':
            case '{':
            case '(':
                push_to_stack(stack, *ptr);
                break;
            case ']': {
                char *chr_ptr = pop_from_stack(stack);
                if (chr_ptr == NULL || *chr_ptr != '[')
                    return free_stack_and_return(stack, false);
                break;
            }
            case '}': {
                char *chr_ptr = pop_from_stack(stack);
                if (chr_ptr == NULL || *chr_ptr != '{')
                    return free_stack_and_return(stack, false);
                break;
            }
            case ')': {
                char *chr_ptr = pop_from_stack(stack);
                if (chr_ptr == NULL || *chr_ptr != '(')
                    return free_stack_and_return(stack, false);
                break;
            }
        }
        ptr++;
    }
    return free_stack_and_return(stack, stack->idx == 0);
}

stack_t *create_stack(size_t capacity) {
    if (capacity == 0) capacity = 1;
    
    stack_t *new_stack = malloc(sizeof(stack_t));
    if (new_stack == NULL) return NULL;
    
    new_stack->array = malloc(capacity);
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