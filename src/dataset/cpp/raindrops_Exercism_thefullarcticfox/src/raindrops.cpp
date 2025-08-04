#include "raindrops.h"

namespace raindrops {
	std::string	convert(int number) {
		std::string	res;

		if (number % 3 == 0)
			res += "Pling";
		if (number % 5 == 0)
			res += "Plang";
		if (number % 7 == 0)
			res += "Plong";

		if (res.empty())
			res = std::to_string(number);
		return (res);
	}
}  // namespace raindrops
