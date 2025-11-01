#include "minesweeper.h"
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

char **annotate(const char **minefield, const size_t rows) {
    if (rows == 0 || minefield == NULL || minefield[0] == NULL) {
        return NULL;
    }

    size_t cols = strlen(minefield[0]);
    char **result = calloc(rows + 1, sizeof(char *));
    if (!result) {
        return NULL;
    }

    for (size_t r = 0; r < rows; ++r) {
        result[r] = malloc(cols + 1);
        if (!result[r]) {
            free_annotation(result);
            return NULL;
        }

        strncpy(result[r], minefield[r], cols); // Copy the row directly
        result[r][cols] = '\0'; // Ensure null termination

        for (size_t c = 0; c < cols; ++c) {
            if (minefield[r][c] == '*') {
                result[r][c] = '*'; // Keep the mine as is
            } else {
                int count = 0;
                for (int dr = -1; dr <= 1; ++dr) {
                    for (int dc = -1; dc <= 1; ++dc) {
                        if (dr == 0 && dc == 0) continue;
                        int nr = (int)r + dr;
                        int nc = (int)c + dc;
                        if (nr >= 0 && nr < (int)rows && nc >= 0 && nc < (int)cols && minefield[nr][nc] == '*') {
                            count++;
                        }
                    }
                }
                if (count > 0) {
                    result[r][c] = '0' + count;
                } else {
                    result[r][c] = '.'; // Use '.' consistently for empty cells
                }
            }
        }
    }
    result[rows] = NULL; // NULL terminator for free_annotation
    return result;
}

void free_annotation(char **annotation) {
    if (annotation == NULL) return;
    for (size_t i = 0; annotation[i] != NULL; ++i) {
        free(annotation[i]);
    }
    free(annotation);
}