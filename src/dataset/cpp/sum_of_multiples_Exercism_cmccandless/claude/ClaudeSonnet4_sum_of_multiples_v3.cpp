#include "sum_of_multiples.h"

int sum_of_multiples::to(vector<int> nums, int max)
{
    if (max <= 1) return 0;
    
    nums.erase(std::remove_if(nums.begin(), nums.end(), 
        [max](int n) { return n <= 0 || n >= max; }), nums.end());
    
    if (nums.empty()) return 0;
    
    std::sort(nums.begin(), nums.end());
    nums.erase(std::unique(nums.begin(), nums.end()), nums.end());
    
    auto vals = std::vector<bool>(max, false);
    
    for (int n : nums) {
        if (n >= max) break;
        for (int x = n; x < max; x += n) {
            vals[x] = true;
        }
    }
    
    int sum = 0;
    for (int i = 1; i < max; ++i) {
        if (vals[i]) sum += i;
    }
    
    return sum;
}