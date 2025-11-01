#include "robot_name.h"
#include <iostream>
#include <random>
#include <string>

using namespace std;
using namespace robot_name;

namespace {
    std::random_device rd;
    std::mt19937 gen(rd());
    std::uniform_int_distribution<> letter_dist(0, 25);
    std::uniform_int_distribution<> digit_dist(0, 9);

    std::string generate_name() {
        std::string name;
        name.reserve(5);
        name += (char)('A' + letter_dist(gen));
        name += (char)('A' + letter_dist(gen));
        name += std::to_string(digit_dist(gen));
        name += std::to_string(digit_dist(gen));
        name += std::to_string(digit_dist(gen));
        return name;
    }
}

string robot::name() const {
    return final_name;
}

void robot::reset() {
    final_name = generate_name();
}

robot::robot() : final_name(generate_name()) {
    cout << final_name << endl;
}