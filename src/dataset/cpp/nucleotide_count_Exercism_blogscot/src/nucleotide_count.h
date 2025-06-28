#ifndef NUCLEOTIDE_COUNT_H_
#define NUCLEOTIDE_COUNT_H_

#include <map>
#include <string>

namespace dna {
using std::invalid_argument;
using std::map;
using std::string;
using std::to_string;

typedef map<char, int> nucleotide_type;

class counter {
  nucleotide_type nucleotides;

 public:
  explicit counter(const string& strand);
  const nucleotide_type& nucleotide_counts() const;
  int count(const char) const;
};
}  // namespace dna

#endif  // NUCLEOTIDE_COUNT_H_
