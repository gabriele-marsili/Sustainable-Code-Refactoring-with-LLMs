#include "pascals_triangle.h"

void free_triangle(uint8_t **triangle, size_t rows) {
    if (!triangle) return;
    for (size_t idx = 0; idx < rows; idx++) {
        free(triangle[idx]);
    }
    free(triangle);
}

uint8_t **create_triangle(size_t rows) {
    if (rows == 0) return NULL;

    uint8_t **triangle = malloc(rows * sizeof(uint8_t *));
    if (!triangle) return NULL;

    for (size_t row = 0; row < rows; row++) {
        triangle[row] = malloc((row + 1) * sizeof(uint8_t));
        if (!triangle[row]) {
            free_triangle(triangle, row);
            return NULL;
        }
        triangle[row][0] = triangle[row][row] = 1;
        for (size_t column = 1; column < row; column++) {
            triangle[row][column] = triangle[row - 1][column - 1] + triangle[row - 1][column];
        }
    }
    return triangle;
}