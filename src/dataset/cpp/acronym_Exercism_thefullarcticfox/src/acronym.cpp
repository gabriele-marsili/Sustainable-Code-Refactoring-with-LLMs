#include "acronym.h"
#include <cctype>

namespace acronym {
	std::string	acronym(const std::string& str) {
		std::string	res;
		for (size_t i = 0; i < str.size(); i++) {
			if (isalnum(str.at(i))) {
				res.push_back(std::toupper(str.at(i)));
				while (i < str.size() && isalnum(str.at(i)))
					i++;
			}
		}
		return (res);
	}
}  // namespace acronym
