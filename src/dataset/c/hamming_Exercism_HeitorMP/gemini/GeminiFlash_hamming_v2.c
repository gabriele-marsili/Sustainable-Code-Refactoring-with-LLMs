#include "hamming.h"
#include <string.h>
#include <stddef.h>

int compute(const char *lhs, const char *rhs) {
  size_t len_lhs = strlen(lhs);
  if (len_lhs != strlen(rhs)) {
    return -1;
  }

  int hamming = 0;
  for (size_t i = 0; i < len_lhs; ++i) {
    if (lhs[i] != rhs[i]) {
      hamming++;
    }
  }
  return hamming;
}