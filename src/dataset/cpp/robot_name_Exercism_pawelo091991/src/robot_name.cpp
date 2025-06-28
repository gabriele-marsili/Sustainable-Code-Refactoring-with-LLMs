#include "robot_name.h"

void robot_name::robot::generateName() {
	std::random_device rd;
	std::mt19937 gen(rd());
	std::uniform_int_distribution<> disInt(65, 90);
	std::uniform_int_distribution<> disChar(48, 57);

	for (int i = 0; i < 2; i++)
		robotName += disInt(gen);
		for (int i = 0; i < 3; i++)
		robotName += disChar(gen);
}

robot_name::robot::robot() {
	generateName();
}

std::string robot_name::robot::name() const{
	return robotName;
}

void robot_name::robot::reset() {
	robotName.clear();
	generateName();
}