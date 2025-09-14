#include "sum_of_multiples.h"

int sum_of_multiples::to(vector<int> nums, int max)
{
    if (max <= 1) return 0;
    
    // Remove duplicates and zeros, sort for better cache locality
    sort(nums.begin(), nums.end());
    nums.erase(remove_if(nums.begin(), nums.end(), [](int n) { return n <= 0; }), nums.end());
    nums.erase(unique(nums.begin(), nums.end()), nums.end());
    
    if (nums.empty()) return 0;
    
    auto vals = unordered_set<int>();
    vals.reserve(max / nums[0]); // Reserve approximate capacity
    
    for (const auto n : nums)
    {
        if (n >= max) break; // Skip numbers >= max
        
        for (int x = n; x < max; x += n)
        {
            vals.insert(x);
        }
    }
    
    int sum = 0;
    for (const auto x : vals) sum += x;
    return sum;
}