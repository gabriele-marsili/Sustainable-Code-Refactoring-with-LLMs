#include "sum_of_multiples.h"
#include <iostream>
#include <unordered_set>
#include <algorithm>

long sum_of_multiples::to(int limit)
{
    if (limit <= 1) return 0;
    
    long sum = 0;
    const int step3 = 3, step5 = 5;
    
    for (int i = step3; i < limit; i += step3) {
        sum += i;
    }
    
    for (int i = step5; i < limit; i += step5) {
        if (i % step3 != 0) {
            sum += i;
        }
    }
    
    return sum;
}

long sum_of_multiples::to(std::vector<int> multiples, int limit)
{
    if (limit <= 1 || multiples.empty()) return 0;
    
    multiples.erase(std::remove_if(multiples.begin(), multiples.end(), 
                                   [](int x) { return x <= 0; }), multiples.end());
    
    if (multiples.empty()) return 0;
    
    std::unordered_set<int> unique_multiples;
    
    for (const int& multiple : multiples) {
        for (int i = multiple; i < limit; i += multiple) {
            unique_multiples.insert(i);
        }
    }
    
    long sum = 0;
    for (int value : unique_multiples) {
        sum += value;
    }
    
    return sum;
}