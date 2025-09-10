#include "sum_of_multiples.h"
#include <iostream>
#include <unordered_set>

long sum_of_multiples::to(int limit)
{
    long sum = 0;
    int three = 3, five = 5, fifteen = 15;

    auto sum_divisible_by = [](int n, int limit) {
        int p = (limit - 1) / n;
        return n * p * (p + 1) / 2;
    };

    sum += sum_divisible_by(three, limit);
    sum += sum_divisible_by(five, limit);
    sum -= sum_divisible_by(fifteen, limit);

    return sum;
}

long sum_of_multiples::to(std::vector<int> multiples, int limit)
{
    long sum = 0;
    std::unordered_set<int> unique_multiples(multiples.begin(), multiples.end());

    for (int i = 1; i < limit; i++)
    {
        for (int multiple : unique_multiples)
        {
            if (i % multiple == 0)
            {
                sum += i;
                break;
            }
        }
    }

    return sum;
}