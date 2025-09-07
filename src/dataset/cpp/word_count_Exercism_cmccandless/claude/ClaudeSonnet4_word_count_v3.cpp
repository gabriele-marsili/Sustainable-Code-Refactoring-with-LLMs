#include "word_count.h"

using namespace std;

string aslower(string word)
{
    transform(word.begin(), word.end(), word.begin(), ::tolower);
    return word;
}

map<string, int> word_count::words(string phrase)
{
    map<string, int> dict;
    dict.reserve(phrase.length() / 5);
    
    string word;
    word.reserve(32);
    
    for (char c : phrase) {
        if (isalnum(c) || c == '\'') {
            word += tolower(c);
        } else if (!word.empty()) {
            if (word.front() == '\'') {
                word.erase(0, 1);
            }
            if (!word.empty() && word.back() == '\'') {
                word.pop_back();
            }
            if (!word.empty()) {
                ++dict[word];
            }
            word.clear();
        }
    }
    
    if (!word.empty()) {
        if (word.front() == '\'') {
            word.erase(0, 1);
        }
        if (!word.empty() && word.back() == '\'') {
            word.pop_back();
        }
        if (!word.empty()) {
            ++dict[word];
        }
    }
    
    return dict;
}