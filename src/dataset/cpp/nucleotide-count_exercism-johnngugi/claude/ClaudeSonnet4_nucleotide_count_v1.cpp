#include "nucleotide_count.h"
#include <stdexcept>
using namespace dna;
using namespace std;

bool counter::check_valid_char(char letter) const
{
	return letter == 'A' || letter == 'T' || letter == 'G' || letter == 'C' ? 
		true : throw std::invalid_argument("error");
}

bool counter::not_exists(char x)
{
	return nucleotide_count.find(x) == nucleotide_count.end();
}

counter::counter(string a)
{
	strand = std::move(a);
	nucleotide_count.reserve(4);
	nucleotide_count['A'] = 0;
	nucleotide_count['C'] = 0;
	nucleotide_count['T'] = 0;
	nucleotide_count['G'] = 0;

	for (char c : strand)
	{
		check_valid_char(c);
		++nucleotide_count[c];
	}
}

int counter::count(char letter) const
{
	check_valid_char(letter);
	auto it = nucleotide_count.find(letter);
	return it != nucleotide_count.end() ? it->second : 0;
}

map<char, int> counter::nucleotide_counts() const
{
	return nucleotide_count;
}