#include "anagram.h" 
#include <algorithm>
#include <unordered_map>

using namespace std;

namespace anagram
{
	anagram::anagram(string word)
	{
		base = move(word);
	}

	vector<string> anagram::matches(const vector<string>& words)
	{
		string lowered = aslower(base);
		string sbase = lowered;
		sort(sbase.begin(), sbase.end());
		vector<string> result;
		result.reserve(words.size());

		for (const auto& word : words)
		{
			string wlowered = aslower(word);
			if (lowered != wlowered && isanagram(sbase, wlowered))
			{
				result.push_back(word);
			}
		}
		return result;
	}

	string aslower(const string& word)
	{
		string lowered = word;
		transform(lowered.begin(), lowered.end(), lowered.begin(), ::tolower);
		return lowered;
	}

	bool isanagram(const string& a, const string& b)
	{
		if (a.size() != b.size()) return false;

		unordered_map<char, int> char_count;
		for (char c : a) ++char_count[c];
		for (char c : b)
		{
			if (--char_count[c] < 0) return false;
		}
		return true;
	}
}