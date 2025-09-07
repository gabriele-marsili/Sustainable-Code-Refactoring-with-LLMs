#include "word_count.h"

using namespace std;

string aslower(string word)
{
	for (char& c : word) {
		c = tolower(c);
	}
	return word;
}

map<string, int> word_count::words(string phrase)
{
	map<string, int> dict;
	string word;
	word.reserve(32);
	
	const char* delimiters = " \r\n!@#$%^&*(),./<>?{}[]_+-=:;";
	
	for (size_t i = 0; i <= phrase.length(); ++i) {
		char c = (i < phrase.length()) ? phrase[i] : '\0';
		
		if (c == '\0' || strchr(delimiters, c)) {
			if (!word.empty()) {
				if (word.front() == '\'') {
					word.erase(0, 1);
				}
				if (!word.empty() && word.back() == '\'') {
					word.pop_back();
				}
				
				if (!word.empty()) {
					for (char& ch : word) {
						ch = tolower(ch);
					}
					++dict[word];
				}
				word.clear();
			}
		} else {
			word += c;
		}
	}
	
	return dict;
}