#include <math.h>

#include "armstrong_numbers.h"

namespace armstrong_numbers
{
    bool is_armstrong_number(int num)
    {
        int num_digits = log10(num) + 1;
        int sum = 0;
        for (int rem = num; rem != 0; rem /= 10)
        {
            sum += pow(rem % 10, num_digits);
        }
        return sum == num;
    }
}
