#include "prime_factors.h"
#include <cmath>

using namespace std;

vector<int> prime_factors::of(int num)
{
    if (num <= 1) return {};
    
    vector<int> result;
    result.reserve(32);
    
    int tmp = num;
    
    while (tmp % 2 == 0)
    {
        result.push_back(2);
        tmp /= 2;
    }
    
    int limit = static_cast<int>(sqrt(tmp));
    for (int i = 3; i <= limit; i += 2)
    {
        while (tmp % i == 0)
        {
            result.push_back(i);
            tmp /= i;
            limit = static_cast<int>(sqrt(tmp));
        }
    }
    
    if (tmp > 1)
    {
        result.push_back(tmp);
    }
    
    return result;
}