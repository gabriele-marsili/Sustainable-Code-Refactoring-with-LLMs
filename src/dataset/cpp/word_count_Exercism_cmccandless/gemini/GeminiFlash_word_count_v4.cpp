#include "word_count.h"
#include <algorithm>
#include <cctype>
#include <unordered_map>

using namespace std;

string aslower(string word) {
  transform(word.begin(), word.end(), word.begin(), ::tolower);
  return word;
}

map<string, int> word_count::words(string phrase) {
  unordered_map<string, int> dict;
  vector<string> strs;
  boost::split(strs, phrase, boost::is_any_of(" \r\n!@#$%^&*(),./<>?{}[]_+-=:;"));

  for (auto &word : strs) {
    if (word.empty()) continue;

    size_t start = 0;
    size_t end = word.size();

    if (word[0] == '\'') {
      start = 1;
    }
    if (end > start && word[end - 1] == '\'') {
      end--;
    }

    if (start >= end) continue;

    string sub = word.substr(start, end - start);
    string lower_word = aslower(sub);

    dict[lower_word]++;
  }

  return map<string, int>(dict.begin(), dict.end());
}