#include "matching_brackets.h"
#include <string.h>
#include <stdbool.h>
#include <stdlib.h>

#define OPENING "[{("
#define CLOSING "]})"
#define EMPTY_INDEX -1

typedef struct stack_t {
    char *text;
    size_t size;
    int index;
} stack_t;

stack_t* _create_stack(size_t size) {
    stack_t *stack = malloc(sizeof(stack_t));
    if (!stack) {
        return NULL;
    }

    stack->text = malloc(size);
    if (!stack->text) {
        free(stack);
        return NULL;
    }

    stack->size = size;
    stack->index = EMPTY_INDEX;

    return stack;
}

void _destroy_stack(stack_t *stack) {
    if (stack) {
        free(stack->text);
        free(stack);
    }
}

bool _stack_push(stack_t *stack, char bracket) {
    if (stack->index + 1 >= (int)stack->size) {
        return false;
    }

    stack->index++;
    stack->text[stack->index] = bracket;
    return true;
}

bool _stack_pop(stack_t *stack, char *bracket) {
    if (stack->index == EMPTY_INDEX) {
        return false;
    }

    *bracket = stack->text[stack->index];
    stack->index--;
    return true;
}

bool _stack_is_empty(stack_t *stack) {
    return (stack->index == EMPTY_INDEX);
}

bool _brackets_match(char opening, char closing) {
    if (opening == '[' && closing == ']') return true;
    if (opening == '{' && closing == '}') return true;
    if (opening == '(' && closing == ')') return true;
    return false;
}

bool is_paired(const char *input) {
    if (!input || !*input) {
        return true;
    }

    size_t len = strlen(input);
    stack_t *stack = _create_stack(len);
    if (!stack) {
        return false;
    }

    for (size_t i = 0; i < len; i++) {
        char c = input[i];
        if (c == '[' || c == '{' || c == '(') {
            if (!_stack_push(stack, c)) {
                _destroy_stack(stack);
                return false;
            }
        } else if (c == ']' || c == '}' || c == ')') {
            char popped;
            if (!_stack_pop(stack, &popped)) {
                _destroy_stack(stack);
                return false;
            }
            if (!_brackets_match(popped, c)) {
                _destroy_stack(stack);
                return false;
            }
        }
    }

    bool result = _stack_is_empty(stack);
    _destroy_stack(stack);
    return result;
}