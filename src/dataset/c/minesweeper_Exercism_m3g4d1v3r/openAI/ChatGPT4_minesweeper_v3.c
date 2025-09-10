#include "minesweeper.h"

short count_mines(const char **minefield, int i, int j, int rows, int cols) {
    short count = 0;

    for (int inc_i = -1; inc_i <= 1; inc_i++) {
        int ni = i + inc_i;
        if (ni < 0 || ni >= rows) continue;
        for (int inc_j = -1; inc_j <= 1; inc_j++) {
            if (inc_i == 0 && inc_j == 0) continue;
            int nj = j + inc_j;
            if (nj < 0 || nj >= cols) continue;
            count += (minefield[ni][nj] == '*');
        }
    }
    return count;
}

char **annotate(const char **minefield, const size_t rows) {
    if (!minefield || !minefield[0] || rows == 0) return NULL;

    size_t cols = 0;
    while (minefield[0][cols] != '\0') cols++;

    char **output = malloc(sizeof(char *) * (rows + 1));
    if (!output) return NULL;

    for (size_t row = 0; row < rows; row++) {
        output[row] = malloc(sizeof(char) * (cols + 1));
        if (!output[row]) {
            for (size_t r = 0; r < row; r++) free(output[r]);
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
    if (!annotation) return;
    for (size_t row = 0; annotation[row]; row++) free(annotation[row]);
    free(annotation);
}