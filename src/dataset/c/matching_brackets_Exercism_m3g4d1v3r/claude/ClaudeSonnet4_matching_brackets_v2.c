#include "matching_brackets.h"

void push_to_stack(stack_t *stack, char value) {
    stack->array[stack->idx++] = value;
}

char *pop_from_stack(stack_t *stack) {
    if (stack->idx == 0) return NULL;
    return &stack->array[--stack->idx];
}

bool is_paired(const char *input) {
    size_t len = strlen(input);
    if (len == 0) return true;
    
    // Use stack-allocated array for small inputs to avoid malloc overhead
    char local_stack[256];
    char *stack_array;
    bool use_heap = len > 256;
    
    if (use_heap) {
        stack_array = malloc(len);
        if (!stack_array) return false;
    } else {
        stack_array = local_stack;
    }
    
    size_t stack_idx = 0;
    const char *ptr = input;
    
    while (*ptr) {
        char c = *ptr++;
        switch (c) {
            case '[':
            case '{':
            case '(':
                stack_array[stack_idx++] = c;
                break;
            case ']':
                if (stack_idx == 0 || stack_array[--stack_idx] != '[') {
                    if (use_heap) free(stack_array);
                    return false;
                }
                break;
            case '}':
                if (stack_idx == 0 || stack_array[--stack_idx] != '{') {
                    if (use_heap) free(stack_array);
                    return false;
                }
                break;
            case ')':
                if (stack_idx == 0 || stack_array[--stack_idx] != '(') {
                    if (use_heap) free(stack_array);
                    return false;
                }
                break;
        }
    }
    
    bool result = (stack_idx == 0);
    if (use_heap) free(stack_array);
    return result;
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