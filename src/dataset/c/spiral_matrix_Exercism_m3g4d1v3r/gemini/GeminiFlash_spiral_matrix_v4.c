#include "spiral_matrix.h"

#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>

bool allocate_matrix(spiral_matrix_t **data, int n) {
    *data = malloc(sizeof(spiral_matrix_t));
    if (!*data) return false;

    (*data)->size = n;
    (*data)->matrix = NULL;

    if (n == 0) {
        return false;
    }

    (*data)->matrix = malloc(sizeof(int *) * n);
    if (!(*data)->matrix) {
        free(*data);
        *data = NULL;
        return false;
    }

    for (int i = 0; i < n; i++) {
        (*data)->matrix[i] = malloc(sizeof(int) * n);
        if (!(*data)->matrix[i]) {
            // Cleanup allocated memory on failure
            for (int j = 0; j < i; j++) {
                free((*data)->matrix[j]);
            }
            free((*data)->matrix);
            free(*data);
            *data = NULL;
            return false;
        }

        // Initialize matrix elements to 0 using memset for efficiency
        memset((*data)->matrix[i], 0, sizeof(int) * n);
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
    if (!allocate_matrix(&data, n)) return NULL;

    walker_t walker;
    init_walker(&walker);

    int total_elements = n * n;
    while (walker.score <= total_elements) {
        data->matrix[walker.point.i][walker.point.j] = walker.score++;

        int next_i = walker.point.i;
        int next_j = walker.point.j;

        switch (walker.direction) {
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

        if (next_i < 0 || next_i >= n || next_j < 0 || next_j >= n ||
            data->matrix[next_i][next_j] != 0) {
            turn_right_walker(&walker);
        }

        walker.point.i = next_i;
        walker.point.j = next_j;
    }

    return data;
}

void spiral_matrix_destroy(spiral_matrix_t *data) {
    if (!data) return;

    int size = data->size;
    if (size > 0) {
        for (int i = 0; i < size; i++) {
            free(data->matrix[i]);
        }
        free(data->matrix);
    }
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