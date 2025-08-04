#include "robot_simulator.h"
#include <stdexcept>

namespace{
	using robot_simulator::Bearing;

	Bearing & operator++(Bearing &b)
	{
		switch(b){
			case Bearing::NORTH: return b=Bearing::EAST;
			case Bearing::EAST: return b=Bearing::SOUTH;
			case Bearing::SOUTH: return b=Bearing::WEST;
			case Bearing::WEST: return b=Bearing::NORTH;
			default: throw std::logic_error{"Unkown bearing"};
		}
	}

	Bearing & operator--(Bearing &b)
	{
		switch(b){
			case Bearing::NORTH: return b=Bearing::WEST;
			case Bearing::EAST: return b=Bearing::NORTH;
			case Bearing::SOUTH: return b=Bearing::EAST;
			case Bearing::WEST: return b=Bearing::SOUTH;
			default: throw std::logic_error{"Unkown bearing"};
		}
	}
	

}



namespace robot_simulator{



	Robot::Robot(rob_pos const& pos, Bearing mb): mposition{pos}, mbearing{mb} {}

	rob_pos Robot::get_position() const {return mposition;}
	Bearing Robot::get_bearing() const {return mbearing;}

	void Robot::turn_right() {
		++mbearing;
	}

	void Robot::turn_left() {
		--mbearing;
	}

	void Robot::advance(){
		switch(mbearing){
			case Bearing::NORTH: ++mposition.second; break;
			case Bearing::EAST: ++mposition.first; break;
			case Bearing::SOUTH: --mposition.second; break;
			case Bearing::WEST: --mposition.first; break;
			default: throw std::logic_error{"Unknown bearing"};
		}
	}

	void Robot::execute_sequence(std::string const& commands){
		for(char ele : commands){
			switch(ele){
				case 'R': turn_right(); break;
				case 'L': turn_left(); break;
				case 'A': advance(); break;
				default: throw std::logic_error{"Unknown command"};
			}
		}
	}
}
