#include "anagram.h"
#include <string>
#include <algorithm>
#include <cctype>

using namespace std;

anagram::anagram(string const& inputString)
{
    this->refStr = inputString;
    this->orderedStr.reserve(inputString.length());
    
    // Convert to lowercase and store
    for (char c : inputString) {
        this->orderedStr += static_cast<char>(tolower(static_cast<unsigned char>(c)));
    }
    
    sort(orderedStr.begin(), orderedStr.end());
}

vector<string> anagram::matches(vector<string> const& candidates)
{
    vector<string> result;
    result.reserve(candidates.size()); // Reserve space to avoid reallocations
    
    // Pre-compute lowercase reference string
    string lowerRefStr;
    lowerRefStr.reserve(refStr.length());
    for (char c : refStr) {
        lowerRefStr += static_cast<char>(tolower(static_cast<unsigned char>(c)));
    }
    
    for (const auto& candidate : candidates)
    {
        // Early length check
        if (candidate.length() != refStr.length()) {
            continue;
        }
        
        // Convert to lowercase
        string lowerCandidate;
        lowerCandidate.reserve(candidate.length());
        for (char c : candidate) {
            lowerCandidate += static_cast<char>(tolower(static_cast<unsigned char>(c)));
        }
        
        // If the candidate is the same word as the reference, it doesn't count
        if (lowerRefStr == lowerCandidate) {
            continue;
        }
        
        // Sort and compare
        sort(lowerCandidate.begin(), lowerCandidate.end());
        if (orderedStr == lowerCandidate) {
            result.push_back(candidate);
        }
    }
    
    return result;
}