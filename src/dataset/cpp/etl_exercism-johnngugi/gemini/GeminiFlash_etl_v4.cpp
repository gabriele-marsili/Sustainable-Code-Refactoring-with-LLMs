#include "etl.h"
#include <map>
#include <vector>
#include <algorithm>
#include <cctype>
using namespace std;

map<char, int> etl::transform(map<int, vector<char> > a)
{
    map<char, int> store;
    store.reserve(a.size());

    for (const auto& pair : a)
    {
        int score = pair.first;
        const vector<char>& letters = pair.second;

        for (char letter : letters)
        {
            store.emplace(tolower(letter), score);
        }
    }
    return store;
}