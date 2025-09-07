#include "anagram.h" 
#include <unordered_map>

using namespace std;

namespace anagram
{
	anagram::anagram(string word)
	{
		base = aslower(word);
		sorted_base = base;
		sort(sorted_base.begin(), sorted_base.end());
	}

	vector<string> anagram::matches(vector<string> words)
	{
		vector<string> result;
		for (const auto& word : words)
		{
			auto wlowered = aslower(word);
			if (base != wlowered && isanagram(sorted_base, wlowered))
			{
				result.push_back(word);
			}
		}
		return result;
	}

	string aslower(const string& word)
	{
		string lowered = word;
		for (char& c : lowered) c = tolower(c);
		return lowered;
	}

	bool isanagram(const string& a, const string& b)
	{
		if (a.size() != b.size()) return false;

		unordered_map<char, int> char_count;
		for (char c : b) char_count[c]++;
		for (char c : a)
		{
			if (--char_count[c] < 0) return false;
		}
		return true;
	}
}