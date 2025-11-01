#include "etl.h"
#include <map>
#include <vector>
#include <algorithm>
#include <cctype>
#include <utility>

using namespace std;

map<char, int> etl::transform(map<int, vector<char> > a)
{
    map<char, int> store;
    store.reserve(a.size() * 3); // Pre-allocate space to avoid reallocations

    for (const auto& pair : a)
    {
        int score = pair.first;
        const vector<char>& letters = pair.second;

        for (char letter : letters)
        {
            store.emplace(tolower(letter), score); // Use emplace for efficiency
        }
    }
    return store;
}