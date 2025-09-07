#include "anagram.h"
#include <string>
#include <vector>
#include <algorithm>
#include <unordered_map>
using namespace std;

vector<string> anagram::anagram::matches(vector<string> v)
{
    vector<string> result;

    // Precompute the sorted version of the target word
    string sorted_word = anagram::anagram::word;
    sort(sorted_word.begin(), sorted_word.end());

    for (const auto& candidate : v)
    {
        if (candidate.length() != anagram::anagram::word.length()) 
            continue;

        // Sort the candidate word and compare
        string sorted_candidate = candidate;
        sort(sorted_candidate.begin(), sorted_candidate.end());

        if (sorted_candidate == sorted_word)
        {
            result.push_back(candidate);
        }
    }

    return result;
}