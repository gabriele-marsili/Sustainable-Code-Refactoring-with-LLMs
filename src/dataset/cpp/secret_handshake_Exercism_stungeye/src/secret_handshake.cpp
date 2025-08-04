#include "secret_handshake.h"
#include <algorithm>

namespace secret_handshake {

	commandList commands(int command) {
		commandList list;

		if (command & 1) list.emplace_back("wink");
		if (command & 2) list.emplace_back("double blink");
		if (command & 4) list.emplace_back("close your eyes");
		if (command & 8) list.emplace_back("jump");

		if (command & 16) std::reverse(list.begin(), list.end());

		return list;
	}
}  // namespace secret_handshake
