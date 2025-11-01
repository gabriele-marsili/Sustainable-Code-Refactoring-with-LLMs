#include "matching_brackets.h"
#include <stdbool.h>
#include <stdlib.h>
#include <string.h>

bool is_paired(const char *input) {
  if (input == NULL) {
    return false;
  }

  size_t size = strlen(input);
  if (size == 0) {
    return true;
  }

  char *stack = (char *)malloc(size * sizeof(char));
  if (stack == NULL) {
    return false; // Handle allocation failure
  }

  int top = -1;

  for (size_t i = 0; i < size; ++i) {
    char curr = input[i];

    switch (curr) {
    case '(':
    case '[':
    case '{':
      top++;
      stack[top] = curr;
      break;

    case ')':
      if (top < 0 || stack[top] != '(') {
        free(stack);
        return false;
      }
      top--;
      break;

    case ']':
      if (top < 0 || stack[top] != '[') {
        free(stack);
        return false;
      }
      top--;
      break;

    case '}':
      if (top < 0 || stack[top] != '{') {
        free(stack);
        return false;
      }
      top--;
      break;
    }
  }

  free(stack);
  return top == -1;
}