#include "robot_name.h"
#include <random>
#include <utility>
using std::random_device;
using std::pair;
using std::string;
using std::set;

namespace robot_name {
	set<string>	robot::generated;
	thread_local std::mt19937 rng(std::random_device{}());

	robot::robot() : _name(robot::generate()) {}
	
	string		robot::generate() {
		string name(5, ' ');
		
		do {
			name[0] = 'A' + (rng() % 26);
			name[1] = 'A' + (rng() % 26);
			name[2] = '0' + (rng() % 10);
			name[3] = '0' + (rng() % 10);
			name[4] = '0' + (rng() % 10);
		} while (!robot::generated.insert(name).second);
		
		return name;
	}

	const string&	robot::name() const {
		return (_name);
	}

	void			robot::reset() {
		_name = robot::generate();
	}
}  // namespace robot_name