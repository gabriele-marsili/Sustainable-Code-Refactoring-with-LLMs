#include "difference_of_squares.h"

namespace difference_of_squares {
	long	square_of_sum(long n) {
		const long sum = n * (n + 1) >> 1;
		return sum * sum;
	}

	long	sum_of_squares(long n) {
		return (n * (n + 1) * (2 * n + 1)) / 6;
	}

	long	difference(long num) {
		const long sum = num * (num + 1) >> 1;
		const long sum_squared = sum * sum;
		const long squares_sum = (num * (num + 1) * (2 * num + 1)) / 6;
		return sum_squared - squares_sum;
	}
}  // namespace difference_of_squares