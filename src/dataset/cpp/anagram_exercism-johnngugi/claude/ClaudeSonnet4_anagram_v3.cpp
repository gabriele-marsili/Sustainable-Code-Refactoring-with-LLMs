#include "anagram.h"
#include <string>
#include <vector>
#include <algorithm>
#include <unordered_map>
using namespace std;

vector<string> anagram::anagram::matches(vector<string> v)
{
    vector<string> result;
    result.reserve(v.size());
    
    if (anagram::anagram::word.empty()) {
        return result;
    }
    
    unordered_map<char, int> word_freq;
    for (char c : anagram::anagram::word) {
        word_freq[tolower(c)]++;
    }
    
    for (const string& candidate : v) {
        if (candidate.length() != anagram::anagram::word.length() || 
            candidate == anagram::anagram::word) {
            continue;
        }
        
        unordered_map<char, int> candidate_freq;
        for (char c : candidate) {
            candidate_freq[tolower(c)]++;
        }
        
        if (word_freq == candidate_freq) {
            result.push_back(candidate);
        }
    }
    
    return result;
}