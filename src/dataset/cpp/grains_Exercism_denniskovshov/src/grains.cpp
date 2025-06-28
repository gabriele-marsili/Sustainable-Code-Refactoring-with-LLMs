#include <cmath>
#include <stdexcept>
#include "grains.h"

namespace grains {
    constexpr short min_square_num = 1;
    constexpr short max_square_num = 64;
    // just a way to switch func used
    auto square_func = square_std_pow;

    unsigned long long square(short square_num) {
        validate(square_num);

        return square_func(square_num);
    }

    unsigned long long square_bit_shift(short square_num) {
        return 1ULL << (square_num - 1);
    }

    unsigned long long square_std_pow(short square_num) {
        return std::pow(2, square_num - 1);
    }

    unsigned long long total() {
        unsigned long long total_grains = 0ULL;

        for (short i = min_square_num; i <= max_square_num; i++) {
            total_grains += square_func(i);
        }

        return total_grains;
    }

    void validate(short square_num) {
        if (square_num < min_square_num || square_num > max_square_num) {
            auto err = "Square number must be >= " + std::to_string(min_square_num) + " and <= " + std::to_string(max_square_num);
            throw std::domain_error(err);
        }
    }
}  // namespace grains
