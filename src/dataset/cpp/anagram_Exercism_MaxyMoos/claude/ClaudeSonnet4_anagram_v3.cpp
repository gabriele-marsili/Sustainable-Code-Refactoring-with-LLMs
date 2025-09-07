#include "anagram.h"
#include <string>
#include <algorithm>
#include <cctype>

using namespace std;

anagram::anagram(string const& inputString)
{
    this->refStr = inputString;
    this->orderedStr.reserve(inputString.length());
    
    for (char c : inputString) {
        this->orderedStr += static_cast<char>(tolower(static_cast<unsigned char>(c)));
    }
    
    sort(this->orderedStr.begin(), this->orderedStr.end());
}

vector<string> anagram::matches(vector<string> const& candidates)
{
    vector<string> result;
    result.reserve(candidates.size());
    
    string refStrLower;
    refStrLower.reserve(refStr.length());
    for (char c : refStr) {
        refStrLower += static_cast<char>(tolower(static_cast<unsigned char>(c)));
    }
    
    for (const auto& candidate : candidates)
    {
        if (candidate.length() != refStr.length())
            continue;
            
        string candidateLower;
        candidateLower.reserve(candidate.length());
        for (char c : candidate) {
            candidateLower += static_cast<char>(tolower(static_cast<unsigned char>(c)));
        }
        
        if (refStrLower == candidateLower)
            continue;

        sort(candidateLower.begin(), candidateLower.end());
        if (this->orderedStr == candidateLower)
            result.push_back(candidate);
    }
    return result;
}