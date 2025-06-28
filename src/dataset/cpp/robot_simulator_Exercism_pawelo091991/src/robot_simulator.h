#if !defined(ROBOT_SIMULATOR_H)
#define ROBOT_SIMULATOR_H
#include <utility>
#include <string>

namespace robot_simulator {
	enum Bearing {
		NORTH = 1,
		SOUTH = 2,
		EAST = 3,
		WEST = 4
	};

	class Robot {
	private:
		std::pair<int, int> pos;
		Bearing dir;

	public:
		Robot();
		Robot(std::pair<int, int> pos, Bearing dir);
		std::pair<int, int> get_position() const;
		Bearing get_bearing() const;
		void execute_sequence(std::string);
		void turn_right();
		void turn_left();
		void advance();
	};
}  // namespace robot_simulator

#endif // ROBOT_SIMULATOR_H