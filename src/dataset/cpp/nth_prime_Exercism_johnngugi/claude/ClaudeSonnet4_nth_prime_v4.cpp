#include <vector>
#include <algorithm>
#include <stdexcept>
#include <cmath>
#include "nth_prime.h"

using namespace std;

namespace prime {

    int nth(int n) {
        if (n < 1) throw std::domain_error("out of range");
        if (n == 1) return 2;
        if (n == 2) return 3;
        
        vector<int> primes;
        primes.reserve(n);
        primes.push_back(2);
        primes.push_back(3);
        
        for (int candidate = 5; primes.size() < n; candidate += 2) {
            int sqrt_candidate = static_cast<int>(sqrt(candidate));
            bool is_prime = true;
            
            for (int prime : primes) {
                if (prime > sqrt_candidate) break;
                if (candidate % prime == 0) {
                    is_prime = false;
                    break;
                }
            }
            
            if (is_prime) {
                primes.push_back(candidate);
            }
        }
        
        return primes[n-1];
    }
}