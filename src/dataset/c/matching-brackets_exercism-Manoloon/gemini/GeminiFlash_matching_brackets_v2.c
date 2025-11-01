#include "matching_brackets.h"
#include <stdbool.h>
#include <stdlib.h>
#include <string.h>

bool is_paired(const char *input) {
  if (input == NULL || *input == '\0') {
    return true; // Empty string is considered paired
  }

  size_t size = strlen(input);
  char *stack = (char *)malloc(size * sizeof(char)); // Allocate on heap
  if (stack == NULL) {
    return false; // Handle allocation failure
  }

  int top = -1;

  for (size_t i = 0; i < size; ++i) {
    char curr = input[i];

    if (curr == '(' || curr == '[' || curr == '{') {
      stack[++top] = curr; // Push onto stack
    } else if (curr == ')' || curr == ']' || curr == '}') {
      if (top < 0) {
        free(stack);
        return false; // Unmatched closing bracket
      }

      char topChar = stack[top--]; // Pop from stack

      if ((curr == ')' && topChar != '(') || (curr == ']' && topChar != '[') ||
          (curr == '}' && topChar != '{')) {
        free(stack);
        return false; // Mismatched brackets
      }
    }
  }

  bool result = (top == -1); // Stack should be empty if all brackets are paired
  free(stack);
  return result;
}