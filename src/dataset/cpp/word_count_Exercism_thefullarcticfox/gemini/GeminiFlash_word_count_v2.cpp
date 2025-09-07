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
    // Lowercase and remove non-alphanumeric characters except apostrophes
    std::string cleaned_word;
    for (char c : word) {
      if (std::isalnum(c) || c == '\'') {
        cleaned_word += std::tolower(c);
      }
    }

    // Remove leading and trailing apostrophes
    if (!cleaned_word.empty() && cleaned_word.front() == '\'') {
      cleaned_word.erase(0, 1);
    }
    if (!cleaned_word.empty() && cleaned_word.back() == '\'') {
      cleaned_word.pop_back();
    }

    if (!cleaned_word.empty()) {
      res[cleaned_word]++;
    }
  }

  return res;
}
} // namespace word_count