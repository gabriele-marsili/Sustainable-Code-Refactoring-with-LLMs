#include <utility>
#include <string>


namespace robot_simulator{
	using rob_pos = std::pair<int, int>;
	enum struct Bearing{
		NORTH, EAST, SOUTH, WEST

	};

		class Robot{
			public:
				Robot(rob_pos const& pos= rob_pos{0,0}, Bearing mb = Bearing::NORTH);

				rob_pos get_position() const;	
				Bearing get_bearing() const;	

				void turn_right();
				void turn_left();

				void advance();

				void execute_sequence(std::string const&);
			private:
				rob_pos mposition;
				Bearing  mbearing;
		};
}
