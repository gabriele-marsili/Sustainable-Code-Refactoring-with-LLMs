#include "sum_of_multiples.h"
#include <numeric>
#include <algorithm>
#include <vector>

long sum_of_multiples::to(int limit) {
    long sum = 0;
    for (int i = 3; i < limit; i += 3) {
        sum += i;
    }
    for (int i = 5; i < limit; i += 5) {
        if (i % 3 != 0) {
            sum += i;
        }
    }
    return sum;
}

long sum_of_multiples::to(std::vector<int> multiples, int limit) {
    if (multiples.empty()) {
        return 0;
    }

    std::vector<bool> seen(limit, false);
    long sum = 0;

    for (int multiple : multiples) {
        if (multiple == 0) continue;
        for (int i = multiple; i < limit; i += multiple) {
            if (!seen[i]) {
                sum += i;
                seen[i] = true;
            }
        }
    }

    return sum;
}