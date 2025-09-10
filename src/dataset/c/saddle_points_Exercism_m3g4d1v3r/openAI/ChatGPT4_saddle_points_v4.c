#include "saddle_points.h"

saddle_points_t *saddle_points(size_t rows, size_t columns,
                               uint8_t matrix[rows][columns]) {
    saddle_points_t *result = malloc(sizeof(saddle_points_t));
    if (!result) return NULL;

    result->points = malloc(sizeof(saddle_point_t) * (rows * columns));
    if (!result->points) {
        free(result);
        return NULL;
    }

    result->count = 0;

    uint8_t row_max[rows];
    uint8_t col_min[columns];

    for (size_t i = 0; i < rows; i++) {
        row_max[i] = 0;
        for (size_t j = 0; j < columns; j++) {
            if (matrix[i][j] > row_max[i]) {
                row_max[i] = matrix[i][j];
            }
        }
    }

    for (size_t j = 0; j < columns; j++) {
        col_min[j] = UINT8_MAX;
        for (size_t i = 0; i < rows; i++) {
            if (matrix[i][j] < col_min[j]) {
                col_min[j] = matrix[i][j];
            }
        }
    }

    for (size_t i = 0; i < rows; i++) {
        for (size_t j = 0; j < columns; j++) {
            if (matrix[i][j] == row_max[i] && matrix[i][j] == col_min[j]) {
                result->points[result->count].row = i + 1;
                result->points[result->count].column = j + 1;
                result->count++;
            }
        }
    }

    return result;
}

void free_saddle_points(saddle_points_t *data) {
    if (data) {
        free(data->points);
        free(data);
    }
}