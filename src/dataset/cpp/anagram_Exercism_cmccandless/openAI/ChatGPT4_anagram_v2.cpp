#include "anagram.h" 
#include <unordered_map>

using namespace std;

namespace anagram
{
	anagram::anagram(string word)
	{
		base = normalize(word);
		original = word;
	}

	vector<string> anagram::matches(const vector<string>& words)
	{
		vector<string> result;
		for (const auto& word : words)
		{
			if (original.size() != word.size()) continue;
			if (equal_ignore_case(original, word)) continue;
			if (base == normalize(word)) result.push_back(word);
		}
		return result;
	}

	string normalize(const string& word)
	{
		string normalized = word;
		transform(normalized.begin(), normalized.end(), normalized.begin(), ::tolower);
		sort(normalized.begin(), normalized.end());
		return normalized;
	}

	bool equal_ignore_case(const string& a, const string& b)
	{
		if (a.size() != b.size()) return false;
		for (size_t i = 0; i < a.size(); ++i)
		{
			if (tolower(a[i]) != tolower(b[i])) return false;
		}
		return true;
	}
}