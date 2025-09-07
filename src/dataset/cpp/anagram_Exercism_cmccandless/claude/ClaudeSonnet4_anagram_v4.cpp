#include "anagram.h" 

using namespace std;

namespace anagram
{
	anagram::anagram(string word)
	{
		base = move(word);
	}

	vector<string> anagram::matches(vector<string> words)
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

	string aslower(string word)
	{
		for (char& c : word)
		{
			c = tolower(c);
		}
		return word;
	}

	bool isanagram(const string& a, string b)
	{
		if (a.size() != b.size()) return false;
		sort(b.begin(), b.end());
		return a == b;
	}
}