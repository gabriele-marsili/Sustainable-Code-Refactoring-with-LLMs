#include "etl.h"
#include <algorithm>
#include <cctype>

using namespace std;

map<char, int> etl::transform(map<int, vector<char>> old)
{
    map<char, int> dict;
    dict.reserve(old.size());

    for (const auto& pair : old)
    {
        int key = pair.first;
        const vector<char>& chars = pair.second;

        for (char ch : chars)
        {
            dict[tolower(ch)] = key;
        }
    }
    return dict;
}