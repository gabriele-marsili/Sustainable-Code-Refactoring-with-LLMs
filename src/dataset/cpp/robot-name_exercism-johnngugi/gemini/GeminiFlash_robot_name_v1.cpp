#include "robot_name.h"
#include <iostream>
#include <random>
#include <string>

using namespace std;
using namespace robot_name;

// Static members to track used names and random number generation
static std::unordered_set<std::string> used_names;
static std::mt19937 generator(std::random_device{}());
static std::uniform_int_distribution<int> letter_dist(0, 25);
static std::uniform_int_distribution<int> digit_dist(0, 9);

string robot::make_name() {
  std::string name;
  do {
    name.clear();
    name += (char)('A' + letter_dist(generator));
    name += (char)('A' + letter_dist(generator));
    name += std::to_string(digit_dist(generator));
    name += std::to_string(digit_dist(generator));
    name += std::to_string(digit_dist(generator));
  } while (used_names.count(name) > 0);

  used_names.insert(name);
  return name;
}

string robot::name() const { return final_name; }

void robot::reset() {
  used_names.erase(final_name);
  final_name = make_name();
}

robot::robot() {
  final_name = make_name();
  cout << final_name << endl;
}