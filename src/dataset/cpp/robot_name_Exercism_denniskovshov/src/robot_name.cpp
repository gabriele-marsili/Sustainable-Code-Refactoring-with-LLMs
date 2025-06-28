#include "robot_name.h"

#include <cstdlib>

namespace robot_name {
    std::unordered_set<std::string> robot::_existing_names = {};

    robot::robot() {
        _name = _generate_name();
    }

    std::string robot::name() const {
        return _name;
    }

    void robot::reset() {
        _name = _generate_name();
    }

    std::string robot::_generate_name() {
        std::string name;

        while (true) {
            name.push_back(_generate_rand_char());
            name.push_back(_generate_rand_char());
            name.push_back(_generate_rand_digit());
            name.push_back(_generate_rand_digit());
            name.push_back(_generate_rand_digit());

            if (robot::_existing_names.find(name) == robot::_existing_names.end()) {
                robot::_existing_names.emplace(name);
                break;
            }

            name = {};
        }

        return name;
    }

    char robot::_generate_rand_char() {
        return (char)('A' + rand() % 26);
    }

    char robot::_generate_rand_digit() {
        return (char)('0' + (rand() % 10));
    }
}  // namespace robot_name
