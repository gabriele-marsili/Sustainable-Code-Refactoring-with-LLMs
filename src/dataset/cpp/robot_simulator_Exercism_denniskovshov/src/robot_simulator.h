#if !defined(ROBOT_SIMULATOR_H)
#define ROBOT_SIMULATOR_H

#include <utility>
#include <string>

namespace robot_simulator {
    enum Bearing {
        NORTH,
        EAST,
        SOUTH,
        WEST
    };

    class Robot {
        public:
            Robot();
            Robot(std::pair<int, int> position, Bearing bearing);

            std::pair<int, int> get_position() const;
            Bearing get_bearing() const;
            
            void turn_right();
            void turn_left();
            void advance();
            void execute_sequence(const std::string& sequence);

        private:
            int _position_x = 0;
            int _position_y = 0;
            Bearing _facing_direction = Bearing::NORTH;
    };
}  // namespace robot_simulator

#endif // ROBOT_SIMULATOR_H