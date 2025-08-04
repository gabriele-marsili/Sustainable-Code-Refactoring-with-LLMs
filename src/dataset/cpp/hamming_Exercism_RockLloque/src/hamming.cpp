#include "hamming.h"
#include <stdexcept>
#include <iostream>


int hamming::compute(std::string const& genecode1, std::string const& genecode2)
{
	if(genecode1.length() != genecode2.length())
		throw std::domain_error("");

	int counter{}, pos{};
	for(auto && ele: genecode1)
	{
		if( ele != genecode2.at(pos)){++counter;}
		++pos;
	}
	return counter;
}