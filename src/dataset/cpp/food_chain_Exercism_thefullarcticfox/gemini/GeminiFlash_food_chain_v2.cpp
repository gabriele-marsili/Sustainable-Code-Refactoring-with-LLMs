#include "food_chain.h"
#include <array>
#include <string>

namespace food_chain {

std::string verse(int verse_num) {
  static const std::array<std::pair<std::string_view, std::string_view>, 8> verse_data = {
      {{"fly", "I don't know why she swallowed the fly. Perhaps she'll die."},
       {"spider", "It wriggled and jiggled and tickled inside her."},
       {"bird", "How absurd to swallow a bird!"},
       {"cat", "Imagine that, to swallow a cat!"},
       {"dog", "What a hog, to swallow a dog!"},
       {"goat", "Just opened her throat and swallowed a goat!"},
       {"cow", "I don't know how she swallowed a cow!"},
       {"horse", "She's dead, of course!"}}};

  std::string res = "I know an old lady who swallowed a " + std::string(verse_data[verse_num - 1].first) + ".\n";
  if (verse_num > 1) {
    res += verse_data[verse_num - 1].second;
    res += "\n";
  }

  if (verse_num == 8) {
    return res;
  }

  for (int i = verse_num; i > 1; --i) {
    res += "She swallowed the " + std::string(verse_data[i - 1].first) + " to catch the " + std::string(verse_data[i - 2].first);
    if (i == 2) {
      res += " that wriggled and jiggled and tickled inside her";
    }
    res += ".\n";
  }

  res += verse_data[0].second;
  res += "\n";
  return res;
}

std::string verses(int first, int last) {
  std::string res;
  res.reserve((last - first + 1) * 200); 

  for (int i = first; i <= last; ++i) {
    res += verse(i);
    res += "\n";
  }
  return res;
}

std::string sing() { return verses(1, 8); }

} // namespace food_chain