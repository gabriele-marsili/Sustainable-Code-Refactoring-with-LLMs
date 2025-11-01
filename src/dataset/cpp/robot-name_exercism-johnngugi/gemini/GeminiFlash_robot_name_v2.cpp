#include "robot_name.h"
#include <iostream>
#include <random>
#include <string>

using namespace std;
using namespace robot_name;

// Static members to track used names and the random number generator
std::unordered_set<std::string> robot::used_names;
std::mt19937 robot::rng(std::random_device{}());

string robot::gen_letters()
{
	std::uniform_int_distribution<> dist(0, 25);
	return std::string(1, (char)(dist(rng) + 65));
}

string robot::gen_numbers()
{
	std::uniform_int_distribution<> dist(0, 9);
	return std::to_string(dist(rng));
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

string robot::generate_unique_name() {
    std::string new_name;
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
	used_names.erase(final_name); // Remove the old name from the used names set
	final_name = generate_unique_name();
}

robot::robot() : final_name(generate_unique_name())
{
	cout << final_name << endl;
}