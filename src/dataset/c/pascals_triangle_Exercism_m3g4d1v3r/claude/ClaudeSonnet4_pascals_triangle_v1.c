#include "pascals_triangle.h"

void free_triangle(uint8_t **triangle, size_t rows) {
    if (triangle == NULL) return;
    for (size_t idx = 0; idx < rows; idx++) {
        free(triangle[idx]);
    }
    free(triangle);
}

uint8_t find_left_parent(uint8_t **triangle, size_t row, size_t column) {
    if (triangle == NULL || row == 0 || column == 0) return 0;
    return triangle[row - 1][column - 1];
}

uint8_t find_right_parent(uint8_t **triangle, size_t row, size_t column) {
    if (triangle == NULL || row == 0 || column >= row) return 0;
    return triangle[row - 1][column];
}

uint8_t **create_triangle(size_t rows) {
    if (rows == 0) {
        uint8_t **triangle = malloc(sizeof(uint8_t *));
        if (triangle == NULL) return NULL;
        triangle[0] = malloc(sizeof(uint8_t));
        if (triangle[0] == NULL) {
            free(triangle);
            return NULL;
        }
        triangle[0][0] = 0;
        return triangle;
    }

    uint8_t **triangle = malloc(sizeof(uint8_t *) * rows);
    if (triangle == NULL) return NULL;

    for (size_t row = 0; row < rows; row++) {
        triangle[row] = malloc(sizeof(uint8_t) * (row + 1));
        if (triangle[row] == NULL) {
            for (size_t i = 0; i < row; i++) {
                free(triangle[i]);
            }
            free(triangle);
            return NULL;
        }

        triangle[row][0] = 1;
        triangle[row][row] = 1;
        
        for (size_t column = 1; column < row; column++) {
            triangle[row][column] = triangle[row - 1][column - 1] + triangle[row - 1][column];
        }
    }
    
    return triangle;
}