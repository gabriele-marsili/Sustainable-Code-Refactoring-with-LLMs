#include "difference_of_squares.h"

unsigned int sum_of_squares(unsigned int number) 
{
    if(number < 2)
    {
        return 1;
    }
    unsigned int result = 0;
    for(unsigned int i = 1; i <= number;i++)
    {
        result += i * i;
    }
    return result; 
}

unsigned int square_of_sum(unsigned int number) 
{
    if(number <2)
    {
        return 1;
    }
    unsigned int result =0;
    for(unsigned int i = 1;i <= number;i++)
    {
        result += i;
    }
    return result * result; 
}

unsigned int difference_of_squares(unsigned int number) 
{ 
    if(number <2)
    {
        return 0;
    }
    unsigned int sum = sum_of_squares(number);
    unsigned int square = square_of_sum(number);
    return  square - sum;    
}
