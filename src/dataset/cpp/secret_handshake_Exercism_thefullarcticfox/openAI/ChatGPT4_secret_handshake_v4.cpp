#include "secret_handshake.h"
#include <vector>
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

	static inline void reverse(vector<string>& cmds) {
		std::reverse(cmds.begin(), cmds.end());
	}

	vector<string> commands(unsigned int bits) {
		vector<string> res;
		if (bits & 0b1u) wink(res);
		if (bits & 0b10u) double_blink(res);
		if (bits & 0b100u) close_eyes(res);
		if (bits & 0b1000u) jump(res);
		if (bits & 0b10000u) reverse(res);
		return res;
	}
}  // namespace secret_handshake