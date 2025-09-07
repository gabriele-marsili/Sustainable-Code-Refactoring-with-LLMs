#include <string>
#include <unordered_map>
#include <cctype>
#include "word_count.h"
using namespace std;

unordered_map<string, int> word_count::words(const string& sen)
{
    unordered_map<string, int> words;
    string store;

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

    if (!store.empty())
    {
        if (store.back() == '\'')
        {
            store.pop_back();
        }
        ++words[store];
    }

    return words;
}