#include "hamming.h"
#include <stddef.h>

int compute(const char *lhs, const char *rhs) {
  if (!lhs || !rhs) return -1;

  size_t len = 0;
  while (lhs[len] != '\0' && rhs[len] != '\0') {
    len++;
  }

  if (lhs[len] != '\0' || rhs[len] != '\0') return -1;

  int hamming = 0;
  for (size_t i = 0; i < len; i++) {
    if (lhs[i] != rhs[i]) {
      hamming++;
    }
  }
  return hamming;
}