#include "anagram.h"
#include <string>
#include <vector>
#include <algorithm>
#include <cctype>

using namespace std;

anagram::anagram(const string& inputString) : refStr(inputString) {
    orderedStr = toLowerAndSort(inputString);
}

string anagram::toLowerAndSort(const string& str) {
    string tmp = str;
    transform(tmp.begin(), tmp.end(), tmp.begin(), ::tolower);
    sort(tmp.begin(), tmp.end());
    return tmp;
}

vector<string> anagram::matches(const vector<string>& candidates) {
    vector<string> result;
    for (const auto& candidate : candidates) {
        if (refStr.size() != candidate.size()) continue;

        string lowerCandidate = toLowerAndSort(candidate);
        if (orderedStr == lowerCandidate && tolower(refStr[0]) != tolower(candidate[0])) {
            result.push_back(candidate);
        }
    }
    return result;
}