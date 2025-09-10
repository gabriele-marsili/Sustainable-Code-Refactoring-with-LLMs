#include "hexadecimal.h"
#include <cctype>

int hexadecimal::convert(std::string s) {
  int result = 0;
  for (char ch : s) {
    int digit;
    if (std::isdigit(ch)) {
      digit = ch - '0';
    } else if (std::isalpha(ch)) {
      ch = std::tolower(ch);
      if (ch >= 'a' && ch <= 'f') {
        digit = ch - 'a' + 10;
      } else {
        return 0;
      }
    } else {
      return 0;
    }

    if (result > (INT_MAX / 16)) {
        return 0; 
    }
    result = (result << 4) | digit;
  }
  return result;
}