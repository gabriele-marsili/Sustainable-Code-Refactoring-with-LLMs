#include "robot_name.h"
#include <random>
#include <string>
#include <set>
#include <algorithm>

using std::random_device;
using std::mt19937;
using std::uniform_int_distribution;
using std::string;
using std::set;

namespace robot_name {

	set<string> robot::generated;
	std::mt19937 robot::generator((std::random_device())());
	std::uniform_int_distribution<> robot::letter_dist(0, 25);
	std::uniform_int_distribution<> robot::digit_dist(0, 9);


	robot::robot() : _name(robot::generate()) {}

	string robot::generate() {
		string name;
		do {
			name.resize(5);
			name[0] = 'A' + letter_dist(generator);
			name[1] = 'A' + letter_dist(generator);
			name[2] = '0' + digit_dist(generator);
			name[3] = '0' + digit_dist(generator);
			name[4] = '0' + digit_dist(generator);
		} while (generated.count(name) > 0);

		generated.insert(name);
		return name;
	}

	const string& robot::name() const {
		return _name;
	}

	void robot::reset() {
		string old_name = _name;
		_name = generate();
		generated.erase(old_name);
	}
} // namespace robot_name