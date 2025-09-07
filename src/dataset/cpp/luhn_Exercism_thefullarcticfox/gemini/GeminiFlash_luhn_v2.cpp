#include "luhn.h"
#include <cctype>
#include <string>

namespace luhn {
bool valid(const std::string& str) {
  size_t digit_count = 0;
  int sum = 0;
  bool alternate = false;

  for (auto it = str.rbegin(); it != str.rend(); ++it) {
    if (std::isspace(*it)) continue;

    if (!std::isdigit(*it)) return false;

    int digit = *it - '0';
    digit_count++;

    if (alternate) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    sum += digit;
    alternate = !alternate;
  }

  return (digit_count >= 2) && (sum % 10 == 0);
}
}  // namespace luhn