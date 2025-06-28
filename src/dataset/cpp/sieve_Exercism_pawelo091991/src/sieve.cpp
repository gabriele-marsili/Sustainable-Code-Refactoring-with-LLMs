#include "sieve.h"

const vector<int> sieve::primes(int n) {
	
	vector<bool> is_prime(n+1, true);

	int i = 2;
	while (true) {
		for (int j = i * 2; j < is_prime.size(); j += i) {
			is_prime[j] = false;
		}

		i++;
		if (i * i > n)
			break;

		for (i; i < is_prime.size(); i++) {
			if (is_prime[i] == true)
				break;
		}
	}

	vector<int> primes;
	for (int i = 2; i < is_prime.size(); i++) {
		if (is_prime[i] == true)
			primes.push_back(i);
	}

	return primes;

}