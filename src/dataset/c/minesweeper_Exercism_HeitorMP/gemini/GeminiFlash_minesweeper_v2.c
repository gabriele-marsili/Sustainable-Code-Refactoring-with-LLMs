#include "minesweeper.h"
#include <stdlib.h>
#include <string.h>

char **annotate(const char **minefield, const size_t rows) {
    if (rows == 0 || minefield == NULL || minefield[0] == NULL) {
        return NULL;
    }

    size_t cols = strlen(minefield[0]);
    if (cols == 0) return NULL;

    char **my_minefield = malloc(sizeof(char *) * rows);
    if (my_minefield == NULL) return NULL;

    for (size_t i = 0; i < rows; i++) {
        my_minefield[i] = malloc(sizeof(char) * (cols + 1));
        if (my_minefield[i] == NULL) {
            // Handle allocation failure: free previously allocated memory
            for (size_t j = 0; j < i; j++) {
                free(my_minefield[j]);
            }
            free(my_minefield);
            return NULL;
        }
        memset(my_minefield[i], '0', cols); // Initialize with '0'
        my_minefield[i][cols] = '\0';
    }

    // Copy mines directly and count adjacent mines
    for (size_t y = 0; y < rows; y++) {
        for (size_t x = 0; x < cols; x++) {
            if (minefield[y][x] == '*') {
                my_minefield[y][x] = '*';

                // Increment adjacent cells
                for (int i = -1; i <= 1; i++) {
                    for (int j = -1; j <= 1; j++) {
                        if (i == 0 && j == 0) continue; // Skip the mine itself

                        int ny = y + i;
                        int nx = x + j;

                        if (ny >= 0 && ny < rows && nx >= 0 && nx < cols && my_minefield[ny][nx] != '*') {
                            my_minefield[ny][nx]++;
                        }
                    }
                }
            }
        }
    }

    // Replace '0' with ' '
    for (size_t y = 0; y < rows; y++) {
        for (size_t x = 0; x < cols; x++) {
            if (my_minefield[y][x] == '0') {
                my_minefield[y][x] = ' ';
            }
        }
    }

    return my_minefield;
}

void free_annotation(char **annotation, size_t rows) {
    if (annotation == NULL) return;

    for (size_t i = 0; i < rows; i++) {
        free(annotation[i]);
    }
    free(annotation);
}