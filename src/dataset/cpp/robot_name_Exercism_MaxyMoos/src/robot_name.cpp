#include "robot_name.h"
#include <boost/random/random_device.hpp>
#include <boost/random/uniform_int_distribution.hpp>
#include <iostream>

using namespace std;
using namespace robot_name;


void robot::generateName()
{
    string allowedChar = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    string allowedNum = "1234567890";
    string result = "";

    boost::random::random_device rng;
    boost::random::uniform_int_distribution<> char_dist(0, allowedChar.size() - 1);
    boost::random::uniform_int_distribution<> num_dist(0, allowedNum.size() - 1);

    for (int i = 0; i < 2; i++)
        result += allowedChar[char_dist(rng)];
    for (int i = 0; i < 3; i++)
        result += allowedNum[num_dist(rng)];

    this->_name = result;
}

robot::robot()
{
    this->generateName();
}

string robot::name() const
{
    return this->_name;
}

void robot::reset()
{
    this->generateName();
}
