#include "reverse_string.h"
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

char *reverse(const char *value) { return reverse_v1(value); }

char *reverse_v1(const char *value) {
  if (!value || !*value) return strdup("");

  int len = strlen(value);
  char *reversed = malloc(len + 1);
  if (!reversed) return NULL;

  for (int i = 0; i < len; i++) {
    reversed[i] = value[len - i - 1];
  }
  reversed[len] = '\0';

  return reversed;
}

char *reverse_v2(const char *value) {
  if (!value || !*value) return strdup("");

  int len = strlen(value);
  char *reversed = malloc(len + 1);
  if (!reversed) return NULL;

  char *end = reversed + len;
  *end-- = '\0';

  while (*value) {
    *end-- = *value++;
  }

  return reversed;
}