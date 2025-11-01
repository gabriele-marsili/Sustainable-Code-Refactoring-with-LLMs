#include "anagram.h"
#include <string>
#include <vector>
#include <algorithm>
using namespace std;

vector<string> anagram::anagram::matches(vector<string> v)
{
    vector<string> result;
    result.reserve(v.size());
    
    string sorted_word = anagram::anagram::word;
    transform(sorted_word.begin(), sorted_word.end(), sorted_word.begin(), ::tolower);
    sort(sorted_word.begin(), sorted_word.end());
    
    for (const auto& candidate : v) {
        if (candidate.length() != anagram::anagram::word.length()) {
            continue;
        }
        
        string sorted_candidate = candidate;
        transform(sorted_candidate.begin(), sorted_candidate.end(), sorted_candidate.begin(), ::tolower);
        sort(sorted_candidate.begin(), sorted_candidate.end());
        
        if (sorted_candidate == sorted_word) {
            result.push_back(candidate);
        }
    }
    
    return result;
}