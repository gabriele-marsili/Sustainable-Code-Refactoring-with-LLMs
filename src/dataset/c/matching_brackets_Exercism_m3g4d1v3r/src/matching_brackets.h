#ifndef MATCHING_BRACKETS_H
#define MATCHING_BRACKETS_H

#include <stdbool.h>
#include <stddef.h>
#include <stdlib.h>
#include <string.h>

typedef struct {
    size_t capacity;
    size_t idx;
    char *array;
} stack_t;

void push_to_stack(stack_t *stack, char value);
char *pop_from_stack(stack_t *stack);
bool is_paired(const char *input);

stack_t *create_stack(size_t capacity);
void free_stack(stack_t *stack);
bool free_stack_and_return(stack_t *stack, bool result);

#endif
