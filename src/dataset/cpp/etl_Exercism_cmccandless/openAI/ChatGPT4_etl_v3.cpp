#include "etl.h"
#include <unordered_map>

using namespace std;

map<char, int> etl::transform(const map<int, vector<char>>& old)
{
    map<char, int> dict;
    for (const auto& [key, chars] : old)
    {
        for (char ch : chars)
        {
            dict.emplace(tolower(ch), key);
        }
    }
    return dict;
}