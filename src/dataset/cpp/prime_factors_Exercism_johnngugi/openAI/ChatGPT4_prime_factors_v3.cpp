#include "prime_factors.h"
#include <cmath>

namespace prime_factors
{
    std::vector<int> of(int a)
    {
        std::vector<int> results;

        while (a % 2 == 0)
        {
            results.push_back(2);
            a /= 2;
        }

        for (int candidate = 3; candidate <= std::sqrt(a); candidate += 2)
        {
            while (a % candidate == 0)
            {
                results.push_back(candidate);
                a /= candidate;
            }
        }

        if (a > 1)
        {
            results.push_back(a);
        }

        return results;
    }
}