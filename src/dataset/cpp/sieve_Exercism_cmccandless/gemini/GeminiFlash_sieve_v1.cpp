#include "sieve.h"

vector<int> sieve::primes(int max) {
    if (max <= 2) {
        return {};
    }

    vector<bool> is_prime(max, true);
    is_prime[0] = is_prime[1] = false;

    int limit = sqrt(max);
    for (int i = 2; i <= limit; ++i) {
        if (is_prime[i]) {
            for (int j = i * i; j < max; j += i) {
                is_prime[j] = false;
            }
        }
    }

    vector<int> prime_numbers;
    for (int i = 2; i < max; ++i) {
        if (is_prime[i]) {
            prime_numbers.push_back(i);
        }
    }

    return prime_numbers;
}