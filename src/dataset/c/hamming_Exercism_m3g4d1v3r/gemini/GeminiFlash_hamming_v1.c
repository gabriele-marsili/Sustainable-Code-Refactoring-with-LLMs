#include "hamming.h"

#include <stddef.h>

int compute(const char *lhs, const char *rhs) {
  if (!lhs || !rhs) {
    return -1;
  }

  size_t lhs_len = 0;
  while (lhs[lhs_len] != '\0') {
    lhs_len++;
  }

  size_t rhs_len = 0;
  while (rhs[rhs_len] != '\0') {
    rhs_len++;
  }


  if (lhs_len != rhs_len) {
    return -1;
  }

  int distance = 0;
  for (size_t i = 0; i < lhs_len; ++i) {
    if (lhs[i] != rhs[i]) {
      distance++;
    }
  }

  return distance;
}