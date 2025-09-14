#include "minesweeper.h"

short count_mines(const char **minefield, int i, int j, int rows, int cols) {
    short count = 0;
    
    int start_i = (i > 0) ? i - 1 : i;
    int end_i = (i < rows - 1) ? i + 1 : i;
    int start_j = (j > 0) ? j - 1 : j;
    int end_j = (j < cols - 1) ? j + 1 : j;
    
    for (int row = start_i; row <= end_i; row++) {
        for (int col = start_j; col <= end_j; col++) {
            if (row == i && col == j) continue;
            if (minefield[row][col] == '*') count++;
        }
    }
    return count;
}

char **annotate(const char **minefield, const size_t rows) {
    if (minefield == NULL || rows == 0 || minefield[0] == NULL) return NULL;
    
    size_t cols = strlen(minefield[0]);
    if (cols == 0) return NULL;
    
    char **output = malloc(sizeof(char *) * (rows + 1));
    if (output == NULL) return NULL;
    
    for (size_t row = 0; row < rows; row++) {
        output[row] = malloc(cols + 1);
        if (output[row] == NULL) {
            for (size_t i = 0; i < row; i++) free(output[i]);
            free(output);
            return NULL;
        }
        
        const char *current_row = minefield[row];
        char *output_row = output[row];
        
        for (size_t col = 0; col < cols; col++) {
            if (current_row[col] == '*') {
                output_row[col] = '*';
            } else {
                short mines = count_mines(minefield, row, col, rows, cols);
                output_row[col] = (mines > 0) ? '0' + mines : ' ';
            }
        }
        output_row[cols] = '\0';
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