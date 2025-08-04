#if !defined(SERIES_H)
#define SERIES_H
#include <string>
#include <vector>

namespace series {
	std::vector<int>				digits(const std::string& number);
	std::vector< std::vector<int> >	slice(const std::string& number, unsigned int digitcount);
}  // namespace series

#endif // SERIES_H
