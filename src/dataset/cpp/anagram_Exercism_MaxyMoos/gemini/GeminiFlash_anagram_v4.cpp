#include "anagram.h"
#include <string>
#include <vector>
#include <algorithm>
#include <cctype>

using namespace std;

anagram::anagram(string const& inputString) : refStr(inputString) {
    orderedStr = toLowerAndSort(inputString);
}

string anagram::toLowerAndSort(const string& str) const {
    string tmp = str;
    transform(tmp.begin(), tmp.end(), tmp.begin(), ::tolower);
    sort(tmp.begin(), tmp.end());
    return tmp;
}

vector<string> anagram::matches(vector<string> const& candidates) {
    vector<string> result;
    for (const auto& candidate : candidates) {
        string lowerCandidate = toLowerAndSort(candidate);
        if (lowerCandidate.size() != orderedStr.size()) continue;

        if (toLowerAndSort(refStr) == lowerCandidate && tolower(refStr[0]) != tolower(candidate[0])) continue;

        if (orderedStr == lowerCandidate) {
            result.push_back(candidate);
        }
    }
    return result;
}