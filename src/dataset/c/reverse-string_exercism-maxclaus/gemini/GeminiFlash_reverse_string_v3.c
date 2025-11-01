#include "reverse_string.h"
#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

char *reverse(const char *value) { return reverse_v3(value); }

char *reverse_v1(const char *value) {
  int len = strlen(value);
  char *reversed = (char *)malloc(len + 1);
  if (reversed == NULL) return NULL;

  for (int i = len - 1; i >= 0; i--) {
    reversed[len - i - 1] = value[i];
  }

  reversed[len] = '\0';

  return reversed;
}

char *reverse_v2(const char *value) {
  if (!value) return NULL;

  int len = strlen(value);
  char *reversed = (char *)malloc(len + 1);
  if (reversed == NULL) return NULL;

  char *p = reversed + len;
  const char *q = value;

  while (*q) {
    *(--p) = *q++;
  }

  reversed[len] = '\0';

  return reversed;
}

char *reverse_v3(const char *value) {
  if (!value) return NULL;

  int len = strlen(value);
  char *reversed = (char *)malloc(len + 1);
  if (reversed == NULL) return NULL;

  for (int i = 0; i < len; i++) {
    reversed[i] = value[len - 1 - i];
  }

  reversed[len] = '\0';

  return reversed;
}