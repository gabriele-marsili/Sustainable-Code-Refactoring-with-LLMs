#include "perfect_numbers.h"

kind classify_number(int num) 
{
    if (num < 1) return ERROR;
    if (num == 1) return DEFICIENT_NUMBER;

    int sum = 1;
    for (int i = 2; i * i <= num; ++i) 
    {
        if (num % i == 0) 
        {
            sum += i;
            if (i != num / i) 
            {
                sum += num / i;
            }
        }
    }

    if (sum > num) return ABUNDANT_NUMBER;
    if (sum == num) return PERFECT_NUMBER;
    return DEFICIENT_NUMBER;
}