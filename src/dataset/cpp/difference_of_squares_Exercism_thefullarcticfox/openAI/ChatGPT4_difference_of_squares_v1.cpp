#include "difference_of_squares.h"

namespace difference_of_squares {
	long square_of_sum(long n) {
		return (n * (n + 1) / 2) * (n * (n + 1) / 2);
	}

	long sum_of_squares(long n) {
		return (n * (n + 1) * (2 * n + 1)) / 6;
	}

	long difference(long num) {
		long sum = num * (num + 1) / 2;
		long square_of_sum = sum * sum;
		long sum_of_squares = (num * (num + 1) * (2 * num + 1)) / 6;
		return square_of_sum - sum_of_squares;
	}
}  // namespace difference_of_squares