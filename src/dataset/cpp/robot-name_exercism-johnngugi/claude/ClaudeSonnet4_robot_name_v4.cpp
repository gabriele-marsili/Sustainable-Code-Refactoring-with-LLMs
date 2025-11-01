#include "robot_name.h"
#include <iostream>
#include <random>
using namespace std;
using namespace robot_name;

thread_local mt19937 rng(random_device{}());
thread_local uniform_int_distribution<int> letter_dist(0, 25);
thread_local uniform_int_distribution<int> digit_dist(0, 9);

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
    string current;
    current.reserve(5);
    
    current += gen_letters();
    current += gen_letters();
    current += gen_numbers();
    current += gen_numbers();
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

robot::robot()
{
    final_name = make_name();
    cout << final_name << endl;
}