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
	set<string>	robot::generated;

	robot::robot() : _name(robot::generate()) {}

	string robot::generate() {
		static std::mt19937 gen(std::random_device{}());
		static std::uniform_int_distribution<> letter_dist(0, 25);
		static std::uniform_int_distribution<> digit_dist(0, 9);

		string name(5, ' ');
		while (true) {
			name[0] = 'A' + letter_dist(gen);
			name[1] = 'A' + letter_dist(gen);
			name[2] = '0' + digit_dist(gen);
			name[3] = '0' + digit_dist(gen);
			name[4] = '0' + digit_dist(gen);

			if (generated.find(name) == generated.end()) {
				generated.insert(name);
				return name;
			}
		}
	}

	const string& robot::name() const {
		return _name;
	}

	void robot::reset() {
		string old_name = _name;
		_name = robot::generate();
		generated.erase(old_name);
	}
}  // namespace robot_name