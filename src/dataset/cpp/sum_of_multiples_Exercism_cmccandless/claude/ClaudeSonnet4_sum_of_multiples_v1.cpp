#include "sum_of_multiples.h"

int sum_of_multiples::to(vector<int> nums, int max)
{
    if (max <= 1) return 0;
    
    // Remove duplicates and zeros from input
    sort(nums.begin(), nums.end());
    nums.erase(remove_if(nums.begin(), nums.end(), [](int n) { return n <= 0; }), nums.end());
    nums.erase(unique(nums.begin(), nums.end()), nums.end());
    
    if (nums.empty()) return 0;
    
    // Use bitset for small ranges, unordered_set for larger ones
    if (max <= 100000) {
        vector<bool> seen(max, false);
        for (int n : nums) {
            for (int x = n; x < max; x += n) {
                seen[x] = true;
            }
        }
        
        int sum = 0;
        for (int i = 0; i < max; ++i) {
            if (seen[i]) sum += i;
        }
        return sum;
    } else {
        unordered_set<int> vals;
        vals.reserve(max / 2); // Reasonable estimate
        
        for (int n : nums) {
            for (int x = n; x < max; x += n) {
                vals.insert(x);
            }
        }
        
        int sum = 0;
        for (int x : vals) sum += x;
        return sum;
    }
}