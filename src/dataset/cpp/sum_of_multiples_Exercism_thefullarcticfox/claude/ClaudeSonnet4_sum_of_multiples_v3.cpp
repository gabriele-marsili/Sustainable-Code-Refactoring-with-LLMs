#include "sum_of_multiples.h"
#include <unordered_set>

namespace sum_of_multiples {
    int to(const std::vector<int>& nums, int below) {
        if (below <= 1) return 0;
        
        std::unordered_set<int> multiples;
        multiples.reserve(below / 2);
        
        for (int num : nums) {
            if (num <= 0 || num >= below) continue;
            
            for (int multiple = num; multiple < below; multiple += num) {
                multiples.insert(multiple);
            }
        }
        
        int result = 0;
        for (int multiple : multiples) {
            result += multiple;
        }
        return result;
    }
}