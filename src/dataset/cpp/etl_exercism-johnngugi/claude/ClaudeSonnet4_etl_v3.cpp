#include "etl.h"
#include <map>
#include <vector>
#include <algorithm>
#include <cctype>

std::map<char, int> etl::transform(std::map<int, std::vector<char>> a)
{
    std::map<char, int> store;
    
    for (const auto& pair : a) {
        const int score = pair.first;
        for (char c : pair.second) {
            store[std::tolower(c)] = score;
        }
    }
    
    return store;
}