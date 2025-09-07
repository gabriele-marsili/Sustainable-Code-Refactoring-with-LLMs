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
  string word;
  size_t start = 0;
  size_t end = 0;

  while ((end = phrase.find_first_of(" \r\n!@#$%^&*(),./<>?{}[]_+-=:;", start)) != string::npos) {
    word = phrase.substr(start, end - start);
    if (!word.empty()) {
      if (word[0] == '\'') {
        word.erase(0, 1);
      }
      if (!word.empty() && word.back() == '\'') {
        word.pop_back();
      }
      if (!word.empty()) {
        word = aslower(word);
        dict[word]++;
      }
    }
    start = end + 1;
  }

  word = phrase.substr(start);
  if (!word.empty()) {
    if (word[0] == '\'') {
      word.erase(0, 1);
    }
    if (!word.empty() && word.back() == '\'') {
      word.pop_back();
    }
    if (!word.empty()) {
      word = aslower(word);
      dict[word]++;
    }
  }

  return map<string, int>(dict.begin(), dict.end());
}