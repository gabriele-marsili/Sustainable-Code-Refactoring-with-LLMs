#include "rna_transcription.h"
#include <algorithm>
#include <unordered_map>

namespace rna_transcription {

	char to_rna(char c) {
		static const std::unordered_map<char, char> transcription_map = {
			{'G', 'C'},
			{'C', 'G'},
			{'T', 'A'},
			{'A', 'U'}
		};

		auto it = transcription_map.find(c);
		if (it != transcription_map.end()) {
			return it->second;
		}
		return c;
	}

	std::string to_rna(const std::string& s) {
		std::string res = s;
		std::transform(res.begin(), res.end(), res.begin(), to_rna);
		return res;
	}
}  // namespace rna_transcription