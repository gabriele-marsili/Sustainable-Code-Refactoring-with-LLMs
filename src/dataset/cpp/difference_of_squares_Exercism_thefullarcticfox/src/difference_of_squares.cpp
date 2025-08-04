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
		return (square_of_sum(num) - sum_of_squares(num));
	}
}  // namespace difference_of_squares
