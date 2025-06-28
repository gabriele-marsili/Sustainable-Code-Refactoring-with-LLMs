#include "grains.h"

unsigned long long grains::square(unsigned int field) {
	return (1ULL << field - 1);
}

unsigned long long grains::total() {
	return 0ULL - 1ULL;
}