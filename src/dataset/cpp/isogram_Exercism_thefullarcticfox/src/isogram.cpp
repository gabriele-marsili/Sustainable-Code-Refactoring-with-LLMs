#include "isogram.h"
#include <algorithm>

namespace isogram {
	bool	is_isogram(const std::string& s) {
		if (s.empty())
			return (true);

		std::string	tmp;
		tmp.resize(s.size());
		std::transform(s.begin(), s.end(), tmp.begin(), ::tolower);
		std::sort(tmp.begin(), tmp.end());

		size_t	beg = tmp.find_first_not_of(" -");
		if (beg == std::string::npos)
			return (true);
		tmp = tmp.substr(beg);

		for (size_t i = 1; i < tmp.size(); i++)
			if (tmp.at(i - 1) == tmp.at(i))
				return (false);
		return (true);
	}
}  // namespace isogram
