#include "protein_translation.h"
#include <unordered_map>
using std::string;
using std::vector;
using std::unordered_map;

namespace protein_translation {
	vector<string> proteins(const string& rna) {
		static const unordered_map<string, string> codon_to_protein = {
			{"AUG", "Methionine"},
			{"UUU", "Phenylalanine"}, {"UUC", "Phenylalanine"},
			{"UUA", "Leucine"}, {"UUG", "Leucine"},
			{"UCU", "Serine"}, {"UCC", "Serine"}, {"UCA", "Serine"}, {"UCG", "Serine"},
			{"UAU", "Tyrosine"}, {"UAC", "Tyrosine"},
			{"UGU", "Cysteine"}, {"UGC", "Cysteine"},
			{"UGG", "Tryptophan"},
			{"UAA", ""}, {"UAG", ""}, {"UGA", ""}
		};

		vector<string> res;
		for (size_t i = 0; i + 3 <= rna.size(); i += 3) {
			auto it = codon_to_protein.find(rna.substr(i, 3));
			if (it == codon_to_protein.end() || it->second.empty())
				break;
			res.push_back(it->second);
		}
		return res;
	}
}  // namespace protein_translation