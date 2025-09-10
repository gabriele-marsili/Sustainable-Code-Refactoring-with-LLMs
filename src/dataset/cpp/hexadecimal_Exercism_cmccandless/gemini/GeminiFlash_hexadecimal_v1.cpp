#include "hexadecimal.h"
#include <algorithm>

int hexadecimal::convert(std::string s) {
  int result = 0;
  for (char ch : s) {
    int digit;
    if (ch >= '0' && ch <= '9') {
      digit = ch - '0';
    } else if (ch >= 'a' && ch <= 'f') {
      digit = ch - 'a' + 10;
    } else if (ch >= 'A' && ch <= 'F') {
      digit = ch - 'A' + 10;
    } else {
      return 0;
    }

    if (result > (INT_MAX / 16)) return 0; // Check for potential overflow before multiplication

    result = (result << 4) | digit; // Equivalent to result * 16 + digit, but faster
  }
  return result;
}