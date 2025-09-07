#include "prime_factors.h"
#include <cmath>
#include <vector>

using namespace std;

vector<int> prime_factors::of(int num) {
    vector<int> result;
    if (num <= 1) {
        return result;
    }

    int tmp = num;

    while (tmp % 2 == 0) {
        result.push_back(2);
        tmp /= 2;
    }

    if (tmp == 1) return result;

    for (int i = 3; i <= sqrt(num); i += 2) {
        while (tmp % i == 0) {
            result.push_back(i);
            tmp /= i;
        }
        if (tmp == 1) return result;
    }

    if (tmp > 1) {
        result.push_back(tmp);
    }

    return result;
}