#include "perfect_numbers.h"

int classify_number(int num)
{
    if (num <= 0)
        return -1;

    int sum = 1; // 1 is a divisor for all positive numbers
    for (int i = 2; i * i <= num; i++)
    {
        if (num % i == 0)
        {
            sum += i;
            if (i != num / i)
                sum += num / i;
        }
    }

    if (sum == num)
        return 1;
    else if (sum > num)
        return 2;
    else
        return 3;
}