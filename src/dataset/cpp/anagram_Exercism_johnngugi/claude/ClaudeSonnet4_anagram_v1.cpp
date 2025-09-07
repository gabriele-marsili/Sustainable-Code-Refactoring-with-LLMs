#include "anagram.h"
#include <string>
#include <vector>
#include <algorithm>
using namespace std;

vector<string> anagram::anagram::matches(vector<string> v)
{
    vector<string> result;
    result.reserve(v.size()); // Pre-allocate memory
    
    // Pre-compute word signature once
    string word_sorted = anagram::anagram::word;
    transform(word_sorted.begin(), word_sorted.end(), word_sorted.begin(), ::tolower);
    sort(word_sorted.begin(), word_sorted.end());
    
    const size_t word_len = anagram::anagram::word.length();
    
    for (const auto& candidate : v)
    {
        // Quick length check first
        if (candidate.length() != word_len)
            continue;
            
        // Case-insensitive comparison check
        bool same_word = true;
        for (size_t i = 0; i < word_len; ++i)
        {
            if (tolower(candidate[i]) == tolower(anagram::anagram::word[i]))
                continue;
            same_word = false;
            break;
        }
        if (same_word)
            continue;
        
        // Create sorted version of candidate
        string candidate_sorted = candidate;
        transform(candidate_sorted.begin(), candidate_sorted.end(), candidate_sorted.begin(), ::tolower);
        sort(candidate_sorted.begin(), candidate_sorted.end());
        
        if (candidate_sorted == word_sorted)
        {
            result.push_back(candidate);
        }
    }
    
    return result;
}