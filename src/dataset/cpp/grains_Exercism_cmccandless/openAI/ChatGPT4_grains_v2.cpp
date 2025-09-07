#include "grains.h"

unsigned long long grains::square(int n)
{
	return 1ULL << (n - 1);
}

unsigned long long grains::total()
{
	return (1ULL << 64) - 1;
}