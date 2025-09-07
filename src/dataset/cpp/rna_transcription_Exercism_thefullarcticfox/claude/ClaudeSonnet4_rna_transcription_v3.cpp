#include "rna_transcription.h"

namespace rna_transcription {
	char to_rna(char c) {
		switch (c) {
			case 'G': return 'C';
			case 'C': return 'G';
			case 'T': return 'A';
			case 'A': return 'U';
			default: return c;
		}
	}

	std::string to_rna(const std::string& s) {
		std::string res;
		res.reserve(s.size());
		for (char c : s) {
			res.push_back(to_rna(c));
		}
		return res;
	}
}  // namespace rna_transcription