#include "anagram.h"
#include <string>
#include <vector>
#include <algorithm>
#include <cctype>

using namespace std;

vector<string> anagram::anagram::matches(vector<string> v) {
    vector<string> result;
    string lower_word = word;
    transform(lower_word.begin(), lower_word.end(), lower_word.begin(), ::tolower);
    sort(lower_word.begin(), lower_word.end());

    for (const string& candidate : v) {
        string lower_candidate = candidate;
        transform(lower_candidate.begin(), lower_candidate.end(), lower_candidate.begin(), ::tolower);

        if (lower_candidate.length() != word.length() || lower_candidate == lower_word) continue;

        sort(lower_candidate.begin(), lower_candidate.end());

        if (lower_candidate == lower_word) {
            result.push_back(candidate);
        }
    }

    return result;
}