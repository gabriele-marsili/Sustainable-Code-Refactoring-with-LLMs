#include "binary.h"
#include <string.h>

int convert(const char *input) {
  int val = 0;
  const char *curr = input;
  size_t len = strlen(input);

  for (size_t i = 0; i < len; ++i) {
    if (curr[i] == '0') {
      val <<= 1;
    } else if (curr[i] == '1') {
      val = (val << 1) | 1;
    } else {
      return INVALID;
    }
  }

  return val;
}