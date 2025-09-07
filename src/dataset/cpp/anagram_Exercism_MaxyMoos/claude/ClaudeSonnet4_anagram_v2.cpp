#include "anagram.h"
#include <string>
#include <algorithm>
#include <cctype>

using namespace std;

anagram::anagram(string const& inputString)
{
    this->refStr = inputString;
    this->orderedStr.reserve(inputString.size());
    
    for (char c : inputString) {
        this->orderedStr += tolower(c);
    }
    sort(orderedStr.begin(), orderedStr.end());
}

vector<string> anagram::matches(vector<string> const& candidates)
{
    vector<string> result;
    result.reserve(candidates.size());
    
    string refStrLower;
    refStrLower.reserve(refStr.size());
    for (char c : refStr) {
        refStrLower += tolower(c);
    }
    
    for (const auto& candidate : candidates)
    {
        if (candidate.size() != refStr.size())
            continue;
            
        string candidateLower;
        candidateLower.reserve(candidate.size());
        for (char c : candidate) {
            candidateLower += tolower(c);
        }
        
        if (refStrLower == candidateLower)
            continue;

        sort(candidateLower.begin(), candidateLower.end());
        if (this->orderedStr == candidateLower)
            result.push_back(candidate);
    }
    return result;
}