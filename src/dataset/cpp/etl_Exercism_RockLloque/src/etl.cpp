/*
 * =====================================================================================
 *
 *       Filename:  etl.cpp
 *
 *    Description:  
 *
 *        Version:  1.0
 *        Created:  25.07.2015 07:38:03
 *       Revision:  none
 *       Compiler:  gcc
 *
 *
 * =====================================================================================
 */
#include "etl.h"
#include <cctype>
namespace etl
{

	std::map<char, int> transform( std::map<int, std::vector<char>> const& input)
	{
		std::map<char, int> newSystem{};
		for( auto ele1 : input)
		{
			for( auto ele2 : ele1.second)
			{
				newSystem[std::tolower(ele2)] = ele1.first;
			}
		}
		return newSystem;
	}
}