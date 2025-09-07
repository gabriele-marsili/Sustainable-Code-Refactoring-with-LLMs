#include "prime_factors.h"
#include <cmath>

namespace prime_factors
{
    std::vector<int> of(int a)
    {
        if (a <= 1) return {};
        
        std::vector<int> results;
        results.reserve(32);
        
        while (a % 2 == 0) {
            results.push_back(2);
            a /= 2;
        }
        
        int limit = static_cast<int>(std::sqrt(a));
        for (int candidate = 3; candidate <= limit; candidate += 2) {
            while (a % candidate == 0) {
                results.push_back(candidate);
                a /= candidate;
            }
            if (a == 1) break;
            limit = static_cast<int>(std::sqrt(a));
        }
        
        if (a > 1) {
            results.push_back(a);
        }
        
        return results;
    }
}