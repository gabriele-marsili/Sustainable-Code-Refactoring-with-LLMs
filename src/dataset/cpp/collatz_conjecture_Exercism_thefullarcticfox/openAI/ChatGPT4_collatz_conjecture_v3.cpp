#include "collatz_conjecture.h"

namespace collatz_conjecture {
    int steps(int n) {
        if (n <= 0)
            throw std::domain_error("less or equals 0");
        int res = 0;
        while (n != 1) {
            n = (n % 2 == 0) ? (n / 2) : (n * 3 + 1);
            ++res;
        }
        return res;
    }
}  // namespace collatz_conjecture