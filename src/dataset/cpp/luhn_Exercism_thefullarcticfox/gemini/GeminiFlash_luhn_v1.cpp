#include "luhn.h"
#include <cctype>
#include <string>

namespace luhn {
bool valid(const std::string& str) {
  size_t len = str.length();
  int sum = 0;
  int num_digits = 0;
  bool alt = false;

  for (size_t i = len; i-- > 0;) {
    if (std::isspace(str[i])) continue;

    if (!std::isdigit(str[i])) return false;

    int digit = str[i] - '0';
    num_digits++;

    if (alt) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    alt = !alt;
  }

  return (num_digits > 1 && sum % 10 == 0);
}
}  // namespace luhn