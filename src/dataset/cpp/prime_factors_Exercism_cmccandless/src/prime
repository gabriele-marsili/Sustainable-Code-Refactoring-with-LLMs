#include "prime_factors.h"

vector<int> prime_factors::of(int x)
{
    vector<int> facts;
    for (int i = 2; i * i <= x; ++i)
    {
        while (x % i == 0)
        {
            x /= i;
            facts.push_back(i);
        }
    }
    if (x > 1) facts.push_back(x);
    return facts;
}