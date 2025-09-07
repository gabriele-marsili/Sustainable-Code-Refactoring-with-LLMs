#include "prime_factors.h"
#include <cmath>

vector<int> prime_factors::of(int x)
{
    if (x <= 1) return vector<int>();
    
    auto facts = vector<int>();
    facts.reserve(32);
    
    while (x % 2 == 0) {
        facts.push_back(2);
        x /= 2;
    }
    
    int limit = static_cast<int>(sqrt(x)) + 1;
    for (int i = 3; i <= limit && x > 1; i += 2) {
        while (x % i == 0) {
            facts.push_back(i);
            x /= i;
            limit = static_cast<int>(sqrt(x)) + 1;
        }
    }
    
    if (x > 1) {
        facts.push_back(x);
    }
    
    return facts;
}