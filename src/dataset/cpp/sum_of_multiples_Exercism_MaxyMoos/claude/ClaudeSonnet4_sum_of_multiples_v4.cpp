#include "sum_of_multiples.h"
#include <algorithm>
#include <unordered_set>

long sum_of_multiples::to(int limit)
{
    if (limit <= 1) return 0;
    
    long sum = 0;
    const int limit_minus_1 = limit - 1;
    
    // Sum of multiples of 3
    const int max_3 = limit_minus_1 / 3;
    sum += 3L * max_3 * (max_3 + 1) / 2;
    
    // Sum of multiples of 5
    const int max_5 = limit_minus_1 / 5;
    sum += 5L * max_5 * (max_5 + 1) / 2;
    
    // Subtract sum of multiples of 15 (LCM of 3 and 5)
    const int max_15 = limit_minus_1 / 15;
    sum -= 15L * max_15 * (max_15 + 1) / 2;
    
    return sum;
}

long sum_of_multiples::to(std::vector<int> multiples, int limit)
{
    if (limit <= 1 || multiples.empty()) return 0;
    
    // Remove duplicates and zero/negative values
    std::unordered_set<int> unique_multiples;
    for (int multiple : multiples) {
        if (multiple > 0 && multiple < limit) {
            unique_multiples.insert(multiple);
        }
    }
    
    if (unique_multiples.empty()) return 0;
    
    std::unordered_set<int> counted;
    long sum = 0;
    
    for (int i = 1; i < limit; ++i) {
        for (int multiple : unique_multiples) {
            if (i % multiple == 0) {
                sum += i;
                break;
            }
        }
    }
    
    return sum;
}