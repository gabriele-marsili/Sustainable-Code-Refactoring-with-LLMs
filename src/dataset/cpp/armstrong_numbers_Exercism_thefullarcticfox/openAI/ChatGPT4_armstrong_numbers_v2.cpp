#include "armstrong_numbers.h"
#include <cmath>

namespace armstrong_numbers {
    bool is_armstrong_number(const long n) {
        long sum = 0, temp = n;
        int num_digits = static_cast<int>(std::log10(n) + 1);

        while (temp != 0) {
            int digit = temp % 10;
            sum += std::pow(digit, num_digits);
            temp /= 10;
        }

        return (n == sum);
    }
}  // namespace armstrong_numbers