#include "roman_numerals.h"
#include <stdexcept>
#include <string>

namespace roman_numerals {
std::string convert(int arabic_num) {
  if (arabic_num <= 0) {
    if (arabic_num < 0) {
      throw std::domain_error("less than zero");
    }
    return ""; // Handle zero case explicitly
  }

  std::string result;
  result.reserve(15); // Pre-allocate memory to avoid reallocations

  static const int values[] = {1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1};
  static const char* symbols[] = {"M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"};

  for (int i = 0; i < 13; ++i) {
    while (arabic_num >= values[i]) {
      arabic_num -= values[i];
      result += symbols[i];
    }
  }

  return result;
}
} // namespace roman_numerals