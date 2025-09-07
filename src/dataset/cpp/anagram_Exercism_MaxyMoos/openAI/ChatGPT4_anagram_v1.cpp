#include "anagram.h"
#include <string>
#include <vector>
#include <algorithm>
#include <cctype>

using namespace std;

bool stringSort(char c1, char c2)
{
    return tolower(c1) < tolower(c2);
}

anagram::anagram(string const& inputString)
{
    refStr = inputString;
    orderedStr = refStr;
    transform(orderedStr.begin(), orderedStr.end(), orderedStr.begin(), ::tolower);
    sort(orderedStr.begin(), orderedStr.end());
}

vector<string> anagram::matches(vector<string> const& candidates)
{
    vector<string> result;
    string lowerRefStr = refStr;
    transform(lowerRefStr.begin(), lowerRefStr.end(), lowerRefStr.begin(), ::tolower);

    for (const auto& candidate : candidates)
    {
        string lowerCandidate = candidate;
        transform(lowerCandidate.begin(), lowerCandidate.end(), lowerCandidate.begin(), ::tolower);

        if (lowerCandidate == lowerRefStr)
            continue;

        string sortedCandidate = lowerCandidate;
        sort(sortedCandidate.begin(), sortedCandidate.end());

        if (orderedStr == sortedCandidate)
            result.push_back(candidate);
    }
    return result;
}