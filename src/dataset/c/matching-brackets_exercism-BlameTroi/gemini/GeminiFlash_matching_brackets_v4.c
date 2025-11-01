#include "matching_brackets.h"
#include <stdbool.h>

bool is_paired(const char *input) {
  if (input == NULL || *input == '\0') {
    return true;
  }

  const char *curr = input;
  char stack[100];
  int sp = 0;

  while (*curr != '\0') {
    char c = *curr;
    switch (c) {
      case '{':
      case '(':
      case '[':
        if (sp >= 100) return false;
        stack[sp++] = c;
        break;
      case '}':
        if (sp == 0 || stack[--sp] != '{') return false;
        break;
      case ')':
        if (sp == 0 || stack[--sp] != '(') return false;
        break;
      case ']':
        if (sp == 0 || stack[--sp] != '[') return false;
        break;
      default:
        break;
    }
    curr++;
  }

  return sp == 0;
}