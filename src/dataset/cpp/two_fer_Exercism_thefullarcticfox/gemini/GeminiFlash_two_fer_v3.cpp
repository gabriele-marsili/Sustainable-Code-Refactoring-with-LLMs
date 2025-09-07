#include "two_fer.h"
#include <string>
#include <sstream>

namespace two_fer
{
	std::string two_fer(const std::string& name) {
		std::ostringstream oss;
		oss.reserve(25 + name.length()); // Pre-allocate memory to avoid reallocations
		oss << "One for " << name << ", one for me.";
		return oss.str();
	}
} // namespace two_fer