#include "anagram.h"
#include <string>
#include <vector>
#include <algorithm>
#include <unordered_map>
using namespace std;

vector<string> anagram::anagram::matches(vector<string> v)
{
    vector<string> result;
    unordered_map<char, int> word_map;
    for (char c : anagram::anagram::word)
    {
        word_map[c]++;
    }

    for (const string& candidate : v)
    {
        if (candidate.length() != anagram::anagram::word.length())
            continue;

        unordered_map<char, int> candidate_map;
        for (char c : candidate)
        {
            candidate_map[c]++;
        }

        if (word_map == candidate_map)
        {
            result.push_back(candidate);
        }
    }

    return result;
}