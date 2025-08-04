#include "secret_handshake.h"
#include <algorithm>
#include <map>
using namespace std;

namespace secret_handshake {

	static void		wink(vector<string>& cmds) {
		cmds.push_back("wink");
	}

	static void		double_blink(vector<string>& cmds) {
		cmds.push_back("double blink");
	}

	static void		close_eyes(vector<string>& cmds) {
		cmds.push_back("close your eyes");
	}

	static void		jump(vector<string>& cmds) {
		cmds.push_back("jump");
	}

	static void		reverse(vector<string>& cmds) {
		std::reverse(cmds.begin(), cmds.end());
	}

	vector<string>	commands(unsigned int bits) {
		map<unsigned int, void (*)(vector<string>&)>	ops = {
			{0b1u,		wink},
			{0b10u,		double_blink},
			{0b100u,	close_eyes},
			{0b1000u,	jump},
			{0b10000u,	reverse}};

		vector<string>	res;
		for (auto& op : ops)
			if (bits & op.first)
				op.second(res);
		return (res);
	}
}  // namespace secret_handshake
