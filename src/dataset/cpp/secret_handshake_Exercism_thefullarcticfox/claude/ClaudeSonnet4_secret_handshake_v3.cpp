#include "secret_handshake.h"
#include <algorithm>
using namespace std;

namespace secret_handshake {

	vector<string> commands(unsigned int bits) {
		static constexpr const char* actions[] = {
			"wink",
			"double blink", 
			"close your eyes",
			"jump"
		};
		
		vector<string> res;
		res.reserve(4);
		
		for (int i = 0; i < 4; ++i) {
			if (bits & (1u << i)) {
				res.emplace_back(actions[i]);
			}
		}
		
		if (bits & 0b10000u) {
			std::reverse(res.begin(), res.end());
		}
		
		return res;
	}
}  // namespace secret_handshake