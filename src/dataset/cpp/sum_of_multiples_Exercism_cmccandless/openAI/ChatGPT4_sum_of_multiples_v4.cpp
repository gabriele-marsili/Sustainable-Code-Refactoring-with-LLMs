#include "sum_of_multiples.h"
#include <numeric>
#include <unordered_set>

int sum_of_multiples::to(vector<int> nums, int max)
{
    std::unordered_set<int> vals;
    for (const int n : nums)
    {
        if (n == 0) continue;
        for (int x = n; x < max; x += n)
        {
            vals.insert(x);
        }
    }
    return std::accumulate(vals.begin(), vals.end(), 0);
}