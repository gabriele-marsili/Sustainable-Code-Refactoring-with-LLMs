#include "nucleotide_count.h"

namespace dna
{
	std::string KEYS = "ACGT";
	bool valid(char ch)
	{
		return KEYS.find(ch) != std::string::npos;
	}

	counter::counter(const std::string s) : nucleotides(s)
	{
		for (auto &ch : nucleotides)
		{
			if (!valid(ch)) throw std::invalid_argument("Invalid nucleotide.");
		}
	}

	std::map<char, int> counter::nucleotide_counts() const
	{
		std::map<char, int> dict;
		for (int i = 0; i < (int)KEYS.length(); i++) dict[KEYS[i]] = 0;
		for (auto &ch : nucleotides) dict[ch]++;
		return dict;
	}

	int counter::count(char ch) const
	{
		if (valid(ch)) return nucleotide_counts()[ch];
		throw std::invalid_argument("Invalid nucleotide.");
	}
}