#pragma once

#include <vector>
#include <cmath>

namespace prime_factors {
    std::vector<int> of(int nNum);
}

//prime_factors.cpp
#include <vector>
#include <cmath>

using namespace std;

vector<int> prime_factors::of(int nNum) {
    vector<int> factors;
    if (nNum <= 1) return factors;

    while (nNum % 2 == 0) {
        factors.push_back(2);
        nNum /= 2;
    }

    for (int i = 3; i <= sqrt(nNum); i += 2) {
        while (nNum % i == 0) {
            factors.push_back(i);
            nNum /= i;
        }
    }

    if (nNum > 2) {
        factors.push_back(nNum);
    }

    return factors;
}