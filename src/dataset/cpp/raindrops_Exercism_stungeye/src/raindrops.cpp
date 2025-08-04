#include "raindrops.h"

namespace raindrops {

	std::string convert(int number) {
		std::string raindrops;

		if (number % 3 == 0) {
			raindrops += "Pling";
		}

		if (number % 5 == 0) {
			raindrops += "Plang";
		}

		if (number % 7 == 0) {
			raindrops += "Plong";
		}

		return raindrops.empty() ? std::to_string(number) : raindrops;
	}
} // namespace raindrops
