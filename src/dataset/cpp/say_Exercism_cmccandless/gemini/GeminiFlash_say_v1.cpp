#include "say.h"
#include <stdexcept>
#include <string>
#include <vector>

namespace say {

const std::vector<std::string> digits = {
    "zero", "one", "two", "three", "four", "five", "six", "seven", "eight",
    "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen",
    "sixteen", "seventeen", "eighteen", "nineteen"};

const std::vector<std::string> tens = {
    "", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty",
    "ninety"};

const std::vector<std::pair<unsigned long long, std::string>> modifiers = {
    {1000000000ULL, " billion"}, {1000000ULL, " million"},
    {1000ULL, " thousand"}, {100ULL, " hundred"}};

std::string in_english(unsigned long long x) {
  if (x > 999999999999ULL) {
    throw std::domain_error("Number too large");
  }

  if (x < 20) {
    return digits[x];
  }

  if (x < 100) {
    std::string result = tens[x / 10];
    unsigned long long r = x % 10;
    if (r > 0) {
      result += "-" + in_english(r);
    }
    return result;
  }

  for (const auto &modifier : modifiers) {
    unsigned long long mod = modifier.first;
    const std::string &label = modifier.second;

    if (x >= mod) {
      unsigned long long q = x / mod;
      unsigned long long r = x % mod;

      std::string result = in_english(q) + label;
      if (r > 0) {
        result += " " + in_english(r);
      }
      return result;
    }
  }

  throw std::domain_error("Invalid input");
}

} // namespace say