#ifndef SERIES_H
#define SERIES_H
#include <string>
#include <vector>


namespace series
{
	std::vector<int> digits(std::string const& input);
	std::vector<std::vector<int>> slice(std::string const& input, int length);


}

#endif