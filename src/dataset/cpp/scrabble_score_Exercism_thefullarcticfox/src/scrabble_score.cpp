#include "scrabble_score.h"
#include <algorithm>
#include <cctype>

namespace scrabble_score {
	long	score(const std::string& word) {
		long	res = 0;
		long	scrabblePoints[] = {
			1, 3, 3, 2, 1, 4, 2, 4, 1, 8, 5, 1, 3, 1,
			1, 3, 10, 1, 1, 1, 1, 4, 4, 8, 4, 10 };
		for (size_t i = 0; i < word.size(); i++)
			res += scrabblePoints[std::tolower(word.at(i)) - 'a'];
		return (res);
	}
}  // namespace scrabble_score
