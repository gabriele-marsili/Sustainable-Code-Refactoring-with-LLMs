#include "sum_of_multiples.h"
#include <stddef.h>

int sum_of_multiples(const unsigned int *multiples, const int count,
		    const int n)
{
	if (multiples == NULL || count == 0 || n <= 1)
		return 0;

	/* speedy solution for single multiple */
	if (count == 1) {
		if (!multiples[0])
			return 0;
		int tmp = (n - 1) / multiples[0];
		return multiples[0] * tmp * (tmp + 1) / 2;
	}

	/* optimized approach using inclusion-exclusion principle */
	int res = 0;
	
	/* First pass: filter out zero multiples and duplicates */
	unsigned int valid_multiples[count];
	int valid_count = 0;
	
	for (int i = 0; i < count; i++) {
		if (multiples[i] == 0 || multiples[i] >= n)
			continue;
		
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
	
	if (valid_count == 0)
		return 0;
	
	if (valid_count == 1) {
		int tmp = (n - 1) / valid_multiples[0];
		return valid_multiples[0] * tmp * (tmp + 1) / 2;
	}
	
	/* Use arithmetic progression sum for each multiple */
	for (int i = 0; i < valid_count; i++) {
		int multiple = valid_multiples[i];
		int count_multiples = (n - 1) / multiple;
		res += multiple * count_multiples * (count_multiples + 1) / 2;
	}
	
	/* Subtract overcounted intersections using inclusion-exclusion */
	for (int i = 0; i < valid_count; i++) {
		for (int j = i + 1; j < valid_count; j++) {
			/* Find LCM of two numbers */
			unsigned int a = valid_multiples[i];
			unsigned int b = valid_multiples[j];
			unsigned int gcd_val = a;
			unsigned int temp_b = b;
			
			while (temp_b != 0) {
				unsigned int temp = temp_b;
				temp_b = gcd_val % temp_b;
				gcd_val = temp;
			}
			
			unsigned long long lcm = ((unsigned long long)a * b) / gcd_val;
			
			if (lcm < n) {
				int count_lcm = (n - 1) / lcm;
				res -= lcm * count_lcm * (count_lcm + 1) / 2;
			}
		}
	}
	
	return res;
}