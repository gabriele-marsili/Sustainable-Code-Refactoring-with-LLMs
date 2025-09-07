#include "hamming.h"

#include <stddef.h>

int compute(const char *lhs, const char *rhs) {
  if (lhs == NULL || rhs == NULL) {
    return -1;
  }

  size_t i = 0;
  while (lhs[i] != '\0' && rhs[i] != '\0') {
    i++;
  }

  if (lhs[i] != '\0' || rhs[i] != '\0') {
    return -1;
  }

  int distance = 0;
  size_t len = i;

  for (i = 0; i < len; ++i) {
    if (lhs[i] != rhs[i]) {
      distance++;
    }
  }

  return distance;
}