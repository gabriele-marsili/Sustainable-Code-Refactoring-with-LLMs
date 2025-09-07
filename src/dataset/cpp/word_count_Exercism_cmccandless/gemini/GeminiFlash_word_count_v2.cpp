#include "word_count.h"
#include <algorithm>
#include <cctype>
#include <iostream>

using namespace std;

string aslower(string word) {
  transform(word.begin(), word.end(), word.begin(), ::tolower);
  return word;
}

map<string, int> word_count::words(string phrase) {
  map<string, int> dict;
  string word;
  for (char c : phrase) {
    if (isalnum(c) || c == '\'') {
      word += c;
    } else {
      if (!word.empty()) {
        if (word[0] == '\'') {
          word.erase(0, 1);
        }
        if (!word.empty() && word.back() == '\'') {
          word.pop_back();
        }
        if (!word.empty()) {
          string lower_word = aslower(word);
          dict[lower_word]++;
          word.clear();
        }
      }
    }
  }
  if (!word.empty()) {
    if (word[0] == '\'') {
      word.erase(0, 1);
    }
    if (!word.empty() && word.back() == '\'') {
      word.pop_back();
    }
    if (!word.empty()) {
      string lower_word = aslower(word);
      dict[lower_word]++;
    }
  }
  return dict;
}