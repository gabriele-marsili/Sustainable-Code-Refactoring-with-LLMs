#include "etl.h"
#include <algorithm>
#include <cctype>

using namespace std;

map<char, int> etl::transform(const map<int, vector<char>>& old) {
    map<char, int> dict;
    dict.reserve(old.size() * 2); // Pre-allocate space to potentially reduce reallocations

    for (const auto& pair : old) {
        int key = pair.first;
        const vector<char>& chars = pair.second;

        for (char ch : chars) {
            dict[tolower(ch)] = key;
        }
    }
    return dict;
}