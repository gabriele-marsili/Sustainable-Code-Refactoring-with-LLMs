#include "largest_series_product.h"
#include <ctype.h>
#include <stddef.h>
#include <string.h>

int64_t largest_series_product(const char *input, const int series) {
  if (series == 0) {
    return 1;
  }

  if (input == NULL || series < 0) {
    return -1;
  }

  size_t len = strlen(input);

  if (len < (size_t)series) {
    return -1;
  }

  int64_t res = 0;

  for (size_t i = 0; i <= len - (size_t)series; ++i) {
    int64_t tmp = 1;
    for (int j = 0; j < series; ++j) {
      if (!isdigit(input[i + j])) {
        return -1;
      }
      tmp *= (input[i + j] - '0');
    }
    if (tmp > res) {
      res = tmp;
    }
  }

  return res;
}