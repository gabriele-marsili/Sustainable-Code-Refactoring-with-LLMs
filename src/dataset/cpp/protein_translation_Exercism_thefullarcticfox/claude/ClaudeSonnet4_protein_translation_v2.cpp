#include "protein_translation.h"
#include <unordered_map>
using std::string;
using std::vector;
using std::unordered_map;

namespace protein_translation {
	vector<string> proteins(const string& rna) {
		static const unordered_map<string, string> codon_map = {
			{"AUG", "Methionine"},
			{"UUU", "Phenylalanine"}, {"UUC", "Phenylalanine"},
			{"UUA", "Leucine"}, {"UUG", "Leucine"},
			{"UCU", "Serine"}, {"UCC", "Serine"}, {"UCA", "Serine"}, {"UCG", "Serine"},
			{"UAU", "Tyrosine"}, {"UAC", "Tyrosine"},
			{"UGU", "Cysteine"}, {"UGC", "Cysteine"},
			{"UGG", "Tryptophan"}
		};
		
		static const unordered_map<string, bool> stop_codons = {
			{"UAA", true}, {"UAG", true}, {"UGA", true}
		};

		vector<string> res;
		res.reserve(rna.size() / 3);

		for (size_t i = 0; i + 3 <= rna.size(); i += 3) {
			string codon = rna.substr(i, 3);
			
			if (stop_codons.count(codon))
				break;
			
			auto it = codon_map.find(codon);
			if (it != codon_map.end())
				res.push_back(it->second);
		}
		
		return res;
	}
}  // namespace protein_translation