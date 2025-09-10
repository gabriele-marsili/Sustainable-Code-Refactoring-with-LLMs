#include "spiral_matrix.h"

#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>

bool allocate_matrix(spiral_matrix_t **data, int n) {
    *data = malloc(sizeof(spiral_matrix_t));
    if (*data == NULL) {
        return false;
    }

    (*data)->size = n;
    (*data)->matrix = NULL;

    if (n == 0) {
        return false;
    }

    (*data)->matrix = malloc(sizeof(int *) * n);
    if ((*data)->matrix == NULL) {
        free(*data);
        return false;
    }

    for (int i = 0; i < n; i++) {
        (*data)->matrix[i] = malloc(sizeof(int) * n);
        if ((*data)->matrix[i] == NULL) {
            // Cleanup allocated memory
            for (int j = 0; j < i; j++) {
                free((*data)->matrix[j]);
            }
            free((*data)->matrix);
            free(*data);
            *data = NULL;
            return false;
        }

        // Initialize the matrix elements directly during allocation
        for (int j = 0; j < n; j++) {
            (*data)->matrix[i][j] = 0;
        }
    }

    return true;
}

bool check_blockage(spiral_matrix_t *data, walker_t *walker) {
    int next_i = walker->point.i;
    int next_j = walker->point.j;

    switch (walker->direction) {
        case UP:
            next_i--;
            break;
        case RIGHT:
            next_j++;
            break;
        case DOWN:
            next_i++;
            break;
        case LEFT:
            next_j--;
            break;
    }

    if (next_i < 0 || next_i >= data->size || next_j < 0 ||
        next_j >= data->size) {
        return true;
    }

    return data->matrix[next_i][next_j] != 0;
}

void init_walker(walker_t *walker) {
    walker->score = 1;
    walker->direction = RIGHT;
    walker->point.i = 0;
    walker->point.j = 0;
}

spiral_matrix_t *spiral_matrix_create(int n) {
    spiral_matrix_t *data = NULL;
    if (!allocate_matrix(&data, n)) {
        return NULL;
    }

    walker_t walker;
    init_walker(&walker);

    int n_turns = 0;
    while (walker.score <= (n * n)) {
        data->matrix[walker.point.i][walker.point.j] = walker.score++;

        if (!check_blockage(data, &walker)) {
            switch (walker.direction) {
                case UP:
                    walker.point.i--;
                    break;
                case RIGHT:
                    walker.point.j++;
                    break;
                case DOWN:
                    walker.point.i++;
                    break;
                case LEFT:
                    walker.point.j--;
                    break;
            }
            n_turns = 0;
        } else {
            switch (walker.direction) {
                case UP:
                    walker.direction = RIGHT;
                    break;
                case RIGHT:
                    walker.direction = DOWN;
                    break;
                case DOWN:
                    walker.direction = LEFT;
                    break;
                case LEFT:
                    walker.direction = UP;
                    break;
            }
            n_turns++;
            if (n_turns >= 2) break;
        }
    }

    return data;
}

void spiral_matrix_destroy(spiral_matrix_t *data) {
    if (data == NULL) return;

    int size = data->size;

    if (data->matrix != NULL) {
        for (int i = 0; i < size; i++) {
            free(data->matrix[i]);
        }
        free(data->matrix);
    }
    free(data);
}