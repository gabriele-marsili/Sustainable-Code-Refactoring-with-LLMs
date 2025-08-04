/*
 * =====================================================================================
 *
 *       Filename:  say.cpp
 *
 *    Description:  
 *
 *        Version:  1.0
 *        Created:  13.11.2015 15:11:23
 *       Revision:  none
 *       Compiler:  gcc
 *
 *
 * =====================================================================================
 */
#include "say.h"
#include <cmath>
#include <boost/algorithm/string.hpp>
#include <stdexcept>

namespace say
{
	std::string oneNames(int num)
	{
		switch (num)
		{
			case 1: return "one"; 
			case 2: return "two"; 
			case 3: return "three"; 
			case 4: return "four"; 
			case 5: return "five"; 
			case 6: return "six"; 
			case 7: return "seven"; 
			case 8: return "eight"; 
			case 9: return "nine"; 
			case 10: return "ten"; 
			case 11: return "eleven"; 
			case 12: return "twelve"; 
			default: return ""; 

		}
	}
	std::string names6099(long int num)
	{
		std::string engl{oneNames(num/10) + "ty"};
		if( (num % 10) != 0)
		{
			engl += "-" + oneNames(num %10);
		}
		return engl;

	}

	std::string tenNames(long int num)
	{
		switch(num)
		{
			case 1 ... 12: return oneNames(num);
			case 13 ... 19: return oneNames((num % 10)) + "teen";
			case 20: return "twenty";
			case 21 ... 29: return "twenty-" + oneNames(num%10);
			case 30: return "thirty";
			case 31 ... 39: return "thirty-" + oneNames(num%10);
			case 40: return "forty";
			case 41 ... 49: return "forty-" + oneNames(num%10);
			case 50: return "fifty";
			case 51 ... 59: return "fifty-" + oneNames(num%10);
			case 60 ... 79: return names6099(num);
			case 80: return "eighty";
			case 81 ... 89: return "eighty-" + oneNames(num%10);
			case 90 ... 99: return names6099(num);
			default: return "";
		}
	}

	uint_fast8_t determineLength(long int num)
	{
		return static_cast<uint_fast8_t>(std::to_string(num).size());
	}

	uint_fast8_t rest(uint_fast8_t l)
	{
		if(l <= 2)
		{
			return 0;
		}
		else
		{
			return (l - (l%3));
		}
	}

	std::string addUnit( std::string const& unit, long int& num)
	{
		std::string engl{};
		uint_fast8_t l{ determineLength(num) };
		if((l%3)==0)
		{
			engl += " " + oneNames( num / pow(10, l-1)) + " hundred";
			num %= static_cast<long int>(pow(10, l-1));
			--l;
		}

		if( (l- determineLength(num)) <=1)
		{
			l = determineLength(num);
			engl += " " + tenNames( num / static_cast<long int>(pow(10, rest(l))));
			num %= static_cast<long int>(pow(10, rest(l)));
		}
		return engl + " " + unit;
	}

	
	std::string in_english(long int number)
	{
		if( (number < 0) or (number >= 1000ULL*1000ULL*1000ULL*1000ULL))
		{
			throw std::domain_error("Number out of range");
		}
		if( number == 0)
		{
			return "zero";
		}
		uint_fast8_t numberlength{determineLength(number)};
		std::string english{};
		if(numberlength > 9)
		{
			english += addUnit("billion", number);
			numberlength = determineLength(number);
		}
		if(numberlength > 6)
		{
			english += addUnit("million", number);
			numberlength = determineLength(number);
		}
		if(numberlength > 3)
		{
			english += addUnit("thousand", number);
			numberlength = determineLength(number);
		}

		if(numberlength > 0)
		{
			english += addUnit("", number);
		}
		boost::algorithm::trim(english);
		return english;
	}
}