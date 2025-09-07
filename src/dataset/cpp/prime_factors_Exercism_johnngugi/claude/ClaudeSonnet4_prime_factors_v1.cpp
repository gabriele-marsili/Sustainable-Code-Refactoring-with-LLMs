#include "prime_factors.h"
#include <cmath>

namespace prime_factors
{
    std::vector<int> of(int a)
    {
        if (a <= 1) return {};
        
        std::vector<int> results;
        results.reserve(32); // Reserve space to avoid reallocations
        
        // Handle factor 2 separately
        while (a % 2 == 0) {
            results.push_back(2);
            a /= 2;
        }
        
        // Check odd factors up to sqrt(a)
        int limit = static_cast<int>(std::sqrt(a));
        for (int candidate = 3; candidate <= limit; candidate += 2) {
            while (a % candidate == 0) {
                results.push_back(candidate);
                a /= candidate;
                limit = static_cast<int>(std::sqrt(a)); // Update limit as a decreases
            }
        }
        
        // If a is still > 1, then it's a prime factor
        if (a > 1) {
            results.push_back(a);
        }
        
        return results;
    }
}