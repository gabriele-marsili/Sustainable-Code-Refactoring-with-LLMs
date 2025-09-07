#include "prime_factors.h"

vector<int> prime_factors::of(int x)
{
    if (x <= 1) return vector<int>();
    
    auto facts = vector<int>();
    facts.reserve(32);
    
    while (x % 2 == 0) {
        facts.push_back(2);
        x /= 2;
    }
    
    for (int i = 3; i * i <= x; i += 2) {
        while (x % i == 0) {
            facts.push_back(i);
            x /= i;
        }
    }
    
    if (x > 2) {
        facts.push_back(x);
    }
    
    return facts;
}