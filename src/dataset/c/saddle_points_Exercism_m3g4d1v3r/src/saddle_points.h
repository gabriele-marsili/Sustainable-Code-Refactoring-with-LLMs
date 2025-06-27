#ifndef SADDLE_POINTS_H
#define SADDLE_POINTS_H

#include <stddef.h>
#include <stdint.h>
#include <stdlib.h>

typedef struct {
    size_t row;
    size_t column;
} saddle_point_t;

typedef struct {
    size_t count;
    size_t rows;
    size_t columns;
    saddle_point_t *points;
} saddle_points_t;

saddle_points_t *saddle_points(size_t rows, size_t columns,
                               uint8_t matrix[rows][columns]);
void free_saddle_points(saddle_points_t *data);

#endif
