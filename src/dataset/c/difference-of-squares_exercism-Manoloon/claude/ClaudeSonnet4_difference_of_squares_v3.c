#include "difference_of_squares.h"

unsigned int sum_of_squares(unsigned int number) 
{
    if (number == 0) return 0;
    if (number == 1) return 1;
    
    return number * (number + 1) * (2 * number + 1) / 6;
}

unsigned int square_of_sum(unsigned int number) 
{
    if (number == 0) return 0;
    if (number == 1) return 1;
    
    unsigned int sum = number * (number + 1) / 2;
    return sum * sum;
}

unsigned int difference_of_squares(unsigned int number) 
{ 
    if (number < 2) return 0;
    
    unsigned int sum_formula = number * (number + 1) / 2;
    unsigned int sum_of_squares_formula = number * (number + 1) * (2 * number + 1) / 6;
    
    return (sum_formula * sum_formula) - sum_of_squares_formula;
}