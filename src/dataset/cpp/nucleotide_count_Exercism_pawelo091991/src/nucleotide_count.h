#ifndef NUCLEOTIDE_COUNT_H
#define NUCLEOTIDE_COUNT_H
#include <string>
#include <map>
#include <stdexcept>

using std::string;
using std::map;

namespace dna {
	class counter {
	private:
		map<char, int> data;
	public:
		counter(string input);
		int count(char input) const;
		std::map<char, int> nucleotide_counts(void) const;

	};
}

#endif // NUCLEOTIDE_COUNT_H

