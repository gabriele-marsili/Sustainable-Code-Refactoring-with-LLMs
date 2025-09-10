#include "robot_name.h"
#include <random>
#include <string>
#include <set>
#include <algorithm>

using std::string;
using std::set;
using std::random_device;
using std::mt19937;
using std::uniform_int_distribution;

namespace robot_name {

	set<string> robot::generated;

	robot::robot() : _name(robot::generate()) {}

	string robot::generate() {
		static random_device rd;
		static mt19937 gen(rd());
		static uniform_int_distribution<> letter_dist(0, 25);
		static uniform_int_distribution<> digit_dist(0, 9);

		string name(5, ' ');
		bool inserted = false;

		while (!inserted) {
			name[0] = 'A' + letter_dist(gen);
			name[1] = 'A' + letter_dist(gen);
			name[2] = '0' + digit_dist(gen);
			name[3] = '0' + digit_dist(gen);
			name[4] = '0' + digit_dist(gen);

			inserted = robot::generated.insert(name).second;
		}
		return name;
	}

	const string& robot::name() const {
		return _name;
	}

	void robot::reset() {
		string new_name = generate();
		_name = new_name;
	}
}  // namespace robot_name