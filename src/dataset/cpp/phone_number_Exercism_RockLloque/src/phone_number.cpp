/*
 * =====================================================================================
 *
 *       Filename:  phone_number.cpp
 *
 *    Description:  
 *
 *        Version:  1.0
 *        Created:  19.06.2015 16:18:53
 *       Revision:  none
 *       Compiler:  gcc
 *
 *
 * phone_number_h
#ifndef PHONE_NUMBER_H
#define PHONE_NUMBER_H
#include <string>


class phone_number
{
	public:
		phone_number( std::string const&);
		std::string number() const;
		std::string area_code() const;
		operator std::string() const;

	private:
		void check_length();
		void remove_non_numbers();
		std::string number_;

};


#endif
 * =====================================================================================
 */

#include <algorithm>
#include <iostream>
#include <sstream>
#include "phone_number.h"


static const int area_code_length{3};
static const int exchange_length{3};
static const int extension_length{4};
static const int valid_length{area_code_length + exchange_length + extension_length};
static const std::string invalid_number( valid_length, '0');



phone_number::phone_number( std::string const& input)
	: number_{input}
	{remove_non_numbers();
	check_length();}


void phone_number::remove_non_numbers()
{
	number_.erase( std::remove_if( number_.begin(), number_.end(),
			[]( char x) { return not std::isdigit(x);}),
			number_.end());
}

void phone_number::check_length()
{
	if( (number_.size() == valid_length+1) and number_.at(0) == '1')
	{
		number_.erase(0,1);
	}
	if(number_.size() == valid_length+1 or number_.size() == valid_length-1 )
	{
		number_ = invalid_number;
	}
}

std::string phone_number::number() const 
{
	return number_;
}

std::string phone_number::area_code() const
{
	return number_.substr(0,area_code_length);
}

phone_number::operator std::string() const
{
	std::ostringstream buffer{};
	buffer << '(' << number_.substr(0,area_code_length) << ") " << number_.substr(area_code_length, exchange_length) << '-' << number_.substr( area_code_length+ exchange_length, extension_length);
	return buffer.str();

}