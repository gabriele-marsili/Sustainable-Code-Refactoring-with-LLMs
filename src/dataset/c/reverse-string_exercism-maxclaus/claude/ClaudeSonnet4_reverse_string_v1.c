#include "reverse_string.h"
#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

char *reverse(const char *value) { return reverse_v1(value); }

// First version, built on my own
char *reverse_v1(const char *value) {
  if (!value) return NULL;
  
  int len = strlen(value);
  if (len == 0) {
    char *empty = malloc(1);
    *empty = '\0';
    return empty;
  }

  // Use malloc instead of calloc since we're filling all positions
  char *reversed = malloc(len + 1);
  
  // Copy characters in reverse order
  const char *src = value + len - 1;
  char *dst = reversed;
  
  while (src >= value) {
    *dst++ = *src--;
  }
  
  *dst = '\0';
  
  return reversed;
}

// Second version based on
// https://exercism.org/tracks/c/exercises/reverse-string/solutions/bobahop
// It works based on pointers instead of values.
// It uses pointer arithmetic to manipulate the content of value and reversed
// variables.
char *reverse_v2(const char *value) {
  if (!value)
    return NULL;

  int len = strlen(value);
  if (len == 0) {
    char *empty = malloc(1);
    *empty = '\0';
    return empty;
  }

  // Use malloc instead of calloc
  char *reversed = malloc(len + 1);
  char *result = reversed;

  reversed += len - 1;
  
  while (*value) {
    *reversed-- = *value++;
  }

  result[len] = '\0';
  
  return result;
}