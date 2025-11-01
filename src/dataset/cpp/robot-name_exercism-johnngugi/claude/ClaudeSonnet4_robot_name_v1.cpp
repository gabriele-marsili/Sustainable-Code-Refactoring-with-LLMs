#include "robot_name.h"
#include <iostream>
#include <cstdlib>
#include <ctime>
using namespace std;
using namespace robot_name;

string robot::gen_letters()
{
	return string(1, (char)(rand() % 26 + 65));
}

string robot::gen_numbers()
{
	return string(1, (char)(rand() % 10 + '0'));
}

string robot::make_name()
{
	string current;
	current.reserve(5);

	current += (char)(rand() % 26 + 65);
	current += (char)(rand() % 26 + 65);
	current += (char)(rand() % 10 + '0');
	current += (char)(rand() % 10 + '0');
	current += (char)(rand() % 10 + '0');

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