#include "robot_name.h"
#include <random>
#include <unordered_set>
#include <string>
#include <mutex>

using std::random_device;
using std::string;
using std::unordered_set;
using std::mutex;
using std::lock_guard;

namespace robot_name {
    unordered_set<string> robot::generated;
    mutex robot::gen_mutex;

    robot::robot() : _name(robot::generate()) {}

    string robot::generate() {
        static random_device rd;
        static std::mt19937 gen(rd());
        static std::uniform_int_distribution<> letter_dist(0, 25);
        static std::uniform_int_distribution<> digit_dist(0, 9);

        string name(5, ' ');

        while (true) {
            name[0] = 'A' + letter_dist(gen);
            name[1] = 'A' + letter_dist(gen);
            name[2] = '0' + digit_dist(gen);
            name[3] = '0' + digit_dist(gen);
            name[4] = '0' + digit_dist(gen);

            lock_guard<mutex> lock(gen_mutex);
            if (generated.insert(name).second) {
                return name;
            }
        }
    }

    const string& robot::name() const {
        return _name;
    }

    void robot::reset() {
        _name = robot::generate();
    }
}  // namespace robot_name