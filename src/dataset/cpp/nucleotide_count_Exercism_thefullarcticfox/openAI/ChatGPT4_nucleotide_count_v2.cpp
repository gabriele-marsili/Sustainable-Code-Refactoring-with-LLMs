#include "nucleotide_count.h"
#include <stdexcept>
#include <array>

namespace nucleotide_count {
    static inline void check_nuc_letter(char nuc) {
        if (nuc != 'A' && nuc != 'T' && nuc != 'C' && nuc != 'G') {
            throw std::invalid_argument("invalid nucleotide letter");
        }
    }

    counter::counter(const std::string& dna) : counts{ {0, 0, 0, 0} } {
        for (char nuc : dna) {
            check_nuc_letter(nuc);
            ++counts[nuc_to_index(nuc)];
        }
    }

    const std::map<char, int> counter::nucleotide_counts() const {
        return { {'A', counts[0]}, {'T', counts[1]}, {'C', counts[2]}, {'G', counts[3]} };
    }

    int counter::count(char nucleotide) const {
        check_nuc_letter(nucleotide);
        return counts[nuc_to_index(nucleotide)];
    }

private:
    static constexpr int nuc_to_index(char nuc) {
        switch (nuc) {
            case 'A': return 0;
            case 'T': return 1;
            case 'C': return 2;
            case 'G': return 3;
            default: throw std::invalid_argument("invalid nucleotide letter");
        }
    }

    std::array<int, 4> counts;
}  // namespace nucleotide_count