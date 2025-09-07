#include "grains.h"
#include <stdexcept>

unsigned long long grains::square(int n)
{
    if (n <= 0 || n > 64) {
        throw std::domain_error("square must be between 1 and 64");
    }
    return 1ULL << (n - 1);
}

unsigned long long grains::total()
{
    return (1ULL << 64) - 1;
}