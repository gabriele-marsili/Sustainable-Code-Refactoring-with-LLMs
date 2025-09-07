#include "hamming.h"

#include <string.h>
#include <stddef.h>

int compute(const char *lhs, const char *rhs) {
  if (lhs == NULL || rhs == NULL) {
    return -1;
  }

  size_t lhs_len = 0;
  const char *l = lhs;
  while (*l) {
    lhs_len++;
    l++;
  }

  size_t rhs_len = 0;
  const char *r = rhs;
  while (*r) {
    rhs_len++;
    r++;
  }

  if (lhs_len != rhs_len) {
    return -1;
  }

  int distance = 0;
  for (size_t i = 0; i < lhs_len; ++i) {
    distance += (lhs[i] != rhs[i]);
  }

  return distance;
}