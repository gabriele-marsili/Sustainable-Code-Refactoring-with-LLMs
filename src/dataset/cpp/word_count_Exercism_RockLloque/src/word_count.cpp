/*
 * =====================================================================================
 *
 *       Filename:  word_count.cpp
 *
 *
 *        Version:  1.0
 *        Created:  09.05.2015 22:36:27
 *       Revision:  none
 *       Compiler:  gcc
 *
 *         Author:  RockLloque
 *   word_count.h:  
 *
 *  #ifndef WORD_COUNT_H
 *  #define WORD_COUNT_H
 *
 *  #include <string>
 *  #include <map>
 *
 *  class word_count
 *  {
 *	public:
 *		static std::map<std::string, int> words(std::string);
 *  };
 * =====================================================================================
 */

#include "word_count.h"
#include <sstream>
#include <algorithm>
#include <boost/algorithm/string.hpp>

bool non_letter(char c)
{
	return not ( std::isalnum(c, std::locale()) or std::iswspace(c) or c == '\'');
}

char commaToSpace(char c)
{
	if(c == ',')
		c = ' ';
	return c;
}
std::map<std::string, int> word_count::words(std::string input)
{
	
	std::transform ( input.begin(), input.end(), input.begin(),
			 commaToSpace);
	input.erase(std::remove_if(input.begin(), input.end(), non_letter), 
			input.end());

	std::transform ( input.begin(), input.end(), input.begin(),
			 tolower);

	boost::replace_all( input, " '", "  ");
	boost::replace_all( input, "' ", "  ");
	if( not input.empty())
	{
		std::string::iterator it{ input.end()-1};
		if( *it == '\'')
			input.pop_back();
	}

	std::istringstream sentence(input);
	std::map<std::string ,int> counts{};
	std::string word{};
	while( not sentence.eof())
	{
		sentence >> word;
		++counts[word];
	}
	return counts;
}