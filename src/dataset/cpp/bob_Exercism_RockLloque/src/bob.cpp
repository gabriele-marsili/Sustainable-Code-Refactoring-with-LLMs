/*
 * =====================================================================================
 *
 *#ifndef BOB_H
 *#define BOB_H
 *#include<string>
 *
 *
 *
 *class bob
 *{
 *	public:
 *		static std::string hey(std::string&);
 *};
 *
 *
 *#endif
 *
 *
 * =====================================================================================
 */

#include <boost/algorithm/string/trim.hpp>
#include <string>
#include <algorithm>
#include "bob.h"




bool find_lowerCase(std::string const& text)
{
	return text.end() != std::find_if(text.begin(), text.end(), [] (char const& c ){ char d{c}; return c == tolower(d) and isalpha(c);});
}


std::string bob::hey(std::string text)
{
	std::string toBob{"Whatever."};

	boost::algorithm::trim(text);

	if(text== "")
		toBob= "Fine. Be that way!";

	if(text.back() == '?')
		toBob = "Sure.";

	if( not find_lowerCase(text))
		toBob = "Whoa, chill out!";

	return toBob;


}