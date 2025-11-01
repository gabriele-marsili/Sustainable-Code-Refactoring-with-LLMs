#pragma once

#include <vector>

namespace prime_factors {
    std::vector<int> of(int nNum);
}

//prime_factors.cpp
//#include "prime_factors.h"

std::vector<int> prime_factors::of(int nNum) {
    if (nNum <= 1) return {};
    
    std::vector<int> vnFactors;
    vnFactors.reserve(32);
    
    while (nNum % 2 == 0) {
        vnFactors.push_back(2);
        nNum >>= 1;
    }
    
    for (int i = 3; i * i <= nNum; i += 2) {
        while (nNum % i == 0) {
            vnFactors.push_back(i);
            nNum /= i;
        }
    }
    
    if (nNum > 2) {
        vnFactors.push_back(nNum);
    }
    
    return vnFactors;
}