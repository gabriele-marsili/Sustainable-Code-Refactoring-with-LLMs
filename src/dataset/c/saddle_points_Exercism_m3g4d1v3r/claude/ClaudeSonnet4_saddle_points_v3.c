#include "saddle_points.h"

saddle_points_t *saddle_points(size_t rows, size_t columns,
                               uint8_t matrix[rows][columns]) {
    saddle_points_t *result;
    uint8_t *row_max, *col_min;
    
    result = malloc(sizeof(saddle_points_t));
    if (result == NULL) return NULL;
    
    row_max = malloc(sizeof(uint8_t) * rows);
    col_min = malloc(sizeof(uint8_t) * columns);
    if (row_max == NULL || col_min == NULL) {
        free(row_max);
        free(col_min);
        free(result);
        return NULL;
    }
    
    result->points = malloc(sizeof(saddle_point_t) * (rows * columns));
    if (result->points == NULL) {
        free(row_max);
        free(col_min);
        free(result);
        return NULL;
    }
    
    result->rows = rows;
    result->columns = columns;
    result->count = 0;
    
    for (size_t i = 0; i < rows; i++) {
        row_max[i] = matrix[i][0];
        for (size_t j = 1; j < columns; j++) {
            if (matrix[i][j] > row_max[i]) {
                row_max[i] = matrix[i][j];
            }
        }
    }
    
    for (size_t j = 0; j < columns; j++) {
        col_min[j] = matrix[0][j];
        for (size_t i = 1; i < rows; i++) {
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
    
    free(row_max);
    free(col_min);
    return result;
}

void free_saddle_points(saddle_points_t *data) {
    if (data == NULL) return;
    free(data->points);
    free(data);
}