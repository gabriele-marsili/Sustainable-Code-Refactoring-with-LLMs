#include "pascals_triangle.h"
#include <stdlib.h>

void check_alloc(void *p);

size_t **create_triangle(int rows)
{
	if (rows < 0)
		return NULL;

	size_t **triangle = (size_t **)malloc(sizeof(size_t*) * rows);
	if (rows > 0 && triangle == NULL) {
		check_alloc(triangle);
	}
	if (rows == 0) {
		triangle = (size_t **)malloc(sizeof(size_t*));
		check_alloc(triangle);
		triangle[0] = (size_t *)malloc(sizeof(size_t));
		check_alloc(triangle[0]);
		triangle[0][0] = 0;
		return triangle;
	}

	for (int i = 0; i < rows; i++) {
		triangle[i] = (size_t *)malloc(sizeof(size_t) * (i + 1));
		check_alloc(triangle[i]);

		triangle[i][0] = 1;
		for (int j = 1; j < i; j++) {
			triangle[i][j] = triangle[i - 1][j] + triangle[i - 1][j - 1];
		}
		if (i > 0) {
			triangle[i][i] = 1;
		}
	}

	return triangle;
}

void free_triangle(size_t **triangle, int size)
{
	if (triangle == NULL || size <= 0)
		return;

	for (int i = 0; i < size; i++) {
		free(triangle[i]);
	}
	free(triangle);
}

#include <stdio.h>
#include <stdlib.h>

void check_alloc(void *p)
{
	if (p == NULL) {
		fprintf(stderr, "Memory error.\n");
		exit(EXIT_FAILURE);
	}
}