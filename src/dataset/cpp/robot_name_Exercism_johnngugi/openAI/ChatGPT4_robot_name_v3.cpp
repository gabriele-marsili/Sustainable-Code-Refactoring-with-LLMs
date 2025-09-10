#include "robot_name.h"
#include <iostream>
#include <random>
#include <string>
using namespace std;
using namespace robot_name;

namespace {
    std::mt19937& get_rng() {
        static thread_local std::mt19937 rng(std::random_device{}());
        return rng;
    }

    char random_letter() {
        static std::uniform_int_distribution<char> letter_dist('A', 'Z');
        return letter_dist(get_rng());
    }

    char random_digit() {
        static std::uniform_int_distribution<char> digit_dist('0', '9');
        return digit_dist(get_rng());
    }
}

string robot::gen_letters() {
    return string(1, random_letter());
}

string robot::gen_numbers() {
    return string(1, random_digit());
}

string robot::make_name() {
    string current;
    current.reserve(5);
    current += random_letter();
    current += random_letter();
    current += random_digit();
    current += random_digit();
    current += random_digit();
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