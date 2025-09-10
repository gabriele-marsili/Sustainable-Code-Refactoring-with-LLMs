#include "sum_of_multiples.h"
#include <iostream>
#include <unordered_set>
#include <numeric>

long sum_of_multiples::to(int limit)
{
    long sum = 0;
    for (int i = 3; i < limit; i += 3) sum += i;
    for (int i = 5; i < limit; i += 5) if (i % 3 != 0) sum += i;
    return sum;
}

long sum_of_multiples::to(std::vector<int> multiples, int limit)
{
    std::unordered_set<int> unique_multiples;
    long sum = 0;

    for (int multiple : multiples) {
        if (multiple > 0) {
            for (int i = multiple; i < limit; i += multiple) {
                if (unique_multiples.insert(i).second) {
                    sum += i;
                }
            }
        }
    }

    return sum;
}