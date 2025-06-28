#include "anagram.h"
#include <string>
#include <iostream>
#include <algorithm>
#include <boost/algorithm/string.hpp>

using namespace std;
using namespace boost::algorithm;


bool stringSort(char c1, char c2)
{
    return tolower(c1) < tolower(c2);
}

anagram::anagram(string const& inputString)
{
    this->refStr = inputString;
    this->orderedStr = to_lower_copy(inputString);
    sort(orderedStr.begin(), orderedStr.end(), stringSort);
}

vector<string> anagram::matches(vector<string> const& candidates)
{
    vector<string> result;
    for (auto i: candidates)
    {
        string tmp = to_lower_copy(i);
        // If the candidate is the same word as the reference, it doesn't count
        if ( to_lower_copy(this->refStr).compare(tmp) == 0)
            continue;

        sort(tmp.begin(), tmp.end(), stringSort);
        if (this->orderedStr.compare(tmp) == 0)
            result.push_back(i);
    }
    return result;
}