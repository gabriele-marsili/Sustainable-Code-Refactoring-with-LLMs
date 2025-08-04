/*
 * =====================================================================================
 *
 *       Filename:  nucleotide_count.cpp
 *
 *    Description:  
 *
 *        Version:  1.0
 *        Created:  17.06.2015 21:49:22
 *       Revision:  none
 *       Compiler:  gcc
 *
 *
 * =====================================================================================

*/
#include <stdexcept> // For throw std::invalid_argument
#include <iterator>
#include "nucleotide_count.h"

namespace dna
{
	counter::counter( std::string const& in)
	: dnaCounts_ { {'A', 0}, {'C', 0}, {'G', 0} , {'T', 0}}
	{
		std::map< char, int>::iterator nuc_find{};
		for( auto element : in)
		{
			++ dnaCounts_[element];
		}
	}


	std::map< char, int> const& counter::nucleotide_counts() const
	{
		return dnaCounts_;
	}


	int counter::count(char c) const
	{
		const auto nuc_find = dnaCounts_.find(c);
		if( nuc_find == dnaCounts_.end())
			throw std::invalid_argument("Unknown nucleotide");
		return nuc_find->second;
	}

}