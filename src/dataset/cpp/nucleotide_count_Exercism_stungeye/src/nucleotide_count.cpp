#include "nucleotide_count.h"

#include <algorithm>
#include <stdexcept>

namespace nucleotide_count {
	counter::counter(std::string_view sequence) {
		if (std::any_of(sequence.begin(), sequence.end(), invalid_nucleotide)) {
			throw std::invalid_argument("Sequence contains an invalid nucleotide.");
		}
		assemble_nucleotide_counts(sequence);
	}

	const std::map<char, int>& counter::nucleotide_counts() const noexcept {
		return counts;
	}

	int counter::count(char nucleotide) const {
		if (invalid_nucleotide(nucleotide)) {
			throw std::invalid_argument("Count requested for invalid nucleotide.");
		}
		return counts.at(nucleotide);
	}

	// Private Methods

	bool counter::invalid_nucleotide(char nucleotide) noexcept {
		return possible_nucleotides.find(nucleotide) == std::string::npos;
	}

	void counter::assemble_nucleotide_counts(std::string_view sequence) {
		for (auto nucleotide : possible_nucleotides) {
			counts[nucleotide] = static_cast<int>(std::count(sequence.begin(), sequence.end(), nucleotide));
		}
	}

} // namespace nucleotide_count
