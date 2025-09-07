#include "word_count.h"
#include <unordered_map>
#include <cctype>
#include <sstream>

using namespace std;

string aslower(string word) {
    for (char &ch : word) {
        ch = tolower(ch);
    }
    return word;
}

map<string, int> word_count::words(string phrase) {
    unordered_map<string, int> dict;
    stringstream ss(phrase);
    string word;
    while (ss >> word) {
        size_t start = 0, end = word.size();
        while (start < end && ispunct(word[start])) ++start;
        while (end > start && ispunct(word[end - 1])) --end;
        if (start < end) {
            word = aslower(word.substr(start, end - start));
            ++dict[word];
        }
    }
    return map<string, int>(dict.begin(), dict.end());
}