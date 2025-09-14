#include "robot_simulator.h"
#include <stdexcept>
#include <cctype>

namespace robot_simulator {
    Robot::Robot(pair<int, int> pos, Bearing dir) : pos(pos), dir(dir) {}

    pair<int, int> Robot::get_position() const {
        return pos;
    }

    Bearing Robot::get_bearing() const {
        return dir;
    }

    void Robot::turn_left() {
        dir = static_cast<Bearing>((static_cast<int>(dir) + 3) & 3);
    }

    void Robot::turn_right() {
        dir = static_cast<Bearing>((static_cast<int>(dir) + 1) & 3);
    }

    void Robot::advance() {
        static constexpr int dx[] = {0, 1, 0, -1};
        static constexpr int dy[] = {1, 0, -1, 0};
        const int bearing = static_cast<int>(dir);
        pos.first += dx[bearing];
        pos.second += dy[bearing];
    }

    void Robot::execute_sequence(const string& seq) {
        for (char c : seq) {
            const char upper_c = std::toupper(c);
            switch (upper_c) {
                case 'L':
                    turn_left();
                    break;
                case 'R':
                    turn_right();
                    break;
                case 'A':
                    advance();
                    break;
                default:
                    throw std::invalid_argument("unknown instruction in sequence");
            }
        }
    }
}