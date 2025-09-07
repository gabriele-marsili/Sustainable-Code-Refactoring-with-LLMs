#include "word_count.h"
#include <unordered_map>
#include <cctype>

using namespace std;

string aslower(string word) {
    for (char &c : word) {
        c = tolower(c);
    }
    return word;
}

map<string, int> word_count::words(string phrase) {
    unordered_map<string, int> dict;
    size_t start = 0, end = 0;
    while (end <= phrase.size()) {
        if (end == phrase.size() || isspace(phrase[end]) || ispunct(phrase[end])) {
            if (start < end) {
                string word = phrase.substr(start, end - start);
                if (word.front() == '\'') word.erase(0, 1);
                if (!word.empty() && word.back() == '\'') word.pop_back();
                if (!word.empty()) {
                    word = aslower(word);
                    dict[word]++;
                }
            }
            start = end + 1;
        }
        ++end;
    }
    return map<string, int>(dict.begin(), dict.end());
}