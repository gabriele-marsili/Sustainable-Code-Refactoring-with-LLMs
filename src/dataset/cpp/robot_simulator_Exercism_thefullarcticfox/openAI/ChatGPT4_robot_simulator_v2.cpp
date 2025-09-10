#include "robot_simulator.h"
#include <stdexcept>
#include <cctype>
#include <unordered_map>

namespace robot_simulator {
	Robot::Robot(pair<int, int> pos, Bearing dir) : pos(pos), dir(dir) {}

	pair<int, int> Robot::get_position() const {
		return pos;
	}
	Bearing Robot::get_bearing() const {
		return dir;
	}

	void Robot::turn_left() {
		dir = static_cast<Bearing>((static_cast<int>(dir) + 3) % 4); // Equivalent to -1 mod 4
	}
	void Robot::turn_right() {
		dir = static_cast<Bearing>((static_cast<int>(dir) + 1) % 4);
	}

	void Robot::advance() {
		switch (dir) {
			case Bearing::NORTH: ++pos.second; break;
			case Bearing::EAST:  ++pos.first;  break;
			case Bearing::SOUTH: --pos.second; break;
			case Bearing::WEST:  --pos.first;  break;
		}
	}

	void Robot::execute_sequence(const string& seq) {
		for (char i : seq) {
			switch (std::toupper(i)) {
				case 'L': turn_left(); break;
				case 'R': turn_right(); break;
				case 'A': advance(); break;
				default: throw std::invalid_argument("unknown instruction in sequence");
			}
		}
	}
}  // namespace robot_simulator