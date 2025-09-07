#include <string>
#include <unordered_map>
#include <iostream>
#include "word_count.h"
using namespace std;

map<string, int> word_count::words(string sen)
{
    string store;
    store.reserve(32); // Reserve space to avoid frequent reallocations
    unordered_map<string, int> word_map;
    
    auto process_word = [&]() {
        if (!store.empty()) {
            if (store.back() == '\'') {
                store.pop_back();
            }
            ++word_map[store];
            store.clear();
        }
    };

    for (char c : sen) {
        if (isalnum(c)) {
            store += static_cast<char>(tolower(c));
        }
        else if (c == '\'' && !store.empty()) {
            store += c;
        }
        else {
            process_word();
        }
    }
    
    process_word(); // Handle last word
    
    // Convert back to map to maintain interface
    return map<string, int>(word_map.begin(), word_map.end());
}