#include "anagram.h"
#include <string>
#include <vector>
#include <algorithm>
using namespace std;

vector<string> anagram::anagram::matches(vector<string> v)
{
    vector<string> result;
    string sorted_word = anagram::anagram::word;
    sort(sorted_word.begin(), sorted_word.end());

    for (const auto& candidate : v)
    {
        if (candidate.length() == sorted_word.length())
        {
            string sorted_candidate = candidate;
            sort(sorted_candidate.begin(), sorted_candidate.end());
            if (sorted_candidate == sorted_word)
            {
                result.push_back(candidate);
            }
        }
    }

    return result;
}