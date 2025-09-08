#include "pascals_triangle.h"
#include <stdlib.h>
#include <stdio.h>

void check_alloc(void *p);

size_t **create_triangle(int rows)
{
	if (rows < 0)
		return NULL;

	size_t **triangle = (size_t **)malloc(sizeof(size_t*) * rows);
	if (rows > 0 && triangle == NULL) {
		fprintf(stderr, "Memory error.\n");
		exit(1);
	}
	if (rows == 0) {
		triangle = (size_t **)malloc(sizeof(size_t*));
		if (triangle == NULL) {
			fprintf(stderr, "Memory error.\n");
			exit(1);
		}
		triangle[0] = (size_t *)malloc(sizeof(size_t));
		if (triangle[0] == NULL) {
			fprintf(stderr, "Memory error.\n");
			exit(1);
		}
		triangle[0][0] = 0;
		return triangle;
	}

	for (int i = 0; i < rows; i++) {
		triangle[i] = (size_t *)malloc(sizeof(size_t) * (i + 1));
		if (triangle[i] == NULL) {
			for (int j = 0; j < i; j++) {
				free(triangle[j]);
			}
			free(triangle);
			fprintf(stderr, "Memory error.\n");
			exit(1);
		}

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

void free_triangle(size_t **triangle, int rows)
{
	if (rows <= 0 || triangle == NULL)
		return;

	for (int i = 0; i < rows; i++) {
		free(triangle[i]);
	}

	free(triangle);
}

void check_alloc(void *p)
{
	if (p == NULL) {
		fprintf(stderr, "Memory error.\n");
		exit(1);
	}
}