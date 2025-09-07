#include "anagram.h"
#include <string>
#include <vector>
#include <algorithm>
#include <cctype>

using namespace std;

anagram::anagram(string const& inputString) : refStr(inputString) {
    orderedStr = toLower(inputString);
    sort(orderedStr.begin(), orderedStr.end());
}

vector<string> anagram::matches(vector<string> const& candidates) {
    vector<string> result;
    string lowerRefStr = toLower(this->refStr);

    for (const auto& candidate : candidates) {
        string lowerCandidate = toLower(candidate);

        if (lowerRefStr == lowerCandidate) {
            continue;
        }

        string sortedCandidate = lowerCandidate;
        sort(sortedCandidate.begin(), sortedCandidate.end());

        if (this->orderedStr == sortedCandidate) {
            result.push_back(candidate);
        }
    }
    return result;
}

string anagram::toLower(const string& str) {
    string result = str;
    transform(result.begin(), result.end(), result.begin(), ::tolower);
    return result;
}