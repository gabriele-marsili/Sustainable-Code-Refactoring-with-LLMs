#if !defined(SERIES_H)
#define SERIES_H
#include <vector>
#include <string>
#include <stdexcept>
namespace series {
	std::vector<int> digits(std::string num);
	std::vector<std::vector<int>> slice(std::string num, int pr);
}  // namespace series

#endif // SERIES_H