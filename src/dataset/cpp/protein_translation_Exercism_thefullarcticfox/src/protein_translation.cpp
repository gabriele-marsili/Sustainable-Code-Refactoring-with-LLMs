#include "protein_translation.h"
using std::string;
using std::vector;

namespace protein_translation {
	vector<string>	proteins(const string& rna) {
		vector<string>	codons;
		for (size_t i = 0; i + 3 <= rna.size(); i += 3)
			codons.push_back(rna.substr(i, 3));

		vector<string>	res;
		for (auto& codon : codons) {
			if (codon == "AUG")
				res.push_back("Methionine");
			else if (codon == "UUU" || codon == "UUC")
				res.push_back("Phenylalanine");
			else if (codon == "UUA" || codon == "UUG")
				res.push_back("Leucine");
			else if (codon == "UCU" || codon == "UCC" || codon == "UCA" || codon == "UCG")
				res.push_back("Serine");
			else if (codon == "UAU" || codon == "UAC")
				res.push_back("Tyrosine");
			else if (codon == "UGU" || codon == "UGC")
				res.push_back("Cysteine");
			else if (codon == "UGG")
				res.push_back("Tryptophan");
			else if (codon == "UAA" || codon == "UAG" || codon == "UGA")
				break;
		}
		return (res);
	}
}  // namespace protein_translation
