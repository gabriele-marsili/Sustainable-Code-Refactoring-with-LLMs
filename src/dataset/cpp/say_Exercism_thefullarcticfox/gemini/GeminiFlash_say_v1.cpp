#include "say.h"
#include <array>
#include <stdexcept>
#include <algorithm>
#include <sstream>

namespace say {

std::string in_english(unsigned long long n) {
  if (n > 999999999999ULL) {
    throw std::domain_error("more than one trillion");
  }

  if (n == 0) {
    return "zero";
  }

  const std::array<const char*, 20> small_numbers = {
      "one",     "two",       "three",    "four",     "five",      "six",
      "seven",   "eight",     "nine",     "ten",      "eleven",    "twelve",
      "thirteen", "fourteen",  "fifteen",  "sixteen",  "seventeen", "eighteen",
      "nineteen"};

  const std::array<const char*, 8> tens = {
      "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"};

  const std::array<const char*, 3> scales = {"thousand", "million", "billion"};

  std::stringstream result;

  auto convert_under_1000 = [&](unsigned int num) {
    if (num >= 100) {
      result << small_numbers[num / 100 - 1] << " hundred";
      num %= 100;
      if (num > 0) {
        result << " ";
      }
    }

    if (num >= 20) {
      result << tens[num / 10 - 2];
      num %= 10;
      if (num > 0) {
        result << "-" << small_numbers[num - 1];
      }
    } else if (num > 0) {
      result << small_numbers[num - 1];
    }
  };

  unsigned int chunk = n % 1000;
  n /= 1000;
  if (chunk > 0) {
    convert_under_1000(chunk);
  }

  for (size_t i = 0; i < scales.size() && n > 0; ++i) {
    chunk = n % 1000;
    n /= 1000;

    if (chunk > 0) {
      if (!result.str().empty()) {
        result.seekp(0, std::ios::beg);
        std::stringstream temp;
        convert_under_1000(chunk);
        temp << result.str();
        result.str(std::string());
        result << convert_under_1000(chunk).str() << " " << scales[i] << " " << temp.str();
      } else {
        convert_under_1000(chunk);
        result << " " << scales[i];
      }
    }
  }

  return result.str();
}

} // namespace say