#include <string>
#include <unordered_map>
#include <iostream>
#include <cctype>
#include "word_count.h"

std::unordered_map<std::string, int> word_count::words(const std::string& sen)
{
    std::string store;
    store.reserve(32);
    std::unordered_map<std::string, int> words;
    
    auto process_word = [&words](std::string& word) {
        if (!word.empty()) {
            if (word.back() == '\'') {
                word.pop_back();
            }
            if (!word.empty()) {
                ++words[word];
            }
            word.clear();
        }
    };

    for (char c : sen) {
        if (std::isalnum(static_cast<unsigned char>(c))) {
            store += std::tolower(static_cast<unsigned char>(c));
        }
        else if (c == '\'' && !store.empty()) {
            store += c;
        }
        else {
            process_word(store);
        }
    }
    
    process_word(store);
    return words;
}