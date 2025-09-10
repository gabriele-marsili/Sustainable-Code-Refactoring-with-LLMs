#include "trinary.h"
#include <algorithm>

int trinary::to_decimal(std::string s) {
  int result = 0;
  size_t len = s.length();

  for (size_t i = 0; i < len; ++i) {
    char ch = s[i];
    int x = ch - '0';

    if (x > 2 || x < 0) {
      return 0;
    }

    result = result * 3 + x;
  }

  return result;
}