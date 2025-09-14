#include "nucleotide_count.h"
#include <stdlib.h>
#include <stdio.h>

char *count(const char *dna_strand)
{
	if (dna_strand == NULL) {
		char *error = (char*) malloc(1);
		*error = '\0';
		return error;
	}

	int counts[4] = {0}; // A, C, G, T
	const char *tmp = dna_strand;
	
	while(*tmp) {
		switch(*tmp++) {
		case 'A':
			counts[0]++;
			break;
		case 'C':
			counts[1]++;
			break;
		case 'G':
			counts[2]++;
			break;
		case 'T':
			counts[3]++;
			break;
		default:
			{
				char *error = (char*) malloc(1);
				*error = '\0';
				return error;
			}
		}
	}

	char *res = (char*) malloc(32); // Fixed size sufficient for reasonable counts
	if (res == NULL) {
		char *error = (char*) malloc(1);
		*error = '\0';
		return error;
	}

	sprintf(res, "A:%i C:%i G:%i T:%i", counts[0], counts[1], counts[2], counts[3]);
	return res;
}