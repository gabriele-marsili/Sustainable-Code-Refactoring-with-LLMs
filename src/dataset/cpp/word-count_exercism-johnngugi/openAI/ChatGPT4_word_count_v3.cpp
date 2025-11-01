#include <string>
#include <map>
#include <cctype>
#include <iostream>
#include "word_count.h"
using namespace std;

map<string, int> word_count::words(string sen)
{
    map<string, int> words;
    string store;

    auto process_word = [&](string& word) {
        if (!word.empty()) {
            if (word.back() == '\'') {
                word.pop_back();
            }
            ++words[word];
            word.clear();
        }
    };

    for (char c : sen) {
        if (isalnum(c)) {
            store += tolower(c);
        } else if (c == '\'' && !store.empty()) {
            store += c;
        } else {
            process_word(store);
        }
    }

    process_word(store);
    return words;
}