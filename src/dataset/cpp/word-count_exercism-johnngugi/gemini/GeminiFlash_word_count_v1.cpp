#include <string>
#include <map>
#include <iostream>
#include "word_count.h"
#include <algorithm>
#include <cctype>

using namespace std;

map<string, int> word_count::words(string sen) {
    map<string, int> word_counts;
    string current_word;
    sen.erase(remove_if(sen.begin(), sen.end(), [](unsigned char x){ return !isalnum(x) && x != '\'' && !isspace(x); }), sen.end());

    for (size_t i = 0; i < sen.length(); ++i) {
        char c = sen[i];
        if (isalnum(c)) {
            current_word += tolower(c);
        } else if (c == '\'' && !current_word.empty()) {
            current_word += c;
        } else if (!current_word.empty()) {
            if (current_word.back() == '\'') {
                current_word.pop_back();
            }
            word_counts[current_word]++;
            current_word.clear();
        }
    }

    if (!current_word.empty()) {
        if (current_word.back() == '\'') {
            current_word.pop_back();
        }
        word_counts[current_word]++;
    }

    return word_counts;
}