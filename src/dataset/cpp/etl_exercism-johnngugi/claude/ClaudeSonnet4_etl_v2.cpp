#include "etl.h"
#include <map>
#include <vector>
#include <cctype>
using namespace std;

map<char, int> etl::transform(const map<int, vector<char>>& a)
{
    map<char, int> store;
    store.reserve(26); // Reserve space for typical alphabet size
    
    for (const auto& pair : a) {
        const int score = pair.first;
        for (char c : pair.second) {
            store[tolower(c)] = score;
        }
    }
    return store;
}