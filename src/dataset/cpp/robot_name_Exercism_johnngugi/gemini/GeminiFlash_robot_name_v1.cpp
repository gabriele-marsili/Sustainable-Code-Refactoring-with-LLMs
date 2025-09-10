#include "robot_name.h"
#include <iostream>
#include <random>
#include <string>

using namespace std;
using namespace robot_name;

// Static members to manage names
std::unordered_set<std::string> robot::used_names;
std::mt19937 robot::rng(std::random_device{}());

string robot::gen_letters()
{
    std::uniform_int_distribution<int> dist(0, 25);
    return std::string(1, (char)(dist(rng) + 'A'));
}

string robot::gen_numbers()
{
    std::uniform_int_distribution<int> dist(0, 9);
    return std::to_string(dist(rng));
}

string robot::make_name()
{
    string current;
    current.reserve(5); // Pre-allocate memory

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
    if (!final_name.empty()) {
        used_names.erase(final_name);
    }
    final_name = get_unique_name();
}

robot::robot() : final_name(get_unique_name())
{
    cout << final_name << endl;
}

robot::~robot() {
    if (!final_name.empty()) {
        used_names.erase(final_name);
    }
}