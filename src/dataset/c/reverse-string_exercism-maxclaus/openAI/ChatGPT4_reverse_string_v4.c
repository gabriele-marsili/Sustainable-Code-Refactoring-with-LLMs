#include "reverse_string.h"
#include <stdlib.h>
#include <string.h>

char *reverse(const char *value) { return reverse_v1(value); }

char *reverse_v1(const char *value) {
  if (!value || !*value)
    return strdup("");

  size_t len = strlen(value);
  char *reversed = malloc(len + 1);
  if (!reversed)
    return NULL;

  for (size_t i = 0; i < len; i++) {
    reversed[i] = value[len - i - 1];
  }
  reversed[len] = '\0';

  return reversed;
}

char *reverse_v2(const char *value) {
  if (!value || !*value)
    return strdup("");

  size_t len = strlen(value);
  char *reversed = malloc(len + 1);
  if (!reversed)
    return NULL;

  char *start = reversed;
  const char *end = value + len - 1;

  while (end >= value) {
    *start++ = *end--;
  }
  *start = '\0';

  return reversed;
}