#include "minesweeper.h"
#include <stdlib.h>
#include <string.h>

char **annotate(const char **minefield, const size_t rows) {
    if (rows == 0 || minefield == NULL || minefield[0] == NULL) {
        return NULL;
    }

    size_t cols = strlen(minefield[0]);
    if (cols == 0) {
        return NULL;
    }

    char **annotated_field = malloc(sizeof(char *) * rows);
    if (!annotated_field) {
        return NULL;
    }

    for (size_t i = 0; i < rows; ++i) {
        annotated_field[i] = malloc(sizeof(char) * (cols + 1));
        if (!annotated_field[i]) {
            // Handle allocation failure: free previously allocated rows
            for (size_t j = 0; j < i; ++j) {
                free(annotated_field[j]);
            }
            free(annotated_field);
            return NULL;
        }
        strcpy(annotated_field[i], minefield[i]); // Directly copy the minefield row
    }

    for (size_t y = 0; y < rows; ++y) {
        for (size_t x = 0; x < cols; ++x) {
            if (annotated_field[y][x] != '*') {
                annotated_field[y][x] = '0'; // Initialize to '0'
            }
        }
        annotated_field[y][cols] = '\0'; // Ensure null termination
    }

    int dx[] = {-1, -1, -1, 0, 0, 1, 1, 1};
    int dy[] = {-1, 0, 1, -1, 1, -1, 0, 1};

    for (size_t y = 0; y < rows; ++y) {
        for (size_t x = 0; x < cols; ++x) {
            if (minefield[y][x] == '*') {
                for (int i = 0; i < 8; ++i) {
                    int ny = y + dy[i];
                    int nx = x + dx[i];

                    if (ny >= 0 && ny < rows && nx >= 0 && nx < cols && annotated_field[ny][nx] != '*') {
                        if (annotated_field[ny][nx] == '0') {
                            annotated_field[ny][nx] = '1';
                        } else {
                            annotated_field[ny][nx]++;
                        }
                    }
                }
            }
        }
    }

    for (size_t y = 0; y < rows; ++y) {
        for (size_t x = 0; x < cols; ++x) {
            if (annotated_field[y][x] == '0') {
                annotated_field[y][x] = ' ';
            }
        }
    }

    return annotated_field;
}

void free_annotation(char **annotation, size_t rows) {
    if (annotation) {
        for (size_t i = 0; i < rows; ++i) {
            free(annotation[i]);
        }
        free(annotation);
    }
}