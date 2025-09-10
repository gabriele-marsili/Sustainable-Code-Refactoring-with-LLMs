#include "sum_of_multiples.h"
#include <vector>
#include <numeric>
#include <unordered_set>

long sum_of_multiples::to(int limit)
{
    long sum = 0;
    int n3 = (limit - 1) / 3;
    int n5 = (limit - 1) / 5;
    int n15 = (limit - 1) / 15;

    sum += 3 * n3 * (n3 + 1) / 2;  // Sum of multiples of 3
    sum += 5 * n5 * (n5 + 1) / 2;  // Sum of multiples of 5
    sum -= 15 * n15 * (n15 + 1) / 2; // Subtract multiples of 15 (to avoid double counting)

    return sum;
}

long sum_of_multiples::to(std::vector<int> multiples, int limit)
{
    std::unordered_set<int> unique_multiples;
    long sum = 0;

    for (int i = 1; i < limit; i++)
    {
        for (int multiple : multiples)
        {
            if (multiple > 0 && i % multiple == 0)
            {
                if (unique_multiples.insert(i).second) // Insert only if not already added
                {
                    sum += i;
                }
                break; // Avoid checking further multiples for the same number
            }
        }
    }

    return sum;
}