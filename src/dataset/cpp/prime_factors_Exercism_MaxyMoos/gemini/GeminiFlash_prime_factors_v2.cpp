#include "prime_factors.h"
#include <cmath>

using namespace std;

vector<int> prime_factors::of(int num) {
    vector<int> result;
    if (num <= 1) {
        return result;
    }

    while (num % 2 == 0) {
        result.push_back(2);
        num /= 2;
    }

    for (int i = 3; i <= sqrt(num); i += 2) {
        while (num % i == 0) {
            result.push_back(i);
            num /= i;
        }
    }

    if (num > 2) {
        result.push_back(num);
    }

    return result;
}