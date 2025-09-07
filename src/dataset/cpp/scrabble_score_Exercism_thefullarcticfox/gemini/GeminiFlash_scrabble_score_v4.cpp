#include "scrabble_score.h"
#include <algorithm>
#include <cctype>
#include <string_view>

namespace scrabble_score {
long score(const std::string& word) {
  long res = 0;
  static constexpr long scrabblePoints[] = {
      1, 3, 3, 2, 1, 4, 2, 4, 1, 8, 5, 1, 3, 1,
      1, 3, 10, 1, 1, 1, 1, 4, 4, 8, 4, 10};

  for (const char& c : word) {
    res += scrabblePoints[std::tolower(c) - 'a'];
  }
  return res;
}
}  // namespace scrabble_score