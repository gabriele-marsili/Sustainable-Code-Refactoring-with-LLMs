#include "nucleotide_count.h"

#include <algorithm>
#include <stdexcept>

namespace nucleotide_count {

using std::cbegin;
using std::cend;

bool counter::valid_key(char key) const {
  char const keys[] = {'A', 'C', 'G', 'T'};
  return std::any_of(cbegin(keys), cend(keys),
                     [key](auto k) { return key == k; });
}

void counter::validate_key(char key) const {
  if (!valid_key(key))
    throw std::invalid_argument{"Invalid key."};
}

counter::counter(string dna) : dna_{dna} {
  std::for_each(cbegin(dna_), cend(dna_), [this](auto key) {
    validate_key(key);
    ++nucleotides_[key];
  });
}

std::map<char, int> const &counter::nucleotide_counts() const {
  return nucleotides_;
}

int counter::count(char key) const {
  validate_key(key);
  return nucleotides_.at(key);
}

} // namespace nucleotide_count
