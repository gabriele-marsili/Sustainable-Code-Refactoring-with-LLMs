#include "robot_name.h"
#include <iostream>
#include <random>
#include <string>

using namespace robot_name;

// Use a static random number generator for efficiency
static std::mt19937 rng(std::random_device{}());

std::string robot::gen_letters() {
  std::uniform_int_distribution<int> dist(0, 25);
  return std::string(1, static_cast<char>(dist(rng) + 'A'));
}

std::string robot::gen_numbers() {
  std::uniform_int_distribution<int> dist(0, 9);
  return std::to_string(dist(rng));
}

std::string robot::make_name() {
  std::string current;
  current.reserve(5); // Pre-allocate memory for the string

  current += gen_letters();
  current += gen_letters();
  current += gen_numbers();
  current += gen_numbers();
  current += gen_numbers();

  return current;
}

std::string robot::name() const { return final_name; }

void robot::reset() { final_name = make_name(); }

robot::robot() {
  final_name = make_name();
  std::cout << final_name << std::endl;
}