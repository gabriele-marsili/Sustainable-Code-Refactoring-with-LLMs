#include "nucleotide_count.h"
#include <map>
#include <stdexcept>
#include <string>

namespace dna {

bool is_valid(const char nucleotide) {
  return ((string) "ATCG").find(nucleotide) != string::npos;
}

bool is_valid_strand(const string &strand) {
  for (char nucleotide : strand)
    if (!is_valid(nucleotide)) return false;
  return true;
}

counter::counter(const string &strand)
    : nucleotides{{'A', 0}, {'T', 0}, {'C', 0}, {'G', 0}} {
  if (!is_valid_strand(strand))
    throw invalid_argument("Invalid argument: " + strand);

  for (char nucleotide : strand) nucleotides[nucleotide]++;
}

const nucleotide_type &counter::nucleotide_counts() const {
  return nucleotides;
}

int counter::count(const char nucleotide) const {
  if (!is_valid(nucleotide))
    throw invalid_argument("Invalid argument: " + to_string(nucleotide));

  return nucleotide_counts().at(nucleotide);
}
}  // namespace dna
