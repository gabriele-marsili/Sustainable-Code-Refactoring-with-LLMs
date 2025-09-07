#include "two_fer.h"
#include <string>

namespace two_fer
{
	std::string two_fer(const std::string& name) {
		std::string result = "One for ";
		result.reserve(19 + name.length());
		result += name;
		result += ", one for me.";
		return result;
	}
} // namespace two_fer