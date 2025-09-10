#include "minesweeper.h"
#include <stdbool.h>

short count_mines(const char **minefield, int i, int j, int rows, int cols) {
    short count = 0;

    for (int inc_i = -1; inc_i <= 1; inc_i++) {
        for (int inc_j = -1; inc_j <= 1; inc_j++) {
            if (inc_i == 0 && inc_j == 0) continue;

            int neighbor_row = i + inc_i;
            int neighbor_col = j + inc_j;

            if (neighbor_row < 0 || neighbor_row >= rows || neighbor_col < 0 || neighbor_col >= cols) continue;

            if (minefield[neighbor_row][neighbor_col] == '*') count++;
        }
    }
    return count;
}

char **annotate(const char **minefield, const size_t rows) {
    if (minefield == NULL || minefield[0] == NULL || rows == 0) return NULL;

    size_t cols = 0;
    while (minefield[0][cols] != '\0') {
        cols++;
    }

    char **output = malloc(sizeof(char *) * (rows + 1));
    if (output == NULL) return NULL;

    for (size_t row = 0; row < rows; row++) {
        output[row] = malloc(sizeof(char) * (cols + 1));
        if (output[row] == NULL) {
            for (size_t k = 0; k < row; k++) {
                free(output[k]);
            }
            free(output);
            return NULL;
        }

        for (size_t col = 0; col < cols; col++) {
            if (minefield[row][col] == '*') {
                output[row][col] = '*';
            } else {
                short mines = count_mines(minefield, row, col, rows, cols);
                output[row][col] = (mines > 0) ? '0' + mines : ' ';
            }
        }
        output[row][cols] = '\0';
    }
    output[rows] = NULL;
    return output;
}

void free_annotation(char **annotation) {
    if (annotation == NULL) return;

    size_t row = 0;
    while (annotation[row] != NULL) {
        free(annotation[row]);
        row++;
    }
    free(annotation);
}