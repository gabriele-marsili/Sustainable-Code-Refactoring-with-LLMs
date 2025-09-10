#include "sum_of_multiples.h"
#include <numeric>

int sum_of_multiples::to(vector<int> nums, int max)
{
    vector<bool> is_multiple(max, false);
    for (const auto &n : nums)
    {
        if (n <= 0) continue;
        for (int x = n; x < max; x += n)
        {
            is_multiple[x] = true;
        }
    }
    return accumulate(is_multiple.begin(), is_multiple.end(), 0, 
                      [i = 0](int sum, bool multiple) mutable {
                          return sum + (multiple ? i++ : i++);
                      });
}