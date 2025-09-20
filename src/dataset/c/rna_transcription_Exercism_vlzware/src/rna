#include "rna_transcription.h"
#include <stdlib.h>
#include <string.h>

char* to_rna(const char* dna)
{
	if (!dna)
		return NULL;

	size_t len = strlen(dna);
	char *res = (char*) malloc(len + 1);
	if (!res)
		return NULL;

	for (size_t i = 0; i < len; ++i) {
		switch (dna[i]) {
		case 'G':
			res[i] = 'C';
			break;
		case 'C':
			res[i] = 'G';
			break;
		case 'T':
			res[i] = 'A';
			break;
		case 'A':
			res[i] = 'U';
			break;
		default:
			free(res);
			return NULL;
		}
	}
	res[len] = '\0';

	return res;
}