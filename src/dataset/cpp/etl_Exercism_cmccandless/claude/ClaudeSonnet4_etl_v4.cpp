#include "etl.h"

using namespace std;

map<char, int> etl::transform(map<int, vector<char>> old)
{
    map<char, int> dict;
    
    size_t total_chars = 0;
    for (const auto& pair : old) {
        total_chars += pair.second.size();
    }
    
    dict.reserve(total_chars);
    
    for (const auto& pair : old) {
        const int key = pair.first;
        for (char ch : pair.second) {
            dict.emplace(tolower(ch), key);
        }
    }
    
    return dict;
}