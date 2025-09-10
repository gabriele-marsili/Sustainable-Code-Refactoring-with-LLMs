#include "etl.h"
#include <unordered_map>

using namespace std;

unordered_map<char, int> etl::transform(const unordered_map<int, vector<char>>& old)
{
    unordered_map<char, int> dict;
    for (const auto& [key, chars] : old)
    {
        for (char ch : chars)
        {
            dict[tolower(ch)] = key;
        }
    }
    return dict;
}