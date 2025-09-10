#include "robot_name.h"
#include <iostream>
#include <random>
#include <string>

using namespace std;
using namespace robot_name;

// Static members to track used names
std::unordered_set<std::string> robot::used_names;
std::mt19937 robot::rng(std::random_device{}());

string robot::gen_letters()
{
	std::uniform_int_distribution<> distrib(0, 25);
	return string(1, (char)(distrib(rng) + 65));
}

string robot::gen_numbers()
{
	std::uniform_int_distribution<> distrib(0, 9);
	return to_string(distrib(rng));
}

string robot::make_name()
{
	string current;
	current.reserve(5); // Reserve space to avoid reallocations

	current += gen_letters();
	current += gen_letters();
	current += gen_numbers();
	current += gen_numbers();
	current += gen_numbers();

	return current;
}

string robot::get_unique_name()
{
    string new_name;
    do {
        new_name = make_name();
    } while (used_names.count(new_name) > 0);

    used_names.insert(new_name);
    return new_name;
}

string robot::name() const
{
	return final_name;
}

void robot::reset()
{
    used_names.erase(final_name);
	final_name = get_unique_name();
}

robot::robot() : final_name(get_unique_name())
{
	cout << final_name << endl;
}