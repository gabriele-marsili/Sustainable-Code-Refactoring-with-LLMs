#include "difference_of_squares.h"

namespace difference_of_squares {
	inline long square_of_sum(long n) {
		long sum = n * (n + 1) / 2;
		return sum * sum;
	}

	inline long sum_of_squares(long n) {
		return n * (n + 1) * (2 * n + 1) / 6;
	}

	inline long difference(long num) {
		long sum = num * (num + 1) / 2;
		long squareSum = sum * sum;
		long sumSquares = num * (num + 1) * (2 * num + 1) / 6;
		return squareSum - sumSquares;
	}
}  // namespace difference_of_squares