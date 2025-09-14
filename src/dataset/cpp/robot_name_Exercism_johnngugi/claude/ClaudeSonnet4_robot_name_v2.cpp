#include "robot_name.h"
#include <iostream>
#include <cstdlib>
#include <ctime>
using namespace std;
using namespace robot_name;

string robot::make_name()
{
	string result;
	result.reserve(5);
	
	result += (char)(rand() % 26 + 65);
	result += (char)(rand() % 26 + 65);
	result += (char)(rand() % 10 + 48);
	result += (char)(rand() % 10 + 48);
	result += (char)(rand() % 10 + 48);

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