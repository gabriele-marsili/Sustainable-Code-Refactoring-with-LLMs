#include "anagram.h" 

using namespace std;

namespace anagram
{
	anagram::anagram(string word)
	{
		base = std::move(word);
	}

	vector<string> anagram::matches(vector<string> words)
	{
		string lowered;
		lowered.reserve(base.size());
		for (char c : base) {
			lowered += tolower(c);
		}
		
		string sbase = lowered;
		sort(sbase.begin(), sbase.end());
		
		vector<string> result;
		result.reserve(words.size());
		
		for (const auto& word : words) {
			if (word.size() != base.size()) continue;
			
			string wlowered;
			wlowered.reserve(word.size());
			for (char c : word) {
				wlowered += tolower(c);
			}
			
			if (lowered == wlowered) continue;
			
			if (isanagram(sbase, wlowered)) {
				result.push_back(word);
			}
		}
		return result;
	}

	string aslower(string word)
	{
		for (char& c : word) {
			c = tolower(c);
		}
		return word;
	}

	bool isanagram(string a, string b)
	{
		sort(b.begin(), b.end());
		return a == b;
	}
}