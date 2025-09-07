#include "anagram.h"
#include <string>
#include <vector>
#include <algorithm>
#include <cctype>

using namespace std;

anagram::anagram(const string& inputString) : refStr(inputString) {
    orderedStr = toLowerAndSort(inputString);
}

string anagram::toLowerAndSort(const string& str) const {
    string tmp = str;
    transform(tmp.begin(), tmp.end(), tmp.begin(), ::tolower);
    sort(tmp.begin(), tmp.end());
    return tmp;
}

vector<string> anagram::matches(const vector<string>& candidates) {
    vector<string> result;
    string lowerRefStr = toLowerAndSort(this->refStr);

    for (const auto& candidate : candidates) {
        string lowerCandidate = toLowerAndSort(candidate);

        if (lowerRefStr == lowerCandidate && tolower(candidate[0]) == tolower(this->refStr[0]) && candidate.size() == this->refStr.size())
            continue;

        if (lowerRefStr == lowerCandidate) {
            result.push_back(candidate);
        }
    }
    return result;
}