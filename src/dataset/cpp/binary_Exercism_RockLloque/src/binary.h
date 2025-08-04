#ifndef BINARY_H
#define BINARY_H
#include <string>
#include <algorithm>

namespace binary
{
	unsigned convert( std::string const& input)
	{

		auto forbiddenChars{ std::find_if(input.begin(), input.end(),
				     [](char c){ return not( c=='0' or c=='1');})};

		if( forbiddenChars != input.end())
		{
			return 0;
		}
		unsigned total{0};

		for(unsigned pos{0}; pos< input.size(); ++pos)
		{
			if( input.at(pos) == '1')
			{
				total += 1 << ( input.size()-pos-1);
			}
		}
		return total;
	}
}


#endif