#include "secret_handshake.h"
#include <vector>
#include <string>
using namespace std;

namespace secret_handshake {

	static inline void wink(vector<string>& cmds) {
		cmds.emplace_back("wink");
	}

	static inline void double_blink(vector<string>& cmds) {
		cmds.emplace_back("double blink");
	}

	static inline void close_eyes(vector<string>& cmds) {
		cmds.emplace_back("close your eyes");
	}

	static inline void jump(vector<string>& cmds) {
		cmds.emplace_back("jump");
	}

	vector<string> commands(unsigned int bits) {
		vector<string> res;

		if (bits & 0b1u) wink(res);
		if (bits & 0b10u) double_blink(res);
		if (bits & 0b100u) close_eyes(res);
		if (bits & 0b1000u) jump(res);
		if (bits & 0b10000u) reverse(res.begin(), res.end());

		return res;
	}
}  // namespace secret_handshake