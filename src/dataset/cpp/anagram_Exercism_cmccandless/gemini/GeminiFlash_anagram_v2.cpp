#include "anagram.h"
#include <algorithm>
#include <cctype>

using namespace std;

namespace anagram
{
	anagram::anagram(string word) : base(word)
	{
		std::transform(base.begin(), base.end(), base.begin(), ::tolower);
		sorted_base = base;
		std::sort(sorted_base.begin(), sorted_base.end());
	}

	vector<string> anagram::matches(vector<string> words)
	{
		vector<string> result;
		for (const auto& word : words)
		{
			string lowered_word = word;
			std::transform(lowered_word.begin(), lowered_word.end(), lowered_word.begin(), ::tolower);

			if (lowered_word == base) continue;

			if (lowered_word.length() != base.length()) continue;

			string sorted_word = lowered_word;
			std::sort(sorted_word.begin(), sorted_word.end());

			if (sorted_word == sorted_base) result.push_back(word);
		}
		return result;
	}
}