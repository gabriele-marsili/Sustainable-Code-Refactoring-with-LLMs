#include "etl.h"
#include <cctype>

using namespace std;

map<char, int> etl::transform(const map<int, vector<char>>& old)
{
    map<char, int> dict;
    dict.reserve(old.size() * 10);
    
    for (const auto& [key, chars] : old)
    {
        for (char ch : chars)
        {
            dict[static_cast<char>(tolower(static_cast<unsigned char>(ch)))] = key;
        }
    }
    return dict;
}