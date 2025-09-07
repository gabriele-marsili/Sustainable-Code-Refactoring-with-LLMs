#include "difference_of_squares.h"

namespace difference_of_squares {
	long	square_of_sum(long n) {
		long	sum = n * (n + 1) / 2;
		return (sum * sum);
	}

	long	sum_of_squares(long n) {
		return ((n * (n + 1) * (2 * n + 1)) / 6);
	}

	long	difference(long num) {
		long sum = num * (num + 1) / 2;
		long square_of_sum_val = sum * sum;
		long sum_of_squares_val = (num * (num + 1) * (2 * num + 1)) / 6;
		return (square_of_sum_val - sum_of_squares_val);
	}
}  // namespace difference_of_squares