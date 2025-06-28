#if !defined(NUCLEOTIDE_COUNT_H)
#define NUCLEOTIDE_COUNT_H

#include <map>
#include <string>
#include <unordered_set>

namespace nucleotide_count {

using std::string;

class counter {
  string dna_;
  std::map<char, int> nucleotides_{{'A', 0}, {'C', 0}, {'G', 0}, {'T', 0}};
  bool valid_key(char key) const;
  void validate_key(char key) const;

public:
  counter(string dna);
  std::map<char, int> const &nucleotide_counts() const;
  int count(char key) const;
};

} // namespace nucleotide_count

#endif // NUCLEOTIDE_COUNT_H
