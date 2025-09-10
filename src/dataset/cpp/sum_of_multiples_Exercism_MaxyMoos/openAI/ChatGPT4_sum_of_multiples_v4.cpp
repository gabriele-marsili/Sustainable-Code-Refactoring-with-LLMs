#include "sum_of_multiples.h"
#include <vector>
#include <unordered_set>

long sum_of_multiples::to(int limit)
{
    long sum = 0;
    int max3 = (limit - 1) / 3;
    int max5 = (limit - 1) / 5;
    int max15 = (limit - 1) / 15;

    sum += 3 * max3 * (max3 + 1) / 2;
    sum += 5 * max5 * (max5 + 1) / 2;
    sum -= 15 * max15 * (max15 + 1) / 2;

    return sum;
}

long sum_of_multiples::to(std::vector<int> multiples, int limit)
{
    std::unordered_set<int> unique_multiples;
    long sum = 0;

    for (int multiple : multiples)
    {
        if (multiple > 0)
        {
            for (int i = multiple; i < limit; i += multiple)
            {
                if (unique_multiples.insert(i).second)
                {
                    sum += i;
                }
            }
        }
    }

    return sum;
}