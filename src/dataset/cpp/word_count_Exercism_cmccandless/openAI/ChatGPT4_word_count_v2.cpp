#include "word_count.h"
#include <unordered_map>
#include <cctype>
#include <sstream>

using namespace std;

string aslower(const string& word) {
    string lower_word;
    lower_word.reserve(word.size());
    for (char c : word) {
        lower_word += tolower(c);
    }
    return lower_word;
}

map<string, int> word_count::words(const string& phrase) {
    unordered_map<string, int> dict;
    stringstream ss(phrase);
    string word;
    while (ss >> word) {
        // Remove leading and trailing single quotes
        if (!word.empty() && word.front() == '\'') word.erase(0, 1);
        if (!word.empty() && word.back() == '\'') word.pop_back();

        // Remove non-alphanumeric characters
        word.erase(remove_if(word.begin(), word.end(), [](char c) {
            return !isalnum(c) && c != '\'';
        }), word.end());

        if (!word.empty()) {
            word = aslower(word);
            dict[word]++;
        }
    }
    return map<string, int>(dict.begin(), dict.end());
}