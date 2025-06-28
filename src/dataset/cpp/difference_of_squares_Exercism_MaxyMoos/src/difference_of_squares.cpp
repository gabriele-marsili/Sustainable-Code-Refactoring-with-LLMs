#include "difference_of_squares.h"

long squares::square_of_sums(int a)
{
    long sum = 0;
    for (int i = 1; i <= a ; i++)
        sum += i;
    return sum * sum;
}

long squares::sum_of_squares(int a)
{
    long sum = 0;
    for (int i = 1; i <= a ; i++)
        sum += i * i;
    return sum;
}

long squares::difference(int a)
{
    return square_of_sums(a) - sum_of_squares(a);
}