#include "sum_of_multiples.h"
#include <unordered_set>
#include <numeric>

namespace sum_of_multiples {
    int to(const std::vector<int>& nums, int below) {
        std::unordered_set<int> multiples;

        for (int num : nums) {
            if (num > 0) {
                for (int multiple = num; multiple < below; multiple += num) {
                    multiples.insert(multiple);
                }
            }
        }

        return std::accumulate(multiples.begin(), multiples.end(), 0);
    }
}  // namespace sum_of_multiples