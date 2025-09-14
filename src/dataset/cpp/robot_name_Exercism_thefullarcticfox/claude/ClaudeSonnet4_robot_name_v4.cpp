#include "robot_name.h"
#include <random>
#include <utility>
using std::random_device;
using std::pair;
using std::string;
using std::set;

namespace robot_name {
	set<string>	robot::generated;
	thread_local std::mt19937 robot::rng{std::random_device{}()};

	robot::robot() : _name(robot::generate()) {}
	
	string		robot::generate() {
		auto			insres = robot::generated.insert("");
		string			name;
		name.reserve(5);

		while (!insres.second) {
			name.clear();
			name += static_cast<char>('A' + (robot::rng() % 26));
			name += static_cast<char>('A' + (robot::rng() % 26));
			name += static_cast<char>('0' + (robot::rng() % 10));
			name += static_cast<char>('0' + (robot::rng() % 10));
			name += static_cast<char>('0' + (robot::rng() % 10));
			insres = robot::generated.insert(name);
		}
		return name;
	}

	const string&	robot::name() const {
		return (_name);
	}

	void			robot::reset() {
		_name = robot::generate();
	}
}  // namespace robot_name