#include "pascals_triangle.h"
#include <stdlib.h>

uint8_t **create_triangle(size_t rows) {
    if (rows == 0) {
        uint8_t **triangle = calloc(1, sizeof(uint8_t *));
        if (triangle == NULL) return NULL;
        *triangle = calloc(1, sizeof(uint8_t));
        if (*triangle == NULL) {
            free(triangle);
            return NULL;
        }
        (*triangle)[0] = 0;
        return triangle;
    }

    uint8_t **triangle = calloc(rows, sizeof(uint8_t *));
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
    }

    triangle[0][0] = 1;

    for (size_t i = 1; i < rows; i++) {
        triangle[i][0] = 1;
        for (size_t j = 1; j < i; j++) {
            triangle[i][j] = triangle[i - 1][j] + triangle[i - 1][j - 1];
        }
        triangle[i][i] = 1;
    }

    return triangle;
}

void free_triangle(uint8_t **triangle, size_t rows) {
    if (triangle == NULL) return;

    for (size_t i = 0; i < rows; i++) {
        if (triangle[i] != NULL) {
            free(triangle[i]);
        }
    }
    free(triangle);
}