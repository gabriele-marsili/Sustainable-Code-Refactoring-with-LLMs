#include "scrabble_score.h"

namespace scrabble_score {
	int score(std::string word) {
		int result = 0;
		std::vector<int> score = { 1,3,3,2,1,4,2,4,1,8,5,1,
			3,1,1,3,10,1,1,1,1,4,4,8,4,10 };
		for (auto& c : word) {
			c = std::tolower(c);
			result += score[c-97];
		}

		return result;
	}
}  // namespace scrabble_score
