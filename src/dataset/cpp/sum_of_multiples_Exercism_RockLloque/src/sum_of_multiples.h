#ifndef SUM_OF_MULTIPLES_H
#define SUM_OF_MULTIPLES_H

#include <initializer_list>



namespace sum_of_multiples
{
	unsigned to(unsigned num);

	unsigned to(std::initializer_list<unsigned> const& multiples, int num);

	
}

#endif