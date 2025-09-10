#include "saddle_points.h"
#include <limits.h>
#include <stdlib.h>

saddle_points_t *saddle_points(size_t rows, size_t columns,
                               uint8_t matrix[rows][columns]) {
    saddle_points_t *result = malloc(sizeof(saddle_points_t));
    if (!result) return NULL;

    result->points = malloc(sizeof(saddle_point_t) * rows * columns);
    if (!result->points) {
        free(result);
        return NULL;
    }

    result->rows = rows;
    result->columns = columns;
    result->count = 0;

    for (size_t i = 0; i < rows; ++i) {
        uint8_t row_max = 0;
        for (size_t j = 0; j < columns; ++j) {
            if (matrix[i][j] > row_max) {
                row_max = matrix[i][j];
            }
        }

        if (row_max == 0) continue;

        for (size_t j = 0; j < columns; ++j) {
            if (matrix[i][j] == row_max) {
                uint8_t col_min = UINT8_MAX;
                for (size_t k = 0; k < rows; ++k) {
                    if (matrix[k][j] < col_min) {
                        col_min = matrix[k][j];
                    }
                }

                if (matrix[i][j] == col_min) {
                    result->points[result->count].row = i + 1;
                    result->points[result->count].column = j + 1;
                    result->count++;
                }
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