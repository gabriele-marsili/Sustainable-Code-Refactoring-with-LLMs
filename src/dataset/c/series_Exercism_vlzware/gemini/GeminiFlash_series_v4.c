#include "series.h"
#include <stdlib.h>
#include <string.h>

void check_alloc(void *p);

series_results_t series(char *input_text, unsigned int substring_length)
{
	series_results_t res;
	unsigned int len = (input_text == NULL)? 0 : strlen(input_text);

	if (substring_length > len || len == 0 || substring_length == 0) {
		res.substring_count = 0;
		return res;
	}

	res.substring_count = len - substring_length + 1;
	res.substring = (char**) malloc(res.substring_count * sizeof(char*));
	check_alloc(res.substring);

	for (unsigned int i = 0; i < res.substring_count; i++) {
		res.substring[i] = (char*) malloc(substring_length + 1);
		check_alloc(res.substring[i]);
		strncpy(res.substring[i], input_text + i, substring_length);
		res.substring[i][substring_length] = '\0';
	}

	return res;
}

#include <stdio.h>
#include <stdlib.h>

void check_alloc(void *p)
{
	if (p == NULL) {
		fprintf(stderr, "Memory error!\n");
		exit(EXIT_FAILURE);
	}
}