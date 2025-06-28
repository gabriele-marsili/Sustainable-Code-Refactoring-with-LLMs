#include "protein_translation.h"

namespace protein_translation {
	std::vector<std::string> proteins(std::string code) {
		std::vector<std::string> result;
		int codNum = code.size() / 3;
		for (int i = 0; i < codNum; ++i) {
			std::string subCode = code.substr(i * 3, 3);
			
			if (subCode == "AUG")
				result.push_back("Methionine");
			else if (subCode == "UUU" || subCode == "UUC")
				result.push_back("Phenylalanine");
			else if (subCode == "UUA" || subCode == "UUG")
				result.push_back("Leucine");
			else if (subCode == "UCU" || subCode == "UCC" || subCode == "UCA" || subCode == "UCG")
				result.push_back("Serine");
			else if (subCode == "UAU" || subCode == "UAC")
				result.push_back("Tyrosine");
			else if (subCode == "UGU" || subCode == "UGC")
				result.push_back("Cysteine");
			else if (subCode == "UGG")
				result.push_back("Tryptophan");
			else if (subCode == "UAA" || subCode == "UAG" || subCode == "UGA")
				break;
		}

		return result;
	}
}  // namespace protein_translation
