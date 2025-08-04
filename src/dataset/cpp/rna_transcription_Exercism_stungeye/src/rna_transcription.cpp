#include "rna_transcription.h"
#include <algorithm>
#include <map>
#include <stdexcept>

namespace rna_transcription {

  std::map<char, char> dna_to_rna = {
    {'G', 'C'},
    {'C', 'G'},
    {'T', 'A'},
    {'A', 'U'}
  };

  bool invalid_nucleotide(char nucleotide) {
    return dna_to_rna.count(nucleotide) == 0;
  }

  char to_rna(const char& dna_nucleotide) {
    if (invalid_nucleotide(dna_nucleotide)) {
      throw std::invalid_argument("Invalid DNA nucleotide.");
    }
    return dna_to_rna.at(dna_nucleotide);
  }

  std::string to_rna(const std::string& dna_nucleotides) {
    // Possible Improvement: Full string scanned for invalid nucleotides,
    // rather than relying on to_rna() to throw on invalid nucleotide.

    std::string rna_nucleotides;

    std::transform(dna_nucleotides.begin(), dna_nucleotides.end(),
                   std::back_inserter(rna_nucleotides),
                   [](char c) { return to_rna(c); });

    return rna_nucleotides;
  }
} // namespace rna_transcription
