#include "reverse_string.h"
#include <stdlib.h>
#include <string.h>

char *reverse(const char *value) { return reverse_optimized(value); }

char *reverse_optimized(const char *value) {
  if (!value) {
    return NULL;
  }

  size_t len = strlen(value);
  char *reversed = (char *)malloc(len + 1); // Use malloc directly

  if (!reversed) {
    return NULL; // Handle allocation failure
  }

  for (size_t i = 0; i < len; ++i) {
    reversed[i] = value[len - 1 - i];
  }

  reversed[len] = '\0';

  return reversed;
}