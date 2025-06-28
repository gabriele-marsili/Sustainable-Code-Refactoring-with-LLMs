#if !defined(ETL_H)
#define ETL_H
#include <map>
#include <vector>
#include <utility>
#include <cctype>
namespace etl {
	std::map<char, int> transform(std::map<int, std::vector<char>> old_sys);
}  // namespace etl

#endif // ETL_H