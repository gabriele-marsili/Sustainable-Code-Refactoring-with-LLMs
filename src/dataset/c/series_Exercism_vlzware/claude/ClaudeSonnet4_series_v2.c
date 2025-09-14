#include "series.h"
#include <stdlib.h>
#include <string.h>

void check_alloc(void *p);

series_results_t series(char *input_text, unsigned int substring_length)
{
	series_results_t res;
	
	if (input_text == NULL || substring_length == 0) {
		res.substring_count = 0;
		return res;
	}
	
	int len = strlen(input_text);
	if ((int)substring_length > len || len == 0) {
		res.substring_count = 0;
		return res;
	}

	res.substring_count = len - substring_length + 1;
	
	// Allocate all memory at once
	char *buffer = (char*) malloc(res.substring_count * (substring_length + 1));
	check_alloc(buffer);
	
	res.substring = (char**) malloc(res.substring_count * sizeof(char*));
	check_alloc(res.substring);

	// Set up pointers and copy data
	for (int i = 0; i < (int)res.substring_count; i++) {
		res.substring[i] = buffer + i * (substring_length + 1);
		memcpy(res.substring[i], input_text + i, substring_length);
		res.substring[i][substring_length] = '\0';
	}

	return res;
}

#include <stdio.h>
void check_alloc(void *p)
{
	if (p == NULL) {
		fprintf(stderr, "Memory error!\n");
		exit(1);
	}
}