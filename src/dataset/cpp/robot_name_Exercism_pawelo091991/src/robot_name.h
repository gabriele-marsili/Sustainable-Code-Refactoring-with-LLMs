#ifndef ROBOT_NAME_H
#define ROBOT_NAME_H
#include <string>
#include <random>
#include <stdlib.h>

namespace robot_name {
	class robot {
	private:
		std::string robotName;
		void generateName();
	public:
		robot();
		std::string name() const;
		void reset();
	};
}
#endif // !ROBOT_NAME_H
