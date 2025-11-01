#include "reverse_string.h"
#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

char *reverse(const char *value) { return reverse_v1(value); }

char *reverse_v1(const char *value) {
  if (!value || *value == '\0') // Handle null or empty string
    return strdup("");

  int len = strlen(value);
  char *reversed = malloc(len + 1); // Use malloc instead of calloc for efficiency

  if (!reversed) // Check for allocation failure
    return NULL;

  for (int i = 0; i < len; i++) {
    reversed[i] = value[len - i - 1];
  }

  reversed[len] = '\0'; // Null terminator
  return reversed;
}

char *reverse_v2(const char *value) {
  if (!value || *value == '\0') // Handle null or empty string
    return strdup("");

  int len = strlen(value);
  char *reversed = malloc(len + 1); // Use malloc instead of calloc for efficiency

  if (!reversed) // Check for allocation failure
    return NULL;

  char *start = reversed;
  const char *end = value + len - 1;

  while (end >= value) {
    *start++ = *end--;
  }

  *start = '\0'; // Null terminator
  return reversed;
}