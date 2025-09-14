#include "robot_name.h"
#include <iostream>
#include <random>
#include <string>

using namespace std;
using namespace robot_name;

namespace {
    thread_local mt19937 rng(random_device{}());
    uniform_int_distribution<int> letter_dist(0, 25);
    uniform_int_distribution<int> digit_dist(0, 9);
}

string robot::gen_letters()
{
    return string(1, static_cast<char>('A' + letter_dist(rng)));
}

string robot::gen_numbers()
{
    return string(1, static_cast<char>('0' + digit_dist(rng)));
}

string robot::make_name()
{
    string result;
    result.reserve(5);
    
    result += static_cast<char>('A' + letter_dist(rng));
    result += static_cast<char>('A' + letter_dist(rng));
    result += static_cast<char>('0' + digit_dist(rng));
    result += static_cast<char>('0' + digit_dist(rng));
    result += static_cast<char>('0' + digit_dist(rng));
    
    return result;
}

string robot::name() const
{
    return final_name;
}

void robot::reset()
{
    final_name = make_name();
}

robot::robot()
{
    final_name = make_name();
    cout << final_name << endl;
}