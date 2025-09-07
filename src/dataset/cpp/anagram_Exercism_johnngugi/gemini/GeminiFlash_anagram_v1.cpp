#include "anagram.h"
#include <string>
#include <vector>
#include <algorithm>
#include <cctype>

using namespace std;

vector<string> anagram::anagram::matches(vector<string> candidates) {
    vector<string> result;
    string lower_word = word;
    transform(lower_word.begin(), lower_word.end(), lower_word.begin(), ::tolower);
    sort(lower_word.begin(), lower_word.end());

    for (const string& candidate : candidates) {
        string lower_candidate = candidate;
        transform(lower_candidate.begin(), lower_candidate.end(), lower_candidate.begin(), ::tolower);

        if (lower_candidate.length() != word.length() || lower_candidate == lower_word) continue;

        string sorted_candidate = lower_candidate;
        sort(sorted_candidate.begin(), sorted_candidate.end());

        if (sorted_candidate == lower_word) {
            result.push_back(candidate);
        }
    }

    return result;
}