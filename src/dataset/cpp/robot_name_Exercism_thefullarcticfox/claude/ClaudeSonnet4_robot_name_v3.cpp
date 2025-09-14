#include "robot_name.h"
#include <random>
#include <utility>
#include <unordered_set>
using std::random_device;
using std::pair;
using std::string;
using std::unordered_set;

namespace robot_name {
	unordered_set<string> robot::generated;
	thread_local std::mt19937 rng(std::random_device{}());

	robot::robot() : _name(robot::generate()) {}
	
	string robot::generate() {
		string name;
		name.reserve(5);
		
		std::uniform_int_distribution<int> letter_dist(0, 25);
		std::uniform_int_distribution<int> digit_dist(0, 9);
		
		do {
			name.clear();
			name += static_cast<char>('A' + letter_dist(rng));
			name += static_cast<char>('A' + letter_dist(rng));
			name += static_cast<char>('0' + digit_dist(rng));
			name += static_cast<char>('0' + digit_dist(rng));
			name += static_cast<char>('0' + digit_dist(rng));
		} while (!robot::generated.insert(name).second);
		
		return name;
	}

	const string& robot::name() const {
		return _name;
	}

	void robot::reset() {
		_name = robot::generate();
	}
}