#include "hamming.h"
#include <stddef.h>

int compute(const char *dna_a, const char *dna_b)
{
	if (!dna_a || !dna_b)
		return -1;

	int diff = 0;
	for (; *dna_a && *dna_b; dna_a++, dna_b++) {
		diff += (*dna_a != *dna_b);
	}

	return (*dna_a || *dna_b) ? -1 : diff;
}