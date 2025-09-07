#include <string>
#include <map>
#include <iostream>
#include <algorithm>
#include "word_count.h"
using namespace std;

map<string, int> word_count::words(string sen)
{
    map<string, int> words;
    string store;
    store.reserve(sen.length()); // Pre-allocate memory

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

            auto it = words.find(store);
            if (it != words.end())
            {
                it->second++;
            }
            else
            {
                words[store] = 1;
            }
            store.clear();
        }
    }

    if (!store.empty())
    {
        if (store.back() == '\'')
        {
            store.pop_back();
        }

        auto it = words.find(store);
        if (it != words.end())
        {
            it->second++;
        }
        else
        {
            words[store] = 1;
        }
    }

    return words;
}