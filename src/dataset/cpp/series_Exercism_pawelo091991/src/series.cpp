#include "series.h"

namespace series {
	std::vector<int> digits(std::string num) {
		std::vector<int> output;
		for (auto i : num)
			output.push_back(i - 48);

		return output;
	}

	std::vector<std::vector<int>> slice(std::string num, int pr) {
		if (num.length() < pr)
			throw std::domain_error("Dupa");

		std::vector<std::vector<int>> output;
		for (int i = 0; i <= num.length() - pr; i++) {
			output.push_back(digits(num.substr(i, pr)));
		}
		return output;
	}
}  // namespace series
