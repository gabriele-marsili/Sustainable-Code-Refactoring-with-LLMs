#include "pascals_triangle.h"
#include <stdlib.h>

uint8_t **create_triangle(size_t rows) {
  if (rows == 0) {
    uint8_t **triangle = malloc(sizeof(uint8_t *));
    if (triangle == NULL) return NULL;

    *triangle = NULL;
    return triangle;
  }

  uint8_t **triangle = malloc(rows * sizeof(uint8_t *));
  if (triangle == NULL) return NULL;

  for (size_t i = 0; i < rows; i++) {
    triangle[i] = calloc(i + 1, sizeof(uint8_t));
    if (triangle[i] == NULL) {
      // Handle allocation failure: free previously allocated rows
      for (size_t j = 0; j < i; j++) {
        free(triangle[j]);
      }
      free(triangle);
      return NULL;
    }
    triangle[i][0] = 1;
    if (i > 0) {
      triangle[i][i] = 1;
    }
  }

  for (size_t i = 2; i < rows; i++) {
    for (size_t j = 1; j < i; j++) {
      triangle[i][j] = triangle[i - 1][j - 1] + triangle[i - 1][j];
    }
  }

  return triangle;
}

void free_triangle(uint8_t **triangle, size_t rows) {
  if (triangle == NULL) return;

  for (size_t i = 0; i < rows; i++) {
    free(triangle[i]);
  }
  free(triangle);
}