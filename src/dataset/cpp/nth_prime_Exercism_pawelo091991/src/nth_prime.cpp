#include "nth_prime.h"
//test

int prime::nth(uint32_t targetPrime) {
	uint32_t prime = 0;
	uint32_t number = 2;
	bool notPrime = false;

	if(targetPrime == 0)
		throw std::domain_error("Dupa");

	while (prime < targetPrime) {
		for (int i = 2; i < number; i++) {
			if (number % i == 0) {
				notPrime = true;
				break;
			}
		}
		if (notPrime == false) {
			//std::cout << number<< std::endl;
			prime++;
		}
		number++;
		notPrime = false;	
	}
	
	return (number - 1);
}