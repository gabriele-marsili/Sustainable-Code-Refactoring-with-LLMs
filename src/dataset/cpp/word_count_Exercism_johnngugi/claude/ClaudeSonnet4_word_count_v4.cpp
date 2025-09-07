#include <string>
#include <unordered_map>
#include <iostream>
#include "word_count.h"
using namespace std;

map<string, int> word_count::words(string sen)
{
    unordered_map<string, int> word_map;
    word_map.reserve(sen.length() / 5);
    
    string store;
    store.reserve(32);
    
    const char* data = sen.data();
    const size_t len = sen.length();
    
    for (size_t i = 0; i < len; ++i)
    {
        const char c = data[i];
        
        if (isalnum(c))
        {
            store += static_cast<char>(tolower(c));
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
            ++word_map[store];
            store.clear();
        }
    }
    
    if (!store.empty()) {
        if (store.back() == '\'')
        {
            store.pop_back();
        }
        ++word_map[store];
    }
    
    return map<string, int>(word_map.begin(), word_map.end());
}