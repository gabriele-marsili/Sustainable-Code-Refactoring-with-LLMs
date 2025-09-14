#include "matching_brackets.h"
#include <string.h>

#define OPENING "[{("
#define CLOSING "]})"
#define EMPTY_INDEX -1

stack_t* _create_stack(size_t size) {
	stack_t *stack;

	if ((stack = malloc(sizeof(stack_t))) == NULL) {
		return NULL;
	}

	if ((stack->text = malloc(size)) == NULL) {
		free(stack);
		return NULL;
	}

	stack->size = size;
	stack->index = EMPTY_INDEX;

	return stack;
}

void _destroy_stack(stack_t *stack) {
	if (stack == NULL) {
		return;
	}

	free(stack->text);
	free(stack);
}

bool _stack_push(stack_t *stack, char bracket) {
	if (stack->index + 1 >= stack->size) {
		return false;
	}

	stack->text[++stack->index] = bracket;
	return true;
}

bool _stack_pop(stack_t *stack, char *bracket) {
	if (stack->index == EMPTY_INDEX) {
		return false;
	}

	*bracket = stack->text[stack->index--];
	return true;
}

bool _stack_is_empty(stack_t *stack) {
	return (stack->index == EMPTY_INDEX);
}

bool _stack_is_full(stack_t *stack) {
	return (stack->index + 1 >= stack->size);
}

bool _brackets_match(char opening, char closing) {
	return ((opening == '[' && closing == ']') ||
	        (opening == '{' && closing == '}') ||
	        (opening == '(' && closing == ')'));
}

bool is_paired(const char *input) {
	if (input == NULL) {
		return true;
	}

	size_t len = strlen(input);
	if (len == 0) {
		return true;
	}

	stack_t *stack = _create_stack(len);
	if (stack == NULL) {
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
			if (!_stack_pop(stack, &popped) || !_brackets_match(popped, c)) {
				_destroy_stack(stack);
				return false;
			}
		}
	}

	bool result = _stack_is_empty(stack);
	_destroy_stack(stack);
	return result;
}