#include "protein_translation.h"
#include <unordered_map>

using std::string;
using std::vector;
using std::unordered_map;

namespace protein_translation {

vector<string> proteins(const string& rna) {
  vector<string> res;
  const size_t rna_size = rna.size();

  // Precompute codon translations for efficiency.
  static const unordered_map<string, string> codon_map = {
      {"AUG", "Methionine"},
      {"UUU", "Phenylalanine"},
      {"UUC", "Phenylalanine"},
      {"UUA", "Leucine"},
      {"UUG", "Leucine"},
      {"UCU", "Serine"},
      {"UCC", "Serine"},
      {"UCA", "Serine"},
      {"UCG", "Serine"},
      {"UAU", "Tyrosine"},
      {"UAC", "Tyrosine"},
      {"UGU", "Cysteine"},
      {"UGC", "Cysteine"},
      {"UGG", "Tryptophan"},
      {"UAA", "STOP"},
      {"UAG", "STOP"},
      {"UGA", "STOP"}};

  for (size_t i = 0; i + 3 <= rna_size; i += 3) {
    string codon = rna.substr(i, 3);
    auto it = codon_map.find(codon);
    if (it != codon_map.end()) {
      if (it->second == "STOP") {
        break;
      }
      res.push_back(it->second);
    }
  }
  return res;
}

} // namespace protein_translation