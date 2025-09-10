#include "robot_name.h"
#include <iostream>
#include <random>
#include <string>
using namespace std;
using namespace robot_name;

namespace {
    std::mt19937 rng(std::random_device{}());
    std::uniform_int_distribution<int> letter_dist(65, 90); // A-Z
    std::uniform_int_distribution<int> number_dist(0, 9);
}

string robot::gen_letters() {
    return string(1, static_cast<char>(letter_dist(rng)));
}

string robot::gen_numbers() {
    return to_string(number_dist(rng));
}

string robot::make_name() {
    return gen_letters() + gen_letters() + 
           to_string(number_dist(rng)) + 
           to_string(number_dist(rng)) + 
           to_string(number_dist(rng));
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