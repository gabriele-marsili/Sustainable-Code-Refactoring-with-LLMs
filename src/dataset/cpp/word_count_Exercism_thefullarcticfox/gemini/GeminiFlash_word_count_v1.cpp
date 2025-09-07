#include "word_count.h"
#include <algorithm>
#include <iostream>
#include <sstream>
#include <cctype>

namespace word_count {

std::map<std::string, int> words(std::string str) {
  std::map<std::string, int> res;
  std::stringstream ss(str);
  std::string word;

  while (ss >> word) {
    // Convert word to lowercase in-place
    std::transform(word.begin(), word.end(), word.begin(), ::tolower);

    // Remove leading and trailing non-alphanumeric characters
    auto first = word.begin();
    while (first != word.end() && !std::isalnum(*first) && *first != '\'') {
      first++;
    }
    auto last = word.end();
    while (first != last && !std::isalnum(*(last - 1)) && *(last - 1) != '\'') {
      last--;
    }

    if (first != last) {
      std::string clean_word(first, last);

      // Remove single quotes at the beginning and end of the word
      if (clean_word.length() > 2 && clean_word.front() == '\'' && clean_word.back() == '\'') {
          clean_word = clean_word.substr(1, clean_word.length() - 2);
      }
      
      res[clean_word]++;
    }
  }

  return res;
}

} // namespace word_count