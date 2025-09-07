#include "prime_factors.h"

vector<int> prime_factors::of(int x) {
    vector<int> factors;
    if (x <= 1) {
        return factors;
    }

    while (x % 2 == 0) {
        factors.push_back(2);
        x /= 2;
    }

    for (int i = 3; i * i <= x; i += 2) {
        while (x % i == 0) {
            factors.push_back(i);
            x /= i;
        }
    }

    if (x > 1) {
        factors.push_back(x);
    }

    return factors;
}