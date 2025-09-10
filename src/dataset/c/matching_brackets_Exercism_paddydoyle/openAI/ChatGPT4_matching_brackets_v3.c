#include "matching_brackets.h"
#include <string.h>

#define OPENING "[{("
#define CLOSING "]})"
#define EMPTY_INDEX -1

stack_t* _create_stack(size_t size) {
	stack_t *stack = malloc(sizeof(stack_t));
	if (!stack) return NULL;

	stack->text = malloc(size + 1);
	if (!stack->text) {
		free(stack);
		return NULL;
	}

	stack->size = size;
	stack->index = EMPTY_INDEX;
	memset(stack->text, '\0', size + 1);

	return stack;
}

void _destroy_stack(stack_t *stack) {
	if (stack) {
		free(stack->text);
		free(stack);
	}
}

bool _stack_push(stack_t *stack, char bracket) {
	if (stack->index + 1 >= stack->size) return false;
	stack->text[++stack->index] = bracket;
	return true;
}

bool _stack_pop(stack_t *stack, char *bracket) {
	if (stack->index == EMPTY_INDEX) return false;
	*bracket = stack->text[stack->index--];
	return true;
}

bool _stack_is_empty(stack_t *stack) {
	return stack->index == EMPTY_INDEX;
}

bool _brackets_match(char opening, char closing) {
	return (opening == '[' && closing == ']') ||
	       (opening == '{' && closing == '}') ||
	       (opening == '(' && closing == ')');
}

bool is_paired(const char *input) {
	if (!input || !*input) return true;

	size_t input_len = strlen(input);
	stack_t *stack = _create_stack(input_len);
	if (!stack) return false;

	for (const char *ch = input; *ch; ++ch) {
		if (strchr(OPENING, *ch)) {
			if (!_stack_push(stack, *ch)) {
				_destroy_stack(stack);
				return false;
			}
		} else if (strchr(CLOSING, *ch)) {
			char popped;
			if (!_stack_pop(stack, &popped) || !_brackets_match(popped, *ch)) {
				_destroy_stack(stack);
				return false;
			}
		}
	}

	bool result = _stack_is_empty(stack);
	_destroy_stack(stack);
	return result;
}