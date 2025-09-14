#include "sum_of_multiples.h"
#include <iostream>
#include <unordered_set>

long sum_of_multiples::to(int limit)
{
    if (limit <= 1) return 0;
    
    // Use arithmetic progression formula for multiples of 3 and 5
    auto sum_multiples = [](int multiple, int limit) -> long {
        int n = (limit - 1) / multiple;
        return (long)multiple * n * (n + 1) / 2;
    };
    
    return sum_multiples(3, limit) + sum_multiples(5, limit) - sum_multiples(15, limit);
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
    
    // Use set to track already counted numbers
    std::unordered_set<int> counted;
    long sum = 0;
    
    for (int multiple : unique_multiples) {
        for (int i = multiple; i < limit; i += multiple) {
            if (counted.insert(i).second) {
                sum += i;
            }
        }
    }
    
    return sum;
}