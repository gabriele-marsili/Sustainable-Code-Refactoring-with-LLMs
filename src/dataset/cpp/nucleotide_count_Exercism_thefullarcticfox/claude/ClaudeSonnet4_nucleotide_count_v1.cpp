#include "nucleotide_count.h"
#include <stdexcept>

namespace nucleotide_count {
	static inline void check_nuc_letter(char nuc) {
		if (nuc != 'A' && nuc != 'T' && nuc != 'C' && nuc != 'G')
			throw std::invalid_argument("invalid nucleotide letter");
	}

	counter::counter(const string& dna) : counts{ {'A', 0}, {'T', 0}, {'C', 0}, {'G', 0} } {
		counts.reserve(4);
		for (char nuc : dna) {
			check_nuc_letter(nuc);
			++counts[nuc];
		}
	}

	const map<char, int>& counter::nucleotide_counts() const {
		return counts;
	}

	int counter::count(char nucleotide) const {
		check_nuc_letter(nucleotide);
		return counts.at(nucleotide);
	}
}  // namespace nucleotide_count