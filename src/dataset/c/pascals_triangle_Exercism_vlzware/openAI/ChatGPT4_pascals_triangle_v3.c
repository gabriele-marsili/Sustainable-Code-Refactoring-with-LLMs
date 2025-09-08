#include "pascals_triangle.h"
#include <stdlib.h>

void check_alloc(void *p);

size_t **create_triangle(int rows)
{
	if (rows < 0)
		return NULL;

	size_t **triangle = (size_t **) malloc(sizeof(size_t*) * (rows > 0 ? rows : 1));
	check_alloc(triangle);

	if (rows == 0) {
		triangle[0] = (size_t *) malloc(sizeof(size_t));
		check_alloc(triangle[0]);
		triangle[0][0] = 0;
		return triangle;
	}

	for (int i = 0; i < rows; i++) {
		triangle[i] = (size_t *) malloc(sizeof(size_t) * (i + 1));
		check_alloc(triangle[i]);

		triangle[i][0] = 1;
		triangle[i][i] = 1;

		for (int j = 1; j < i; j++) {
			triangle[i][j] = triangle[i - 1][j - 1] + triangle[i - 1][j];
		}
	}

	return triangle;
}

void free_triangle(size_t **triangle, int size)
{
	if (size <= 0 || !triangle)
		return;

	for (int i = 0; i < size; i++) {
		free(triangle[i]);
	}

	free(triangle);
}

#include <stdio.h>
void check_alloc(void *p)
{
	if (!p) {
		fprintf(stderr, "Memory error.\n");
		exit(1);
	}
}