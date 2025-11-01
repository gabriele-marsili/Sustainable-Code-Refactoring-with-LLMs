#include "difference_of_squares.h"

unsigned int sum_of_squares(unsigned int number) 
{
    if(number == 0)
    {
        return 0;
    }
    if(number == 1)
    {
        return 1;
    }
    // Formula: n(n+1)(2n+1)/6
    return number * (number + 1) * (2 * number + 1) / 6;
}

unsigned int square_of_sum(unsigned int number) 
{
    if(number == 0)
    {
        return 0;
    }
    if(number == 1)
    {
        return 1;
    }
    // Formula: (n(n+1)/2)^2
    unsigned int sum = number * (number + 1) / 2;
    return sum * sum;
}

unsigned int difference_of_squares(unsigned int number) 
{ 
    if(number < 2)
    {
        return 0;
    }
    // Direct formula: (n(n+1)/2)^2 - n(n+1)(2n+1)/6
    // Simplified: n(n+1)(3n^2-n-2)/12
    return number * (number + 1) * (3 * number * number - number - 2) / 12;
}