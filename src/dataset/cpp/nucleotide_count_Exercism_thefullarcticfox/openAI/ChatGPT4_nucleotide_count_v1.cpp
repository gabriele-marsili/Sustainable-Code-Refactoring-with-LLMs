#include "nucleotide_count.h"
#include <stdexcept>
#include <array>

namespace nucleotide_count {
    static inline bool is_valid_nucleotide(char nuc) {
        return nuc == 'A' || nuc == 'T' || nuc == 'C' || nuc == 'G';
    }

    counter::counter(const string& dna) : counts{ {'A', 0}, {'T', 0}, {'C', 0}, {'G', 0} } {
        for (char nuc : dna) {
            if (!is_valid_nucleotide(nuc)) {
                throw invalid_argument("invalid nucleotide letter");
            }
            ++counts[nuc];
        }
    }

    const map<char, int>& counter::nucleotide_counts() const {
        return counts;
    }

    int counter::count(char nucleotide) const {
        if (!is_valid_nucleotide(nucleotide)) {
            throw invalid_argument("invalid nucleotide letter");
        }
        return counts.at(nucleotide);
    }
}  // namespace nucleotide_count