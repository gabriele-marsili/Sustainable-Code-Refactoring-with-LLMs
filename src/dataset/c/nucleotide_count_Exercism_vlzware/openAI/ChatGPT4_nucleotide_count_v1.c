#include "nucleotide_count.h"
#include <stdlib.h>
#include <stdio.h>

char *count(const char *dna_strand)
{
	if (dna_strand == NULL)
		return strdup("");

	int a = 0, c = 0, g = 0, t = 0;

	for (const char *tmp = dna_strand; *tmp; ++tmp) {
		switch (*tmp) {
		case 'A': a++; break;
		case 'C': c++; break;
		case 'G': g++; break;
		case 'T': t++; break;
		default: return strdup("");
		}
	}

	int size = snprintf(NULL, 0, "A:%i C:%i G:%i T:%i", a, c, g, t);
	char *res = (char *)malloc(size + 1);
	if (res)
		snprintf(res, size + 1, "A:%i C:%i G:%i T:%i", a, c, g, t);

	return res;
}