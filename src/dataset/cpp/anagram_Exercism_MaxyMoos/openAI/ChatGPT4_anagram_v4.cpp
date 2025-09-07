#include "anagram.h"
#include <string>
#include <vector>
#include <algorithm>
#include <cctype>
#include <unordered_map>

using namespace std;

namespace {
    string normalize(const string& str) {
        string normalized = str;
        transform(normalized.begin(), normalized.end(), normalized.begin(), ::tolower);
        sort(normalized.begin(), normalized.end());
        return normalized;
    }
}

anagram::anagram(const string& inputString)
    : refStr(inputString), orderedStr(normalize(inputString)) {}

vector<string> anagram::matches(const vector<string>& candidates) {
    vector<string> result;
    const string lowerRefStr = normalize(refStr);

    for (const auto& candidate : candidates) {
        if (candidate.size() != refStr.size()) continue;

        string lowerCandidate = candidate;
        transform(lowerCandidate.begin(), lowerCandidate.end(), lowerCandidate.begin(), ::tolower);

        if (lowerCandidate == lowerRefStr) continue;

        if (normalize(candidate) == orderedStr) {
            result.push_back(candidate);
        }
    }
    return result;
}