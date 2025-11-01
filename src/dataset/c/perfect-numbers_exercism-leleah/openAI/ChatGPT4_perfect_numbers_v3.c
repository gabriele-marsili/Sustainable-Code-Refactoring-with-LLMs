#include "perfect_numbers.h"

int classify_number(int num)
{
    if (num <= 0) return -1;

    int sum = 0;
    for (int i = 1; i <= num / 2; i++)
    {
        if (num % i == 0)
        {
            sum += i;
        }
    }

    if (sum == num) return 1;
    if (sum > num) return 2;
    return 3;
}