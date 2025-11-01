#include "reverse_string.h"
#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

char *reverse(const char *value) { return reverse_v1(value); }

char *reverse_v1(const char *value) {
  if (!value) return NULL;
  
  const size_t len = strlen(value);
  if (len == 0) {
    char *empty = malloc(1);
    if (empty) *empty = '\0';
    return empty;
  }

  char *reversed = malloc(len + 1);
  if (!reversed) return NULL;

  const char *src = value + len - 1;
  char *dst = reversed;
  
  while (src >= value) {
    *dst++ = *src--;
  }
  
  *dst = '\0';
  return reversed;
}

char *reverse_v2(const char *value) {
  if (!value) return NULL;

  const size_t len = strlen(value);
  if (len == 0) {
    char *empty = malloc(1);
    if (empty) *empty = '\0';
    return empty;
  }

  char *reversed = malloc(len + 1);
  if (!reversed) return NULL;

  const char *src = value;
  char *dst = reversed + len;
  
  *dst = '\0';
  while (*src) {
    *(--dst) = *src++;
  }

  return reversed;
}