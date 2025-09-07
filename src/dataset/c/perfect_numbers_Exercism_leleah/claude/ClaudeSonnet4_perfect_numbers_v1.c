#include "perfect_numbers.h"

int classify_number(int num)
{
    if(num <= 0)
    {
        return -1;
    }
    
    if(num == 1)
    {
        return 3; // deficient
    }
    
    int sum = 1; // 1 is always a divisor for num > 1
    int sqrt_num = 1;
    
    // Find square root efficiently
    while(sqrt_num * sqrt_num < num)
    {
        sqrt_num++;
    }
    
    // Check divisors up to square root
    for(int i = 2; i <= sqrt_num; i++)
    {
        if(num % i == 0)
        {
            sum += i;
            // Add the corresponding divisor if it's different
            if(i != num / i)
            {
                sum += num / i;
            }
        }
    }
    
    if(sum == num)
    {
        return 1; // perfect
    }
    else if(sum > num)
    {
        return 2; // abundant
    }
    else
    {
        return 3; // deficient
    }
}