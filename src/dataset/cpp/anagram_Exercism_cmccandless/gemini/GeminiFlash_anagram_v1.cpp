#include "anagram.h"
#include <algorithm>
#include <cctype>
#include <string>
#include <vector>

using namespace std;

namespace anagram {

anagram::anagram(string word) : base(std::move(word)), lowered_base(aslower(base)) {
  std::string sorted_base = lowered_base;
  std::sort(sorted_base.begin(), sorted_base.end());
  sorted_lowered_base = sorted_base;
}

vector<string> anagram::matches(const vector<string>& words) const {
  vector<string> result;
  result.reserve(words.size()); // Pre-allocate memory to avoid reallocations

  for (const auto& word : words) {
    string lowered_word = aslower(word);
    if (lowered_base == lowered_word) continue;

    string sorted_word = lowered_word;
    std::sort(sorted_word.begin(), sorted_word.end());

    if (sorted_lowered_base == sorted_word) {
      result.push_back(word);
    }
  }
  return result;
}

string aslower(const string& word) {
  string lowered_word(word.size(), ' '); // Initialize string with correct size
  std::transform(word.begin(), word.end(), lowered_word.begin(), ::tolower);
  return lowered_word;
}
} // namespace anagram