#include "robot_name.h"
#include <random>
#include <string>
#include <set>
#include <algorithm>

using std::random_device;
using std::string;
using std::set;
using std::generate;

namespace robot_name {

	set<string> robot::generated; // Initialize without empty string

	robot::robot() : _name(robot::generate()) {}

	string robot::generate() {
		static std::mt19937 rng(std::random_device{}()); // Static for reuse
		static std::uniform_int_distribution<int> letter_dist(0, 25);
		static std::uniform_int_distribution<int> digit_dist(0, 9);

		string name(5, ' ');
		while (true) {
			name[0] = 'A' + letter_dist(rng);
			name[1] = 'A' + letter_dist(rng);
			name[2] = '0' + digit_dist(rng);
			name[3] = '0' + digit_dist(rng);
			name[4] = '0' + digit_dist(rng);

			// Check if the name already exists using count for efficiency
			if (robot::generated.count(name) == 0) {
				robot::generated.insert(name);
				return name;
			}
		}
	}

	const string& robot::name() const {
		return _name;
	}

	void robot::reset() {
		_name = robot::generate();
	}
}  // namespace robot_name