#include "perfect_numbers.h"

kind classify_number(int num) 
{
    if(num < 1) return ERROR;
    if(num == 1) return DEFICIENT_NUMBER;
    
    int sum = 1; // 1 is always a divisor for num > 1
    int sqrt_num = 1;
    
    // Find square root without using sqrt function
    while(sqrt_num * sqrt_num < num) {
        sqrt_num++;
    }
    
    for(int i = 2; i <= sqrt_num; ++i)
    {
        if(num % i == 0)
        {
            sum += i;
            if(i != num / i && num / i != num) // Avoid adding the same divisor twice and the number itself
            {
                sum += num / i;
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