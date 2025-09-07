#include "prime_factors.h"
#include <cmath>

using namespace std;

vector<int> prime_factors::of(int num)
{
    if (num <= 1) return {};
    
    vector<int> result;
    result.reserve(32); // Reserve space to avoid reallocations
    
    int tmp = num;
    
    // Handle factor 2
    while (tmp % 2 == 0)
    {
        result.push_back(2);
        tmp /= 2;
    }
    
    // Check odd factors up to sqrt(tmp)
    int limit = static_cast<int>(sqrt(tmp));
    for (int i = 3; i <= limit; i += 2)
    {
        while (tmp % i == 0)
        {
            result.push_back(i);
            tmp /= i;
            limit = static_cast<int>(sqrt(tmp)); // Update limit as tmp decreases
        }
    }
    
    // If tmp > 1, then it's a prime factor
    if (tmp > 1)
    {
        result.push_back(tmp);
    }
    
    return result;
}