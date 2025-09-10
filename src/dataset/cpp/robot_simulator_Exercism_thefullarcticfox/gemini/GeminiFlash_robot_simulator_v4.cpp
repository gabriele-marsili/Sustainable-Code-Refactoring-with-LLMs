#include "robot_simulator.h"
#include <stdexcept>
#include <cctype>
#include <unordered_map>

namespace robot_simulator {
	Robot::Robot(pair<int, int> pos, Bearing dir) : pos(pos), dir(dir) {}

	pair<int, int>	Robot::get_position() const {
		return pos;
	}
	Bearing			Robot::get_bearing() const {
		return dir;
	}

	void			Robot::turn_left() {
		switch (dir) {
			case Bearing::NORTH:
				dir = Bearing::WEST;
				break;
			case Bearing::EAST:
				dir = Bearing::NORTH;
				break;
			case Bearing::SOUTH:
				dir = Bearing::EAST;
				break;
			case Bearing::WEST:
				dir = Bearing::SOUTH;
				break;
		}
	}
	void			Robot::turn_right() {
		switch (dir) {
			case Bearing::NORTH:
				dir = Bearing::EAST;
				break;
			case Bearing::EAST:
				dir = Bearing::SOUTH;
				break;
			case Bearing::SOUTH:
				dir = Bearing::WEST;
				break;
			case Bearing::WEST:
				dir = Bearing::NORTH;
				break;
		}
	}

	void			Robot::advance() {
		switch (dir) {
			case Bearing::NORTH:
				++pos.second;
				break;
			case Bearing::EAST:
				++pos.first;
				break;
			case Bearing::SOUTH:
				--pos.second;
				break;
			case Bearing::WEST:
				--pos.first;
				break;
		}
	}

	void			Robot::execute_sequence(const string& seq) {
		static const std::unordered_map<char, void (Robot::*)()> fmap = {
			{'L', &Robot::turn_left},
			{'R', &Robot::turn_right},
			{'A', &Robot::advance}
		};

		for (const char& i : seq) {
			char instruction = std::toupper(i);
			auto it = fmap.find(instruction);
			if (it != fmap.end()) {
				(this->*it->second)();
			} else {
				throw std::invalid_argument("unknown instruction in sequence");
			}
		}
	}
}  // namespace robot_simulator