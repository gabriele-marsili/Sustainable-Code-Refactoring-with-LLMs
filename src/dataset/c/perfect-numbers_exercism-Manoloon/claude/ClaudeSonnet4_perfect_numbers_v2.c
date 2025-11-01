#include "perfect_numbers.h"

kind classify_number(int num) 
{
    if(num < 1) return ERROR;
    if(num == 1) return DEFICIENT_NUMBER;
    
    int sum = 1; // 1 is always a divisor
    int sqrt_num = 1;
    
    // Find square root efficiently
    while(sqrt_num * sqrt_num < num) {
        sqrt_num++;
    }
    
    // Only check divisors up to square root
    for(int i = 2; i <= sqrt_num; ++i)
    {
        if(num % i == 0)
        {
            sum += i;
            // Add the corresponding divisor if it's different
            int other_divisor = num / i;
            if(i != other_divisor && other_divisor != num)
            {
                sum += other_divisor;
            }
        }
    }
    
    if(sum > num)
    {
        return ABUNDANT_NUMBER;
    }
    else if (sum == num)
    {
        return PERFECT_NUMBER;
    }
    return DEFICIENT_NUMBER; 
}