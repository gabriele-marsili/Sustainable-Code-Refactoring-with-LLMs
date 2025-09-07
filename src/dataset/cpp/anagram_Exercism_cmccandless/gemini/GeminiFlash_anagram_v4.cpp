#include "anagram.h"

#include <algorithm>
#include <cctype>
#include <string>
#include <vector>

using namespace std;

namespace anagram {
    anagram::anagram(string word) : base(word) {}

    vector<string> anagram::matches(vector<string> words) {
        string lowered_base = aslower(base);
        string sorted_base = lowered_base;
        sort(sorted_base.begin(), sorted_base.end());

        vector<string> result;
        result.reserve(words.size()); // Pre-allocate memory

        for (const string& word : words) {
            string lowered_word = aslower(word);
            if (lowered_base == lowered_word) continue;

            string sorted_word = lowered_word;
            sort(sorted_word.begin(), sorted_word.end());

            if (sorted_base == sorted_word) {
                result.push_back(word);
            }
        }
        return result;
    }

    string aslower(string word) {
        string result = word;
        transform(result.begin(), result.end(), result.begin(), ::tolower);
        return result;
    }
}