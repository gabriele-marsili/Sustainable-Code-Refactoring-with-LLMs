#include <string>
#include <unordered_map>
#include <iostream>
#include "word_count.h"
using namespace std;

unordered_map<string, int> word_count::words(const string& sen)
{
    string store;
    store.reserve(32); // Reserve space for typical word length
    unordered_map<string, int> words;
    
    for (char c : sen)
    {
        if (isalnum(c))
        {
            store += tolower(c);
        }
        else if (c == '\'' && !store.empty())
        {
            store += c;
        }
        else if (!store.empty())
        {
            if (store.back() == '\'')
            {
                store.pop_back();
            }
            ++words[store];
            store.clear();
        }
    }

    if (!store.empty()) {
        if (store.back() == '\'')
        {
            store.pop_back();
        }
        ++words[store];
    }

    return words;
}