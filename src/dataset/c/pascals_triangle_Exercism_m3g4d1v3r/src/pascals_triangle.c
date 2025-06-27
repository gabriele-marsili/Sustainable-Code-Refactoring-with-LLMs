#include "pascals_triangle.h"

void free_triangle(uint8_t **triangle, size_t rows) {
    if (triangle == NULL) return;
    for (size_t idx = 0; idx < rows; idx++) {
        if (triangle[idx] == NULL) return;
        free(triangle[idx]);
    }
    free(triangle);
}

// row 0: 1
// row 1: 1 1
// row 2: 1 2 1
// row 3: 1 3 3 1
// row 4: 1 4 6 4 1
// row 5: 1 5 10 10 5 1
// row 6: 1 6 15 20 15 6 1

uint8_t find_left_parent(uint8_t **triangle, size_t row, size_t column) {
    if (triangle == NULL) return (0);
    if (row < (row - 1) || column < (column - 1) || column >= row) return (0);
    return (triangle[row - 1][column - 1]);
}

uint8_t find_right_parent(uint8_t **triangle, size_t row, size_t column) {
    if (triangle == NULL) return (0);
    if (row < (row - 1) || column >= row) return (0);
    return (triangle[row - 1][column]);
}

uint8_t **create_triangle(size_t rows) {
    uint8_t **triangle;
    uint8_t left_parent, right_parent;

    if (rows == 0) {
        triangle = malloc(sizeof(uint8_t *) * 1);
        if (triangle == NULL) return (NULL);
        triangle[0] = malloc(sizeof(uint8_t) * 1);
        if (triangle[0] == NULL) return (NULL);
        triangle[0][0] = 0;
        return (triangle);
    }
    triangle = malloc(sizeof(uint8_t *) * rows);
    if (triangle == NULL) return (NULL);
    for (size_t row = 0; row < rows; row++) {
        *(triangle + row) = malloc(sizeof(uint8_t) * (rows));
        if (triangle[row] == NULL) return (NULL);
        for (size_t column = 0; column < rows; column++)
            triangle[row][column] = 0;
    }
    for (size_t row = 0; row < rows; row++) {
        for (size_t column = 0; column < (row + 1); column++) {
            left_parent = find_left_parent(triangle, row, column);
            right_parent = find_right_parent(triangle, row, column);
            if (left_parent == 0 || right_parent == 0)
                triangle[row][column] = 1;
            else
                triangle[row][column] = left_parent + right_parent;
        }
    }
    return (triangle);
}
