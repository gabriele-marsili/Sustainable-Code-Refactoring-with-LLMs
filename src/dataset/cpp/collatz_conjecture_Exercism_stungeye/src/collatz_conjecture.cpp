#include "collatz_conjecture.h"

#include <stdexcept>

namespace collatz_conjecture {
	// Recursive Solution
	int steps(int n) {
		if (n <= 0) throw std::domain_error("Argument must be greater than zero.");

		// Base case: No more steps when n is 1.
		if (n == 1) return 0; 

		// Otherwise: calculate the next value of n and record one step.
		const int nextN = (n % 2) ? (3 * n + 1) : (n / 2);
		return 1 + steps(nextN);
	}

/*
	// Iterative Solution
	int steps(int n) {
		if (n <= 0) throw std::domain_error("Argument must be greater than zero.");

		int stepCount = 0;

		while(n != 1) {
			if (n % 2 == 0) {
				n /= 2;
			} else {
				n = n * 3 + 1;
			}

			++stepCount;
		}

		return stepCount;
	}
*/
}  // namespace collatz_conjecture
