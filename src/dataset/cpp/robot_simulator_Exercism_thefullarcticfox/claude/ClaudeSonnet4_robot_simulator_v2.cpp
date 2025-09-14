#include "robot_simulator.h"
#include <stdexcept>

namespace robot_simulator {
	Robot::Robot(pair<int, int> pos, Bearing dir) : pos(pos), dir(dir) {}

	pair<int, int>	Robot::get_position() const {
		return pos;
	}
	Bearing			Robot::get_bearing() const {
		return dir;
	}

	void			Robot::turn_left() {
		dir = static_cast<Bearing>((static_cast<int>(dir) + 3) & 3);
	}
	void			Robot::turn_right() {
		dir = static_cast<Bearing>((static_cast<int>(dir) + 1) & 3);
	}

	void			Robot::advance() {
		static const int dx[] = {0, 1, 0, -1};
		static const int dy[] = {1, 0, -1, 0};
		int bearing = static_cast<int>(dir);
		pos.first += dx[bearing];
		pos.second += dy[bearing];
	}

	void			Robot::execute_sequence(const string& seq) {
		for (char c : seq) {
			switch (c | 32) {  // Convert to lowercase
				case 'l': turn_left(); break;
				case 'r': turn_right(); break;
				case 'a': advance(); break;
				default: throw std::invalid_argument("unknown instruction in sequence");
			}
		}
	}
}  // namespace robot_simulator