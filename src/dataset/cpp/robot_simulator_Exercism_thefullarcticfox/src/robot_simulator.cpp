#include "robot_simulator.h"
#include <stdexcept>
#include <cctype>

namespace robot_simulator {
	Robot::Robot(pair<int, int> pos, Bearing dir) : pos(pos), dir(dir),
		fmap({	{ 'L', &Robot::turn_left	},
				{ 'R', &Robot::turn_right	},
				{ 'A', &Robot::advance		}}) {}

	pair<int, int>	Robot::get_position() const {
		return (this->pos);
	}
	Bearing			Robot::get_bearing() const {
		return (this->dir);
	}

	void			Robot::turn_left() {
		if (dir == Bearing::NORTH)
			dir = Bearing::WEST;
		else
			dir = static_cast<Bearing>((static_cast<int>(dir) - 1) % 4);
	}
	void			Robot::turn_right() {
		dir = static_cast<Bearing>((static_cast<int>(dir) + 1) % 4);
	}

	void			Robot::advance() {
		if (dir == Bearing::NORTH)
			++(pos.second);
		else if (dir == Bearing::EAST)
			++(pos.first);
		else if (dir == Bearing::SOUTH)
			--(pos.second);
		else if (dir == Bearing::WEST)
			--(pos.first);
	}

	void			Robot::execute_sequence(const string& seq) {
		for (auto& i : seq) {
			try {
				(this->*fmap.at(std::toupper(i)))();
			} catch (const std::out_of_range& e) {
				throw std::invalid_argument("unknown instruction in sequence");
			}
		}
	}
}  // namespace robot_simulator
