#include "difference_of_squares.h"

long squares::square_of_sums(int a)
{
    long sum = static_cast<long>(a) * (a + 1) / 2;
    return sum * sum;
}

long squares::sum_of_squares(int a)
{
    return static_cast<long>(a) * (a + 1) * (2 * a + 1) / 6;
}

long squares::difference(int a)
{
    return square_of_sums(a) - sum_of_squares(a);
}