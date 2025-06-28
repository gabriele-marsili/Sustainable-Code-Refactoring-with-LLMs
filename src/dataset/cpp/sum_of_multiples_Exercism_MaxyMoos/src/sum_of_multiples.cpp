#include "sum_of_multiples.h"
#include <iostream>


long sum_of_multiples::to(int limit)
{
	long sum = 0;
	for(int i = 1; i < limit; i++)
	{
		if (i % 3 == 0 || i % 5 == 0)
			sum += i;
	}
	return sum;
}

long sum_of_multiples::to(std::vector<int> multiples, int limit)
{
	long sum = 0;
	for(int i = 1; i < limit; i++)
	{
		for(std::vector<int>::iterator it = multiples.begin(); it != multiples.end(); it++)
		{
			if (i % (*it) == 0)
			{
				sum += i;
				break;
			}
		}
	}
	return sum;
}