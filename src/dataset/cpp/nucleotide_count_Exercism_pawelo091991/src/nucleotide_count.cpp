#include "nucleotide_count.h"

namespace dna {
	counter::counter(string input) {
		string::iterator it;
		string temp = "ATCG";
		for (it = temp.begin(); it < temp.end(); it++)
			data[*it] = 0;

		for (it = input.begin(); it < input.end(); it++) {
			if (*it == 'A' || *it == 'T' || *it == 'C' || *it == 'G')	
				data[*it]++;
			else
				throw std::invalid_argument("invalid nucleotide");
		}
	}

	std::map<char, int> counter::nucleotide_counts() const {
		return data;
	}

	int counter::count(char input) const {
		auto pos = data.find(input);
		if (input == 'A' || input == 'T' || input == 'C' || input == 'G')
			return pos->second;
		else
			throw std::invalid_argument("invalid input argument");
	}
}