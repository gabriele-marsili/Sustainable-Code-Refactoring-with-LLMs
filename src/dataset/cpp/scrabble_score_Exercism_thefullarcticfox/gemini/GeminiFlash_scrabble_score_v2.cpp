#include "scrabble_score.h"
#include <algorithm>
#include <cctype>
#include <string>
#include <unordered_map>

namespace scrabble_score {

long score(const std::string& word) {
  static const std::unordered_map<char, int> scrabblePoints = {
      {'a', 1}, {'b', 3},  {'c', 3},  {'d', 2},  {'e', 1}, {'f', 4},
      {'g', 2}, {'h', 4},  {'i', 1},  {'j', 8},  {'k', 5}, {'l', 1},
      {'m', 3}, {'n', 1},  {'o', 1},  {'p', 3},  {'q', 10}, {'r', 1},
      {'s', 1}, {'t', 1},  {'u', 1},  {'v', 4},  {'w', 4}, {'x', 8},
      {'y', 4}, {'z', 10}};

  long res = 0;
  for (char c : word) {
    char lower_c = std::tolower(c);
    auto it = scrabblePoints.find(lower_c);
    if (it != scrabblePoints.end()) {
      res += it->second;
    }
  }
  return res;
}

} // namespace scrabble_score