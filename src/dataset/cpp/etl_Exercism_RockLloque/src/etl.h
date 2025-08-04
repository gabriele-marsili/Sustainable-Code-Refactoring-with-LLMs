#ifndef ETL_H
#define ETL_H
#include <vector>
#include <utility>
#include <map>

namespace etl
{
	std::map<char, int> transform( std::map<int, std::vector<char>> const&);
}

#endif