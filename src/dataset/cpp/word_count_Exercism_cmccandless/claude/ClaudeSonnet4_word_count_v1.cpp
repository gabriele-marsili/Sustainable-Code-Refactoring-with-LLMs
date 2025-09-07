#include "word_count.h"

using namespace std;

void aslower_inplace(string& word)
{
    for (char& c : word) {
        c = tolower(c);
    }
}

map<string, int> word_count::words(string phrase)
{
    map<string, int> dict;
    dict.reserve(phrase.length() / 5); // Rough estimate for word count
    
    string word;
    word.reserve(32); // Reserve space for typical word length
    
    for (size_t i = 0; i < phrase.length(); ++i) {
        char c = phrase[i];
        
        // Check if character is a delimiter
        if (c == ' ' || c == '\r' || c == '\n' || c == '!' || c == '@' || 
            c == '#' || c == '$' || c == '%' || c == '^' || c == '&' || 
            c == '*' || c == '(' || c == ')' || c == ',' || c == '.' || 
            c == '/' || c == '<' || c == '>' || c == '?' || c == '{' || 
            c == '}' || c == '[' || c == ']' || c == '_' || c == '+' || 
            c == '-' || c == '=' || c == ':' || c == ';') {
            
            if (!word.empty()) {
                // Remove leading and trailing apostrophes
                size_t start = 0, end = word.length();
                if (word[0] == '\'') start = 1;
                if (end > start && word[end - 1] == '\'') end--;
                
                if (end > start) {
                    string clean_word = word.substr(start, end - start);
                    aslower_inplace(clean_word);
                    ++dict[clean_word];
                }
                word.clear();
            }
        } else {
            word += c;
        }
    }
    
    // Handle last word
    if (!word.empty()) {
        size_t start = 0, end = word.length();
        if (word[0] == '\'') start = 1;
        if (end > start && word[end - 1] == '\'') end--;
        
        if (end > start) {
            string clean_word = word.substr(start, end - start);
            aslower_inplace(clean_word);
            ++dict[clean_word];
        }
    }
    
    return dict;
}