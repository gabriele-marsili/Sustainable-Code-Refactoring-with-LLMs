#include "robot_name.h"
#include <random>
#include <unordered_set>
#include <string>
using std::random_device;
using std::unordered_set;
using std::string;

namespace robot_name {
    unordered_set<string> robot::generated;

    robot::robot() : _name(robot::generate()) {}

    string robot::generate() {
        static random_device rd;
        static std::mt19937 gen(rd());
        static std::uniform_int_distribution<> letter_dist(0, 25);
        static std::uniform_int_distribution<> digit_dist(0, 9);

        string name;
        do {
            name = string{
                static_cast<char>('A' + letter_dist(gen)),
                static_cast<char>('A' + letter_dist(gen)),
                static_cast<char>('0' + digit_dist(gen)),
                static_cast<char>('0' + digit_dist(gen)),
                static_cast<char>('0' + digit_dist(gen))
            };
        } while (!generated.insert(name).second);

        return name;
    }

    const string& robot::name() const {
        return _name;
    }

    void robot::reset() {
        _name = robot::generate();
    }
}  // namespace robot_name