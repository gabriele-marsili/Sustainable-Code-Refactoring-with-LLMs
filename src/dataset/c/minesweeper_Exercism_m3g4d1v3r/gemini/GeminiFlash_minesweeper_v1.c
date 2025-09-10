#include "minesweeper.h"
#include <stdlib.h>

short count_mines(const char **minefield, int i, int j, int rows, int cols) {
    short count = 0;

    int start_row = (i > 0) ? -1 : 0;
    int end_row = (i < rows - 1) ? 1 : 0;
    int start_col = (j > 0) ? -1 : 0;
    int end_col = (j < cols - 1) ? 1 : 0;

    for (int inc_i = start_row; inc_i <= end_row; inc_i++) {
        for (int inc_j = start_col; inc_j <= end_col; inc_j++) {
            if (inc_i == 0 && inc_j == 0) continue;
            if (minefield[i + inc_i][j + inc_j] == '*') count++;
        }
    }
    return count;
}

char **annotate(const char **minefield, const size_t rows) {
    if (minefield == NULL || minefield[0] == NULL || rows == 0) return NULL;

    size_t cols = 0;
    while (minefield[0][cols] != '\0') cols++;

    char **output = malloc(sizeof(char *) * (rows + 1));
    if (output == NULL) return NULL;

    for (size_t row = 0; row < rows; row++) {
        output[row] = malloc(sizeof(char) * (cols + 1));
        if (output[row] == NULL) {
            // Handle allocation failure: free previously allocated rows
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

    for (size_t row = 0; annotation[row] != NULL; row++) {
        free(annotation[row]);
    }
    free(annotation);
}