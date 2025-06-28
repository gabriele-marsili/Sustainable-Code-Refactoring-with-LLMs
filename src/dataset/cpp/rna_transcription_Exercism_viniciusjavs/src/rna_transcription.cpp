#include "rna_transcription.h"
#include <algorithm>
#include <unordered_map>

namespace rna_transcription {

std::unordered_map<char, char> const dna_to_rna{
    {'G', 'C'}, {'C', 'G'}, {'T', 'A'}, {'A', 'U'}};

char to_rna(char dna) { return dna_to_rna.at(dna); }

string to_rna(string strand) {
  std::transform(cbegin(strand), cend(strand), std::begin(strand),
                 static_cast<char (*)(char)>(to_rna));
  return strand;
}

} // namespace rna_transcription
