#include "nucleotide_count.h"
#include <stdexcept>
#include <unordered_map>

namespace nucleotide_count {

	counter::counter(const string& dna) : counts{ {'A', 0}, {'T', 0}, {'C', 0}, {'G', 0} } {
		for (char nuc : dna) {
			if (nuc == 'A') {
				counts['A']++;
			} else if (nuc == 'T') {
				counts['T']++;
			} else if (nuc == 'C') {
				counts['C']++;
			} else if (nuc == 'G') {
				counts['G']++;
			} else {
				throw invalid_argument("invalid nucleotide letter");
			}
		}
	}

	const map<char, int>& counter::nucleotide_counts() const {
		return counts;
	}

	int counter::count(char nucleotide) const {
		if (nucleotide == 'A' || nucleotide == 'T' || nucleotide == 'C' || nucleotide == 'G') {
			return counts.at(nucleotide);
		} else {
			throw invalid_argument("invalid nucleotide letter");
		}
	}
}  // namespace nucleotide_count