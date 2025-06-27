#include "spiral_matrix.h"

#include <stdio.h>

bool allocate_matrix(spiral_matrix_t **data, int n) {
    (*data) = malloc(sizeof(spiral_matrix_t));
    if (*data == NULL) return (false);
    (*data)->size = n;
    (*data)->matrix = NULL;
    if (n == 0) {
        (*data)->matrix = NULL;
        return (false);
    }
    (*data)->matrix = malloc(sizeof(int *) * n);
    if ((*data)->matrix == NULL) return (false);
    for (int i = 0; i < n; i++) {
        (*data)->matrix[i] = malloc(sizeof(int) * n);
        if ((*data)->matrix[i] == NULL) return (false);
        for (int j = 0; j < n; j++) {
            (*data)->matrix[i][j] = 0;
        }
    }
    return (true);
}

bool check_blockage(spiral_matrix_t *data, walker_t *walker) {
    switch (walker->direction) {
        case UP:
            if ((walker->point.i - 1) < 0) return (true);
            if (data->matrix[walker->point.i - 1][walker->point.j] != 0)
                return (true);
            break;
        case RIGHT:
            if ((walker->point.j + 1) >= data->size) return (true);
            if (data->matrix[walker->point.i][walker->point.j + 1] != 0)
                return (true);
            break;
        case DOWN:
            if ((walker->point.i + 1) >= data->size) return (true);
            if (data->matrix[walker->point.i + 1][walker->point.j] != 0)
                return (true);
            break;
        case LEFT:
            if ((walker->point.j - 1) < 0) return (true);
            if (data->matrix[walker->point.i][walker->point.j - 1] != 0)
                return (true);
            break;
    }
    return (false);
}

void init_walker(walker_t *walker) {
    walker->score = 1;
    walker->direction = RIGHT;
    walker->point.i = 0;
    walker->point.j = 0;
}

spiral_matrix_t *spiral_matrix_create(int n) {
    int n_turns;
    spiral_matrix_t *data;
    walker_t walker;

    data = NULL;
    if (allocate_matrix(&data, n) == false) return (data);
    init_walker(&walker);
    n_turns = 0;
    while (walker.score <= (n * n - 1)) {
        if (check_blockage(data, &walker) == false) {
            walk_walker(data, &walker);
            n_turns = 0;
        } else {
            turn_right_walker(&walker);
            n_turns++;
        }
        if (n_turns >= 2) break;
    }
    data->matrix[walker.point.i][walker.point.j] = walker.score;
    return (data);
}

void spiral_matrix_destroy(spiral_matrix_t *data) {
    if (data->size == 0) {
        free(data);
        return;
    }
    for (int i = 0; i < data->size; i++) {
        free(data->matrix[i]);
    }
    free(data->matrix);
    free(data);
}

void turn_right_walker(walker_t *walker) {
    switch (walker->direction) {
        case UP:
            walker->direction = RIGHT;
            break;
        case RIGHT:
            walker->direction = DOWN;
            break;
        case DOWN:
            walker->direction = LEFT;
            break;
        case LEFT:
            walker->direction = UP;
            break;
    }
}

void walk_walker(spiral_matrix_t *data, walker_t *walker) {
    data->matrix[walker->point.i][walker->point.j] = walker->score++;
    switch (walker->direction) {
        case UP:
            walker->point.i--;
            break;
        case RIGHT:
            walker->point.j++;
            break;
        case DOWN:
            walker->point.i++;
            break;
        case LEFT:
            walker->point.j--;
            break;
    }
}
