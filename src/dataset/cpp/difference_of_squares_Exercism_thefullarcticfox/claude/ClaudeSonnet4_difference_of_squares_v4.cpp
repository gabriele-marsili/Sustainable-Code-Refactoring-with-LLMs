#include "difference_of_squares.h"

namespace difference_of_squares {
	long square_of_sum(long n) {
		const long sum = n * (n + 1) >> 1;
		return sum * sum;
	}

	long sum_of_squares(long n) {
		return (n * (n + 1) * (2 * n + 1)) / 6;
	}

	long difference(long n) {
		const long sum = n * (n + 1) >> 1;
		const long square_sum = sum * sum;
		const long sum_squares = (n * (n + 1) * (2 * n + 1)) / 6;
		return square_sum - sum_squares;
	}
}