#include "anagram.h" 
#include <algorithm>
#include <cctype>

using namespace std;

namespace anagram
{
	anagram::anagram(string word)
	{
		base = std::move(word);
		std::transform(base.begin(), base.end(), base.begin(), ::tolower);
		sorted_base = base;
		std::sort(sorted_base.begin(), sorted_base.end());
	}

	vector<string> anagram::matches(vector<string> words)
	{
		vector<string> result;
		result.reserve(words.size());
		
		for (const auto& word : words)
		{
			if (word.size() != base.size()) continue;
			
			string lowered_word;
			lowered_word.reserve(word.size());
			std::transform(word.begin(), word.end(), std::back_inserter(lowered_word), ::tolower);
			
			if (base == lowered_word) continue;
			
			if (isanagram(sorted_base, lowered_word)) 
			{
				result.push_back(word);
			}
		}
		return result;
	}

	string aslower(string word)
	{
		std::transform(word.begin(), word.end(), word.begin(), ::tolower);
		return word;
	}

	bool isanagram(const string& a, string b)
	{
		if (a.size() != b.size()) return false;
		std::sort(b.begin(), b.end());
		return a == b;
	}
}