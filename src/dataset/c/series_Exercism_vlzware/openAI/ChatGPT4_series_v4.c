#include "series.h"
#include <stdlib.h>
#include <string.h>

void check_alloc(void *p);

series_results_t series(char *input_text, unsigned int substring_length)
{
	series_results_t res = {0, NULL};
	if (!input_text || substring_length == 0 || substring_length > strlen(input_text)) {
		return res;
	}

	unsigned int len = strlen(input_text);
	res.substring_count = len - substring_length + 1;
	res.substring = (char**) malloc(res.substring_count * sizeof(char*));
	check_alloc(res.substring);

	for (unsigned int i = 0; i < res.substring_count; i++) {
		res.substring[i] = strndup(input_text + i, substring_length);
		check_alloc(res.substring[i]);
	}

	return res;
}

#include <stdio.h>
void check_alloc(void *p)
{
	if (!p) {
		fprintf(stderr, "Memory error!\n");
		exit(1);
	}
}