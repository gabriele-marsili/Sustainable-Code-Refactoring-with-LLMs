#ifndef SPIRAL_MATRIX_H
#define SPIRAL_MATRIX_H

#include <stdbool.h>
#include <stdlib.h>

typedef enum { UP, RIGHT, DOWN, LEFT } direction_t;

typedef struct {
    int i;
    int j;
} point_t;

typedef struct {
    int score;
    direction_t direction;
    point_t point;
} walker_t;

typedef struct {
    int size;
    int **matrix;
} spiral_matrix_t;

bool allocate_matrix(spiral_matrix_t **data, int n);
bool check_blockage(spiral_matrix_t *data, walker_t *walker);
void init_walker(walker_t *walker);
spiral_matrix_t *spiral_matrix_create(int n);
void spiral_matrix_destroy(spiral_matrix_t *data);
void turn_right_walker(walker_t *walker);
void walk_walker(spiral_matrix_t *data, walker_t *walker);

#endif
