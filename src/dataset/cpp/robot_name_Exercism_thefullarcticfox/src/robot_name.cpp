#include "robot_name.h"
#include <random>
#include <utility>
using std::random_device;
using std::pair;
using std::string;
using std::set;

namespace robot_name {
	set<string>	robot::generated = {""};

	robot::robot() : _name(robot::generate()) {}
	string		robot::generate() {
		random_device	rd;
		auto			insres = robot::generated.insert("");
		string			name(5, ' ');

		while (!insres.second) {
			name.at(0) = 'A' + (rd() % 26);
			name.at(1) = 'A' + (rd() % 26);
			name.at(2) = '0' + (rd() % 10);
			name.at(3) = '0' + (rd() % 10);
			name.at(4) = '0' + (rd() % 10);
			insres = robot::generated.insert(name);
		}
		return (name);
	}

	const string&	robot::name() const {
		return (_name);
	}

	void			robot::reset() {
		_name = robot::generate();
	}
}  // namespace robot_name
