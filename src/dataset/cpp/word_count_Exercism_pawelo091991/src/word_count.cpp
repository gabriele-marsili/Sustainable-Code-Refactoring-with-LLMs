#include "word_count.h"

namespace word_count {

	std::map<std::string, int> words(std::string text) {
		std::map<std::string, int> dict;
		std::regex patt("[a-z1-9]+'?\\b[a-z]?");
		std::smatch match;
		for (int i = 0; i < text.size(); i++) { text[i] = std::tolower(text[i]); }
		while (std::regex_search(text, match, patt)) {
			dict[match.str()]++;
			text = match.suffix().str();
		}
		return dict;
	}
}  // namespace word_count
