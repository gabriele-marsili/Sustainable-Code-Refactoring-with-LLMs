#include "anagram.h" 
#include <unordered_map>

using namespace std;

namespace anagram
{
	anagram::anagram(string word)
	{
		base = word;
	}

	vector<string> anagram::matches(vector<string> words)
	{
		auto lowered = aslower(base);
		auto sbase = lowered;
		sort(sbase.begin(), sbase.end());
		vector<string> result;
		result.reserve(words.size()); // Reserve memory to avoid frequent reallocations

		for (const auto& word : words)
		{
			auto wlowered = aslower(word);
			if (lowered == wlowered) continue;
			if (isanagram(sbase, wlowered)) result.push_back(word);
		}
		return result;
	}

	string aslower(const string& word)
	{
		string lowered = word;
		for (char& c : lowered) c = tolower(c);
		return lowered;
	}

	bool isanagram(const string& a, string b)
	{
		if (a.size() != b.size()) return false; // Early exit for non-matching sizes
		sort(b.begin(), b.end());
		return a == b;
	}
}