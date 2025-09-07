#include "two_fer.h"

namespace two_fer
{
	std::string	two_fer(const std::string& name) {
		std::string result;
		result.reserve(18 + name.size()); // "One for " + name + ", one for me." = 18 + name length
		result += "One for ";
		result += name;
		result += ", one for me.";
		return result;
	}
} // namespace two_fer