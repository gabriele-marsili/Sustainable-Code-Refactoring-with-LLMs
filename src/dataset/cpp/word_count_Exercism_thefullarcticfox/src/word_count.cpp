#include "word_count.h"
#include <algorithm>
#include <regex>

namespace word_count {
	std::map<std::string, int>	words(std::string str) {
		std::map<std::string, int>	res;

		//	tolower the whole string
		std::transform(str.begin(), str.end(), str.begin(), ::tolower);

		//	using regex for words with ' too
		std::regex	words_regex("\\b[\\w']+\\b");
		auto words_begin = std::sregex_iterator(str.begin(), str.end(), words_regex);
    	auto words_end = std::sregex_iterator();
		while (words_begin != words_end) {
			res[(*words_begin).str()] += 1;
			words_begin++;
		}
		return res;
	}
}  // namespace word_count
