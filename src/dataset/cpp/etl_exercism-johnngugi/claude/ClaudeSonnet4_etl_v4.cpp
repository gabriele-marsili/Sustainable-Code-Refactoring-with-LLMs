#include "etl.h"
#include <map>
#include <vector>
#include <algorithm>
#include <cctype>
using namespace std;

map<char, int> etl::transform(map<int, vector<char> > a)
{
    map<char, int> store;
    store.reserve(a.size() * 10);
    
    for (const auto& pair : a) {
        const int score = pair.first;
        for (char c : pair.second) {
            store[static_cast<char>(tolower(static_cast<unsigned char>(c)))] = score;
        }
    }
    
    return store;
}