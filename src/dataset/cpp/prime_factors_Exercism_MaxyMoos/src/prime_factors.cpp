#include "prime_factors.h"
#include <cmath>

using namespace std;

vector<int> prime_factors::of(int num)
{
    int tmp = num;
    vector<int> result;

    while (tmp % 2 == 0)
    {
        result.push_back(2);
        tmp /= 2;
    }
    for (int i = 3; i <= num; i += 2)
    {
        while( tmp % i == 0 )
        {
            result.push_back(i);
            tmp /= i;
        }
    }
    return result;
}