#include "difference_of_squares.h"

int squares::square_of_sums(int a)
{
    int sum = a * (a + 1) / 2; // Use arithmetic series formula
    return sum * sum; // Square the sum directly
}

int squares::sum_of_squares(int b)
{
    // Use formula for the sum of squares of the first n natural numbers
    return (b * (b + 1) * (2 * b + 1)) / 6;
}

int squares::difference(int c)
{
    return squares::square_of_sums(c) - squares::sum_of_squares(c);
}