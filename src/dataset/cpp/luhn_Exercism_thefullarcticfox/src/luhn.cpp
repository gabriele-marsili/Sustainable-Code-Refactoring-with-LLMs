#include "luhn.h"
#include <cctype>
#include <vector>

namespace luhn {
	bool	valid(const std::string& str) {
		if (str.find_first_not_of(" 0123456789") != std::string::npos)
			return (false);		//	only digits and spaces are valid
		std::vector<short>	tmp;
		tmp.reserve(16);
		for (size_t i = 0; i < str.size(); i++)
			if (std::isdigit(str.at(i)))
				tmp.push_back(str.at(i) - '0');
		if (tmp.size() < 2)		//	less than 2 digits is invalid
			return (false);

		typedef	std::vector<short>::reverse_iterator	t_rit;
		for (t_rit it = tmp.rbegin() + 1; it < tmp.rend(); it += 2) {
			*it *= 2;
			if (*it > 9)
				*it -= 9;
		}

		int	sum = 0;
		for (auto& n : tmp)
		    sum += n;
		return (sum % 10 == 0);
	}
}  // namespace luhn
