#include <string>
#include <unordered_map>
#include <iostream>
#include "word_count.h"
using namespace std;

unordered_map<string, int> word_count::words(const string& sen)
{
	string store;
	store.reserve(32); // Reserve space for typical word length
	unordered_map<string, int> words;
	
	auto process_word = [&]() {
		if (!store.empty()) {
			if (store.back() == '\'') {
				store.pop_back();
			}
			++words[store];
			store.clear();
		}
	};

	for (char c : sen)
	{
		if (isalnum(c))
		{
			store += static_cast<char>(tolower(c));
		}
		else if (c == '\'' && !store.empty())
		{
			store += c;
		}
		else
		{
			process_word();
		}
	}

	process_word(); // Handle final word
	return words;
}