#include "anagram.h"
#include <string>
#include <vector>
#include <algorithm>
#include <cctype>

using namespace std;

anagram::anagram(const string& inputString)
{
    refStr = inputString;
    orderedStr = inputString;
    transform(orderedStr.begin(), orderedStr.end(), orderedStr.begin(), ::tolower);
    sort(orderedStr.begin(), orderedStr.end());
}

vector<string> anagram::matches(const vector<string>& candidates)
{
    vector<string> result;
    string lowerRefStr = refStr;
    transform(lowerRefStr.begin(), lowerRefStr.end(), lowerRefStr.begin(), ::tolower);

    for (const auto& candidate : candidates)
    {
        if (candidate.size() != refStr.size())
            continue;

        string lowerCandidate = candidate;
        transform(lowerCandidate.begin(), lowerCandidate.end(), lowerCandidate.begin(), ::tolower);

        if (lowerCandidate == lowerRefStr)
            continue;

        string sortedCandidate = lowerCandidate;
        sort(sortedCandidate.begin(), sortedCandidate.end());

        if (sortedCandidate == orderedStr)
            result.push_back(candidate);
    }
    return result;
}