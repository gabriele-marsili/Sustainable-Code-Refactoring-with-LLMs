#include "difference_of_squares.h"

int squares::square_of_sum(int number) {
	int sum = 0;
	for (int i = 1; i <= number; i++)
		sum += i;

	return pow(sum, 2);
}

int squares::sum_of_squares(int number) {
	if (number > 1)
		return pow(number, 2) + sum_of_squares(number - 1);
	else
		return 1;
}

int squares::difference(int number) {
	return square_of_sum(number) - sum_of_squares(number);
}