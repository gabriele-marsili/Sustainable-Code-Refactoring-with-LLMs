#include "difference_of_squares.h"

// Three versions. The first solves O(n) loops. 
// The second over-complicates with <numeric> fun.
// The last (this one) is O(1) math.

namespace difference_of_squares {

    int square_of_sum(int n) {
        const auto square_of_sum = (n * (n + 1)) / 2;

        return square_of_sum * square_of_sum;
    }

    int sum_of_squares(int n) {
        return (n * (n + 1) * (2 * n + 1)) / 6;
    }

    int difference(int n) {
        return square_of_sum(n) - sum_of_squares(n);
    }
} // namespace difference_of_squares
