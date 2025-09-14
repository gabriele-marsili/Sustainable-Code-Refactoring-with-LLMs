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
	
	size_t len = strlen(input_text);
	if (substring_length > len) {
		res.substring_count = 0;
		return res;
	}

	res.substring_count = len - substring_length + 1;
	
	size_t total_memory = res.substring_count * sizeof(char*) + 
	                     res.substring_count * (substring_length + 1);
	char *memory_block = (char*) malloc(total_memory);
	check_alloc(memory_block);
	
	res.substring = (char**) memory_block;
	char *string_storage = memory_block + res.substring_count * sizeof(char*);
	
	for (unsigned int i = 0; i < res.substring_count; i++) {
		res.substring[i] = string_storage + i * (substring_length + 1);
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