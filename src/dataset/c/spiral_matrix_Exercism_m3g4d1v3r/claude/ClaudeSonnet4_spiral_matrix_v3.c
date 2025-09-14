#include "spiral_matrix.h"
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

bool allocate_matrix(spiral_matrix_t **data, int n) {
    *data = malloc(sizeof(spiral_matrix_t));
    if (*data == NULL) return false;
    
    (*data)->size = n;
    (*data)->matrix = NULL;
    
    if (n == 0) return false;
    
    int **matrix = malloc(sizeof(int *) * n);
    if (matrix == NULL) {
        free(*data);
        *data = NULL;
        return false;
    }
    
    int *matrix_data = calloc(n * n, sizeof(int));
    if (matrix_data == NULL) {
        free(matrix);
        free(*data);
        *data = NULL;
        return false;
    }
    
    for (int i = 0; i < n; i++) {
        matrix[i] = matrix_data + i * n;
    }
    
    (*data)->matrix = matrix;
    return true;
}

bool check_blockage(spiral_matrix_t *data, walker_t *walker) {
    int next_i = walker->point.i;
    int next_j = walker->point.j;
    
    switch (walker->direction) {
        case UP:    next_i--; break;
        case RIGHT: next_j++; break;
        case DOWN:  next_i++; break;
        case LEFT:  next_j--; break;
    }
    
    return (next_i < 0 || next_i >= data->size || 
            next_j < 0 || next_j >= data->size ||
            data->matrix[next_i][next_j] != 0);
}

void init_walker(walker_t *walker) {
    walker->score = 1;
    walker->direction = RIGHT;
    walker->point.i = 0;
    walker->point.j = 0;
}

spiral_matrix_t *spiral_matrix_create(int n) {
    if (n <= 0) return NULL;
    
    spiral_matrix_t *data;
    if (!allocate_matrix(&data, n)) return NULL;
    
    walker_t walker;
    init_walker(&walker);
    
    int total_cells = n * n;
    int consecutive_turns = 0;
    
    while (walker.score < total_cells) {
        if (!check_blockage(data, &walker)) {
            walk_walker(data, &walker);
            consecutive_turns = 0;
        } else {
            turn_right_walker(&walker);
            consecutive_turns++;
            if (consecutive_turns >= 4) break;
        }
    }
    
    data->matrix[walker.point.i][walker.point.j] = walker.score;
    return data;
}

void spiral_matrix_destroy(spiral_matrix_t *data) {
    if (data == NULL) return;
    
    if (data->matrix != NULL) {
        if (data->size > 0) {
            free(data->matrix[0]);
        }
        free(data->matrix);
    }
    free(data);
}

void turn_right_walker(walker_t *walker) {
    walker->direction = (walker->direction + 1) % 4;
}

void walk_walker(spiral_matrix_t *data, walker_t *walker) {
    data->matrix[walker->point.i][walker->point.j] = walker->score++;
    
    switch (walker->direction) {
        case UP:    walker->point.i--; break;
        case RIGHT: walker->point.j++; break;
        case DOWN:  walker->point.i++; break;
        case LEFT:  walker->point.j--; break;
    }
}