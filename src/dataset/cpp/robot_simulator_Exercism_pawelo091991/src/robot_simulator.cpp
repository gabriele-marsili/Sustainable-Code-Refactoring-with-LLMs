#include "robot_simulator.h"

namespace robot_simulator {
	Robot::Robot() {
		pos.first = 0;
		pos.second = 0;
		dir = Bearing::NORTH;
	}

	Robot::Robot(std::pair<int, int> pos, Bearing dir) {
		this->pos.first = pos.first;
		this->pos.second = pos.second;
		this->dir = dir;
	}

	std::pair<int, int> Robot::get_position() const{
		return pos;
	}

	Bearing Robot::get_bearing() const{
		return dir;
	}

	void Robot::turn_right() {
		switch (dir)
		{
		case NORTH:
			dir = EAST;
			break;
		case SOUTH:
			dir = WEST;
			break;
		case EAST:
			dir = SOUTH;
			break;
		case WEST:
			dir = NORTH;
			break;
		}
	}

	void Robot::turn_left() {
		switch (dir) {
		case NORTH:
			dir = WEST;
			break;
		case SOUTH:
			dir = EAST;
			break;
		case EAST:
			dir = NORTH;
			break;
		case WEST:
			dir = SOUTH;
			break;
		}
	}

	void Robot::advance() {
		switch (dir) {
		case NORTH:
			++pos.second;
			break;
		case SOUTH:
			--pos.second;
			break;
		case EAST:
			++pos.first;
			break;
		case WEST:
			--pos.first;
			break;
		}
	}

	void Robot::execute_sequence(std::string dirs) {
		for (auto c : dirs) {
			switch (c) {
			case 'R':
				turn_right();
				break;
			case 'L':
				turn_left();
				break;
			case 'A':
				advance();
				break;
			}
		}
	}

}  // namespace robot_simulator
