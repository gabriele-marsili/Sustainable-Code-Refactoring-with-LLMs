/*
 * =====================================================================================
 *
 *       Filename:  grade_school.cpp
 *
 *    Description:  Added std::move at two places to eliminate spurious copies 
 *
 *        Version:  2.0
 *        Created:  27.06.2015 12:59:53
 *       Revision:  none
 *       Compiler:  gcc
 *
 *
 * =====================================================================================
 */
#include <algorithm>
#include "grade_school.h"


namespace grade_school
{
	typedef std::vector< std::string> stringVec;
 	void school::add( std::string const& name, int grade)
	{
		roster_[grade].push_back(name);
		if( roster_[grade].size() >1)
			std::sort(roster_[grade].begin(), roster_[grade].end() );
	}

	stringVec school::grade(int g) 
	{
		return std::move(roster_[g]);

	}

}