#include "grains.h"

namespace grains {

    unsigned long long square(int n) {
        if (n < 1 || n > 64) {
            throw std::domain_error("Invalid square number");
        }
        return 1ULL << (n - 1);
    }

    unsigned long long total() {
        return (1ULL << 64) - 1;
    }
}