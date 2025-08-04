/*
 * =====================================================================================
 *
 *       Filename:  queen_attack.cpp
 *
 *    Description:  
 *
 *        Version:  1.0
 *        Created:  13.01.2016 13:36:00
 *       Revision:  none
 *       Compiler:  gcc
 *
 *
 * =====================================================================================
 */

#include "queen_attack.h"
#include <stdexcept>
#include <sstream>

namespace queen_attack
{
	chess_board::chess_board(std::pair<int, int> const&  white, std::pair<int, int> const&  black): white_{white}, black_{black}	
	{
		if( white_ == black_)
		{
			throw std::domain_error("Queens can't occupy the same position!");
		}
	}
	std::pair<int, int> chess_board::white() const
	{
		return white_;
	}
	std::pair<int, int> chess_board::black() const
	{
		return black_;
	}

	chess_board::operator std::string () const
	{
		std::ostringstream buffer;
		for( size_t i{0}; i<8; ++i)
		{
			std::string line{"_ _ _ _ _ _ _ _\n"};
			if( i == static_cast<size_t>(white_.first))
			{
				line.at(2*white_.second) = 'W';
			}
			if( i == static_cast<size_t>(black_.first))
			{
				line.at(2*black_.second) = 'B';
			}
			buffer << line;
		}
		return buffer.str();
	}

	bool chess_board::can_attack() const
	{
		//Can attack on the same row
		if( white_.first == black_.first)
		{
			return true;
		}
		//Can attack on the same line
		else if( white_.second == black_.second)
		{
			return true;
		}
		else if(( (white_.first -white_.second) == (black_.first -black_.second)) or ( (white_.first +white_.second) == (black_.first +black_.second)))
		{
			return true;
		}
		else 
		{
			return false;
		}
	}
}