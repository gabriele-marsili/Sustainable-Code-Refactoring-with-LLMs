#include "collatz_conjecture.h"

int32_t collatz_conjecture::steps(int32_t input) {
	int32_t step = 0;

	if (input <= 0)
		throw std::domain_error("Number must be positive!");

	while (input > 1) {
		if (input % 2 == 0)
			input /= 2;
		else
			input = 3 * input + 1;

		step++;
	}
	return step;
}