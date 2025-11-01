#include "robot_name.h"
#include <iostream>
#include <random>
#include <string>
using namespace std;
using namespace robot_name;

namespace {
    random_device rd;
    mt19937 gen(rd());
    uniform_int_distribution<> letter_dist(65, 90); // A-Z
    uniform_int_distribution<> number_dist(0, 9);  // 0-9
}

string robot::gen_letters()
{
    return string(1, static_cast<char>(letter_dist(gen)));
}

string robot::gen_numbers()
{
    return to_string(number_dist(gen));
}

string robot::make_name()
{
    string current;
    current.reserve(5); // Reserve space for 5 characters
    for (int i = 0; i < 2; ++i)
        current += gen_letters();
    for (int i = 0; i < 3; ++i)
        current += gen_numbers();
    return current;
}

string robot::name() const
{
    return final_name;
}

void robot::reset()
{
    final_name = make_name();
}

robot::robot() : final_name(make_name())
{
    cout << final_name << endl;
}