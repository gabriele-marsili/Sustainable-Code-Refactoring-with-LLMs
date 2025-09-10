#include "sieve.h"
#include <vector>
#include <cmath>

using namespace std;

vector<int> sieve::primes(int range) {
    if (range < 2) {
        return {};
    }

    vector<bool> is_prime(range + 1, true);
    vector<int> result;

    is_prime[0] = is_prime[1] = false;

    for (int p = 2; p * p <= range; ++p) {
        if (is_prime[p]) {
            for (int i = p * p; i <= range; i += p) {
                is_prime[i] = false;
            }
        }
    }

    for (int p = 2; p <= range; ++p) {
        if (is_prime[p]) {
            result.push_back(p);
        }
    }

    return result;
}