#if !defined(ROBOT_SIMULATOR_H)
#define ROBOT_SIMULATOR_H
#include <utility>
#include <string>
#include <map>

namespace robot_simulator {
	using namespace	std;

	enum Bearing {
		NORTH = 0,
		EAST = 1,
		SOUTH = 2,
		WEST = 3
	};

	class Robot {
	private:
		typedef	void (Robot::*cmd)();
		pair<int, int>			pos;
		Bearing					dir;
		const map<char, cmd>	fmap;
	public:
		Robot(pair<int, int> pos = {0, 0}, Bearing dir = Bearing::NORTH);

		pair<int, int>	get_position() const;
		Bearing			get_bearing() const;

		void			turn_left();
		void			turn_right();
		void			advance();
		void			execute_sequence(const string& seq);
	};
}  // namespace robot_simulator

#endif // ROBOT_SIMULATOR_H
