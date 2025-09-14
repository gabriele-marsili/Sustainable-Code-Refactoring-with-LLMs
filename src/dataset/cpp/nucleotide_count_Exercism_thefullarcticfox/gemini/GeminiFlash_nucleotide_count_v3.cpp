#include "nucleotide_count.h"
#include <stdexcept>
#include <array>

namespace nucleotide_count {

	counter::counter(const string& dna) : counts{ {'A', 0}, {'T', 0}, {'C', 0}, {'G', 0} } {
		counts['A'] = 0;
		counts['T'] = 0;
		counts['C'] = 0;
		counts['G'] = 0;

		for (char nuc : dna) {
			switch (nuc) {
			case 'A':
				counts['A']++;
				break;
			case 'T':
				counts['T']++;
				break;
			case 'C':
				counts['C']++;
				break;
			case 'G':
				counts['G']++;
				break;
			default:
				throw invalid_argument("invalid nucleotide letter");
			}
		}
	}

	const map<char, int>& counter::nucleotide_counts() const {
		return counts;
	}

	int counter::count(char nucleotide) const {
		switch (nucleotide) {
		case 'A':
		case 'T':
		case 'C':
		case 'G':
			return counts.at(nucleotide);
		default:
			throw invalid_argument("invalid nucleotide letter");
		}
	}
}  // namespace nucleotide_count