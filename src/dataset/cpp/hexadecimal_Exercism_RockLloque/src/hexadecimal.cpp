/*
 * =====================================================================================
 *
 *       Filename:  hexadecimal.cpp
 *
 *    Description:  
 *
 *        Version:  1.0
 *        Created:  05.11.2015 18:20:12
 *       Revision:  none
 *       Compiler:  gcc
 *
 *
 * =====================================================================================
 */
#include "hexadecimal.h"
#include <cctype>



namespace hexadecimal
{
	unsigned convert(std::string const& hex)
	{
		for( char c : hex)
		{
			if( (not std::isdigit(c)) and ( c != 'a') and ( c != 'b') and ( c != 'c') and ( c != 'd') and ( c != 'e') and ( c != 'f') )
			{
				return 0;
			}
		}
		unsigned value{0};

		for( char c : hex)
		{
			if( std::isdigit(c))
			{
				value+= c -'0';
			}
			else
			{
				value += c -'a' + 10;
			}
			value *= 16;
		}
		return value/16;
	}
}