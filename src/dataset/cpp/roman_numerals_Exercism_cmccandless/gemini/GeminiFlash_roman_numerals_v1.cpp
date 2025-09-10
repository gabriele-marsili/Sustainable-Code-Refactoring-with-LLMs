#include "roman_numerals.h"
#include <array>

namespace roman {

const std::array<std::pair<int, const char*>, 13> roman_map = {
    {{1000, "M"}, {900, "CM"}, {500, "D"}, {400, "CD"}, {100, "C"}, {90, "XC"},
     {50, "L"}, {40, "XL"}, {10, "X"}, {9, "IX"}, {5, "V"}, {4, "IV"}, {1, "I"}}
};

std::string convert(int number) {
  std::string result;
  result.reserve(16); 

  for (const auto& pair : roman_map) {
    while (number >= pair.first) {
      result += pair.second;
      number -= pair.first;
    }
  }
  return result;
}

}  // namespace roman