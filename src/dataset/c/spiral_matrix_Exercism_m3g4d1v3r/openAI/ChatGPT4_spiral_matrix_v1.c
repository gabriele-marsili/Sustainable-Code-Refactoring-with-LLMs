#include "spiral_matrix.h"

#include <stdio.h>
#include <stdlib.h>
#include <string.h>

bool allocate_matrix(spiral_matrix_t **data, int n) {
    (*data) = malloc(sizeof(spiral_matrix_t));
    if (*data == NULL) return false;
    (*data)->size = n;
    if (n == 0) {
        (*data)->matrix = NULL;
        return false;
    }
    (*data)->matrix = malloc(sizeof(int *) * n);
    if ((*data)->matrix == NULL) {
        free(*data);
        return false;
    }
    for (int i = 0; i < n; i++) {
        (*data)->matrix[i] = calloc(n, sizeof(int));
        if ((*data)->matrix[i] == NULL) {
            for (int j = 0; j < i; j++) free((*data)->matrix[j]);
            free((*data)->matrix);
            free(*data);
            return false;
        }
    }
    return true;
}

bool check_blockage(spiral_matrix_t *data, walker_t *walker) {
    int next_i = walker->point.i, next_j = walker->point.j;
    switch (walker->direction) {
        case UP:    next_i--; break;
        case RIGHT: next_j++; break;
        case DOWN:  next_i++; break;
        case LEFT:  next_j--; break;
    }
    return (next_i < 0 || next_i >= data->size || next_j < 0 || next_j >= data->size || data->matrix[next_i][next_j] != 0);
}

void init_walker(walker_t *walker) {
    walker->score = 1;
    walker->direction = RIGHT;
    walker->point.i = 0;
    walker->point.j = 0;
}

spiral_matrix_t *spiral_matrix_create(int n) {
    spiral_matrix_t *data = NULL;
    if (!allocate_matrix(&data, n)) return data;

    walker_t walker;
    init_walker(&walker);

    while (walker.score <= n * n) {
        data->matrix[walker.point.i][walker.point.j] = walker.score++;
        if (check_blockage(data, &walker)) {
            turn_right_walker(&walker);
        } else {
            walk_walker(data, &walker);
        }
    }
    return data;
}

void spiral_matrix_destroy(spiral_matrix_t *data) {
    if (data) {
        for (int i = 0; i < data->size; i++) {
            free(data->matrix[i]);
        }
        free(data->matrix);
        free(data);
    }
}

void turn_right_walker(walker_t *walker) {
    walker->direction = (walker->direction + 1) % 4;
}

void walk_walker(spiral_matrix_t *data, walker_t *walker) {
    switch (walker->direction) {
        case UP:    walker->point.i--; break;
        case RIGHT: walker->point.j++; break;
        case DOWN:  walker->point.i++; break;
        case LEFT:  walker->point.j--; break;
    }
}