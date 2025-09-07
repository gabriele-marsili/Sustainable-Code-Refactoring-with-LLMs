#include "word_count.h"
#include <algorithm>
#include <iostream>
#include <sstream>
#include <string>

namespace word_count {
std::map<std::string, int> words(std::string str) {
  std::map<std::string, int> res;
  std::stringstream ss(str);
  std::string word;

  while (ss >> word) {
    std::string cleaned_word;
    for (char c : word) {
      if (std::isalnum(c) || c == '\'') {
        cleaned_word += std::tolower(c);
      }
    }

    if (!cleaned_word.empty()) {
      size_t start = 0;
      size_t end = cleaned_word.length();

      while (start < end && cleaned_word[start] == '\'') {
        start++;
      }
      while (end > start && cleaned_word[end - 1] == '\'') {
        end--;
      }

      if (start < end) {
        res[cleaned_word.substr(start, end - start)]++;
      }
    }
  }

  return res;
}
} // namespace word_count