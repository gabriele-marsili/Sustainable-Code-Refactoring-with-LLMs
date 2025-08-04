/*
 * =====================================================================================
 *
 *       Filename:  robot_name.cpp
 *
 *    Description:  
 *
 *        Version:  1.0
 *        Created:  01.07.2015 13:43:47
 *       Revision:  none
 *       Compiler:  gcc
 *
 *
 * =====================================================================================
 */


#include <cstdlib> //for rand()
#include <algorithm>  	//for find, lower_bound
#include <iterator> 	//fot std::distance
#include <iostream>
#include "robot_name.h"



namespace robot_name
{

	//initalize vector without elements
	std::vector< std::string> robot::robotNames_{};

	char randChar()
	{
		return static_cast<char>(std::rand()%26) + 'A';
	}

	int randInt()
	{
		return rand()%10;
	}

	std::string robot::createName()
	{
		std::string name{""};
		name += randChar();
		name += randChar();

		//Found this easier than %1000 because leading 0 are guaranteed this way... 
		//might be changed in future versions
		name += std::to_string(randInt());
		name += std::to_string(randInt());
		name += std::to_string(randInt());

		return name;
	}

	std::string const& robot::name() const
	{ return name_;}

	//I was pondering, how to organize the list of names in the most 
	//efficient way and opted for a sorted vector. But I have serious doubts,
	//whether I chose right.
	//Any suggestions and comments regarding my choice will be greatly appreciated
	void robot::addToVector()
	{
		std::string name{createName()};
		std::vector<std::string>::iterator namePosition{ std::find( robotNames_.begin(), robotNames_.end(),
				name)};
		//If name is found: repeat creating new names, till not found
		while( namePosition != robotNames_.end())
		{
			name = createName();
			namePosition = std::find( robotNames_.begin(), robotNames_.end(), name);
		}
		//Place name at the proper position for a sorted vector
		namePosition = std::lower_bound( robotNames_.begin(), robotNames_.end(), name);
		robotNames_.insert( namePosition, name);

		name_ = name;
	}


	void robot::reset()
	{
		addToVector();
	}

}