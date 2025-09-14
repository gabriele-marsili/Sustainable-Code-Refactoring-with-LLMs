#include "sum_of_multiples.h"
#include <stddef.h>

int sum_of_multiples(const unsigned int *multiples, const int count,
		    const int n)
{
	if (multiples == NULL || count == 0 || n <= 1)
		return 0;

	/* speedy solution for single multiple */
	if (count == 1) {
		if (!multiples[0]) return 0;
		int tmp = (n - 1) / multiples[0];
		return multiples[0] * tmp * (tmp + 1) / 2;
	}

	/* optimized approach using inclusion-exclusion principle */
	int res = 0;
	
	/* First pass: filter out zero multiples and duplicates */
	unsigned int valid_multiples[count];
	int valid_count = 0;
	
	for (int i = 0; i < count; i++) {
		if (multiples[i] == 0 || multiples[i] >= n) continue;
		
		/* Check for duplicates */
		int is_duplicate = 0;
		for (int j = 0; j < valid_count; j++) {
			if (valid_multiples[j] == multiples[i]) {
				is_duplicate = 1;
				break;
			}
		}
		if (!is_duplicate) {
			valid_multiples[valid_count++] = multiples[i];
		}
	}
	
	if (valid_count == 0) return 0;
	
	/* Use arithmetic series sum for each multiple */
	for (int i = 0; i < valid_count; i++) {
		int tmp = (n - 1) / valid_multiples[i];
		res += valid_multiples[i] * tmp * (tmp + 1) / 2;
	}
	
	/* Subtract overcounted intersections (simplified for common cases) */
	if (valid_count > 1) {
		for (int i = 0; i < valid_count - 1; i++) {
			for (int j = i + 1; j < valid_count; j++) {
				unsigned long long lcm = ((unsigned long long)valid_multiples[i] * valid_multiples[j]) / 
					__gcd(valid_multiples[i], valid_multiples[j]);
				if (lcm < n) {
					int tmp = (n - 1) / lcm;
					res -= lcm * tmp * (tmp + 1) / 2;
				}
			}
		}
	}
	
	return res;
}

static unsigned int __gcd(unsigned int a, unsigned int b) {
	while (b) {
		unsigned int temp = b;
		b = a % b;
		a = temp;
	}
	return a;
}