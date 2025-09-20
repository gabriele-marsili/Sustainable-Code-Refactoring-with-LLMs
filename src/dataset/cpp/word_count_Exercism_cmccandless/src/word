#include "word_count.h"
#include <unordered_map>
#include <cctype>

using namespace std;

string aslower(string word) {
    for (char &ch : word) {
        ch = tolower(ch);
    }
    return word;
}

map<string, int> word_count::words(string phrase) {
    unordered_map<string, int> dict;
    string word;
    for (char &ch : phrase) {
        if (isalnum(ch) || ch == '\'') {
            word += ch;
        } else {
            if (!word.empty()) {
                if (word.front() == '\'') word.erase(0, 1);
                if (!word.empty() && word.back() == '\'') word.pop_back();
                if (!word.empty()) {
                    word = aslower(word);
                    dict[word]++;
                }
                word.clear();
            }
        }
    }
    if (!word.empty()) {
        if (word.front() == '\'') word.erase(0, 1);
        if (!word.empty() && word.back() == '\'') word.pop_back();
        if (!word.empty()) {
            word = aslower(word);
            dict[word]++;
        }
    }
    return map<string, int>(dict.begin(), dict.end());
}