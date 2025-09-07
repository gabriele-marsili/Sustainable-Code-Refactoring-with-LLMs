#include "difference_of_squares.h"

namespace difference_of_squares {
	long square_of_sum(long n) {
		long sum = n * (n + 1) / 2;
		return sum * sum;
	}

	long sum_of_squares(long n) {
		return n * (n + 1) * (2 * n + 1) / 6;
	}

	long difference(long num) {
		long sum_of_sq = sum_of_squares(num);
		long sq_of_sum = square_of_sum(num);
		return sq_of_sum - sum_of_sq;
	}
}  // namespace difference_of_squares