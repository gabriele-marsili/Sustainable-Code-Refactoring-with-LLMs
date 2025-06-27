#include "minesweeper.h"

short count_mines(const char **minefield, int i, int j, int rows, int cols) {
    size_t count;

    count = 0;
    for (int inc_i = -1; inc_i <= 1; inc_i++) {
        for (int inc_j = -1; inc_j <= 1; inc_j++) {
            if (inc_i == 0 && inc_j == 0) continue;
            if ((i + inc_i) < 0 || (i + inc_i) >= rows) continue;
            if ((j + inc_j) < 0 || (j + inc_j) >= cols) continue;
            if (minefield[i + inc_i][j + inc_j] == '*') count++;
        }
    }
    return (count);
}

char **annotate(const char **minefield, const size_t rows) {
    char **output;
    size_t mines, cols;

    if (minefield == NULL || minefield[0] == NULL || rows == 0) return (NULL);
    output = malloc(sizeof(char *) * (rows + 1));
    cols = 0;
    for (size_t col = 0; minefield[0][col] != '\0'; col++) cols++;
    for (size_t row = 0; row < rows; row++) {
        output[row] = malloc(sizeof(char) * (cols + 1));
        for (size_t col = 0; col < cols; col++) {
            if (minefield[row][col] == '*') {
                output[row][col] = '*';
                continue;
            }
            mines = count_mines(minefield, row, col, rows, cols);
            output[row][col] = (mines > 0) ? '0' + mines : ' ';
        }
        output[row][cols] = '\0';
    }
    output[rows] = NULL;
    return (output);
}

void free_annotation(char **annotation) {
    for (size_t row = 0; annotation[row] != NULL; row++) free(annotation[row]);
    free(annotation);
}
