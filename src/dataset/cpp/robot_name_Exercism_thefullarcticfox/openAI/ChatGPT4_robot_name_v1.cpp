#include "robot_name.h"
#include <random>
#include <string>
#include <unordered_set>
using std::mt19937;
using std::uniform_int_distribution;
using std::string;
using std::unordered_set;

namespace robot_name {
    unordered_set<string> robot::generated;
    mt19937 robot::rng{std::random_device{}()};
    uniform_int_distribution<int> robot::letter_dist(0, 25);
    uniform_int_distribution<int> robot::digit_dist(0, 9);

    robot::robot() : _name(robot::generate()) {}

    string robot::generate() {
        string name(5, ' ');
        do {
            name[0] = 'A' + letter_dist(rng);
            name[1] = 'A' + letter_dist(rng);
            name[2] = '0' + digit_dist(rng);
            name[3] = '0' + digit_dist(rng);
            name[4] = '0' + digit_dist(rng);
        } while (!robot::generated.insert(name).second);
        return name;
    }

    const string& robot::name() const {
        return _name;
    }

    void robot::reset() {
        _name = robot::generate();
    }
}  // namespace robot_name