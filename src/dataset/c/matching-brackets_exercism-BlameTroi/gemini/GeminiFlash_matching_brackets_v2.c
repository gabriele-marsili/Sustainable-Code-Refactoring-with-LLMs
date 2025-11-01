#include "matching_brackets.h"
#include <stdbool.h>

// are all the bracket characters in the string closed and nested
// properly?
bool is_paired(const char *input) {
  // simple local stack to keep track of current active brackets
  // size is arbitrary and almost certainly too big
  const int MAXSTACK = 100;
  int sp = 0;                     // stack pointer
  char stack[MAXSTACK];           // and the stack
  char c;                         // work character

  // scan the string and keep track of brackets
  while ((c = *input++) != '\0') {
    switch (c) {
    case '{':
    case '(':
    case '[':
      if (sp >= MAXSTACK) return false; // Stack overflow check
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
      // Ignore non-bracket characters
      break;
    }
  }

  // success is being at the end of the string with an empty stack
  return (sp == 0);
}