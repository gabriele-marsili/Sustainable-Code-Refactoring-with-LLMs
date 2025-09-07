#include "two_fer.h"

namespace two_fer
{
	std::string two_fer(const std::string& name) {
		static const std::string prefix = "One for ";
		static const std::string suffix = ", one for me.";
		return prefix + name + suffix;
	}
} // namespace two_fer