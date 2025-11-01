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
}

string robot::make_name() {
    string current;
    current.reserve(5);
    current += (char)('A' + letter_dist(gen));
    current += (char)('A' + letter_dist(gen));
    current += to_string(digit_dist(gen));
    current += to_string(digit_dist(gen));
    current += to_string(digit_dist(gen));
    return current;
}

string robot::name() const {
    return final_name;
}

void robot::reset() {
    final_name = make_name();
}

robot::robot() : final_name(make_name()) {
    cout << final_name << endl;
}