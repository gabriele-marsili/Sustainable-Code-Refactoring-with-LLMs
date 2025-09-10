#include "roman_numerals.h"
#include <stdexcept>
#include <string>

namespace roman_numerals {
std::string convert(int arabic_num) {
  if (arabic_num <= 0) {
    if (arabic_num < 0) {
      throw std::domain_error("less than zero");
    }
    return ""; // Or throw an exception if zero is not allowed.
  }

  static const struct {
    int value;
    const char* numeral;
  } roman_digits[] = {
    {1000, "M"}, {900, "CM"}, {500, "D"}, {400, "CD"}, {100, "C"},
    {90, "XC"},  {50, "L"},  {40, "XL"},  {10, "X"},  {9, "IX"},
    {5, "V"},   {4, "IV"},  {1, "I"}
  };
  static const size_t num_roman_digits = sizeof(roman_digits) / sizeof(roman_digits[0]);

  std::string res;
  res.reserve(16); // Pre-allocate memory to avoid reallocations

  for (size_t i = 0; i < num_roman_digits; ++i) {
    while (arabic_num >= roman_digits[i].value) {
      arabic_num -= roman_digits[i].value;
      res += roman_digits[i].numeral;
    }
  }

  return res;
}
}  // namespace roman_numerals