#include "secret_handshake.h"
#include <algorithm>
#include <vector>
#include <array>

namespace secret_handshake {

	vector<string> commands(unsigned int bits) {
		std::vector<std::string> res;
		res.reserve(4);

		if (bits & 0b1u) {
			res.emplace_back("wink");
		}
		if (bits & 0b10u) {
			res.emplace_back("double blink");
		}
		if (bits & 0b100u) {
			res.emplace_back("close your eyes");
		}
		if (bits & 0b1000u) {
			res.emplace_back("jump");
		}

		if (bits & 0b10000u) {
			std::reverse(res.begin(), res.end());
		}

		return res;
	}
}  // namespace secret_handshake