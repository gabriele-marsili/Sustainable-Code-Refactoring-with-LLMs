#include "etl.h"
#include <map>
#include <vector>
#include <cctype>
using namespace std;

map<char, int> etl::transform(const map<int, vector<char>>& a)
{
    map<char, int> store;
    for (const auto& [key, chars] : a)
    {
        for (char c : chars)
        {
            store[tolower(c)] = key;
        }
    }
    return store;
}