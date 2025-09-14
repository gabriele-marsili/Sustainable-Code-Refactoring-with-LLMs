#include "sieve.h"
#include <vector>

using namespace std;

vector<int> sieve::primes(int range)
{
    if (range < 2) return vector<int>();
    
    vector<bool> is_prime(range + 1, true);
    is_prime[0] = is_prime[1] = false;
    
    for (int i = 2; i * i <= range; i++) {
        if (is_prime[i]) {
            for (int j = i * i; j <= range; j += i) {
                is_prime[j] = false;
            }
        }
    }
    
    vector<int> result;
    result.reserve(range / (log(range) > 0 ? log(range) : 1));
    
    for (int i = 2; i <= range; i++) {
        if (is_prime[i]) {
            result.push_back(i);
        }
    }
    
    return result;
}