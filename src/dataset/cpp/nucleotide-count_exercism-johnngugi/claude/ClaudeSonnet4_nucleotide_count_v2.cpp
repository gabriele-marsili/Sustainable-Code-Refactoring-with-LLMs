#include "nucleotide_count.h"
#include <stdexcept>
using namespace dna;
using namespace std;

bool counter::check_valid_char(char letter) const
{
	return letter == 'A' || letter == 'T' || letter == 'G' || letter == 'C';
}

counter::counter(string a)
{
	strand = a;
	nucleotide_count['A'] = 0;
	nucleotide_count['C'] = 0;
	nucleotide_count['T'] = 0;
	nucleotide_count['G'] = 0;

	for (char c : a)
	{
		if (!check_valid_char(c))
		{
			throw std::invalid_argument("error");
		}
		++nucleotide_count[c];
	}
}

int counter::count(char letter) const
{
	if (!check_valid_char(letter))
	{
		throw std::invalid_argument("error");
	}
	return nucleotide_count.find(letter)->second;
}

map<char, int> counter::nucleotide_counts() const
{
	return nucleotide_count;
}