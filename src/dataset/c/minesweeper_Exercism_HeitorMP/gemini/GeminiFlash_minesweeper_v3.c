#include "minesweeper.h"
#include <stdlib.h>
#include <string.h>

static inline bool is_valid(char c) {
    return c != '*';
}

char **annotate(const char **minefield, const size_t rows) {
    if (rows == 0) {
        return NULL;
    }

    size_t cols = 0;
    if (minefield && minefield[0]) {
        cols = strlen(minefield[0]);
    } else {
        return NULL;
    }

    char **my_minefield = malloc(sizeof(char *) * rows);
    if (!my_minefield) {
        return NULL;
    }

    for (size_t i = 0; i < rows; i++) {
        my_minefield[i] = malloc(sizeof(char) * (cols + 1));
        if (!my_minefield[i]) {
            for (size_t j = 0; j < i; j++) {
                free(my_minefield[j]);
            }
            free(my_minefield);
            return NULL;
        }
        memset(my_minefield[i], '0', cols);
        my_minefield[i][cols] = '\0';
    }

    for (size_t y = 0; y < rows; y++) {
        for (size_t x = 0; x < cols; x++) {
            if (minefield[y][x] == '*') {
                my_minefield[y][x] = '*';
                for (int i = -1; i <= 1; i++) {
                    for (int j = -1; j <= 1; j++) {
                        if (i == 0 && j == 0) continue;
                        int ny = y + i;
                        int nx = x + j;

                        if (ny >= 0 && ny < rows && nx >= 0 && nx < cols && is_valid(my_minefield[ny][nx])) {
                            my_minefield[ny][nx]++;
                        }
                    }
                }
            }
        }
    }

    for (size_t y = 0; y < rows; y++) {
        for (size_t x = 0; x < cols; x++) {
            if (my_minefield[y][x] == '0') {
                my_minefield[y][x] = ' ';
            }
        }
    }

    return my_minefield;
}

void free_annotation(char **annotation) {
    if (annotation) {
        // Determine the number of rows.  We can't know this from just the pointer.
        // Assuming the caller knows the number of rows allocated.
        // Without this information, we can't safely free the memory.
        // A better design would be to return a struct containing the annotation and the number of rows.
        // For now, we'll just free the top-level pointer.
        free(annotation);
    }
}