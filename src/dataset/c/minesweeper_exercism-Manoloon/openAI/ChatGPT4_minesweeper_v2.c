#include "minesweeper.h"
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

char **annotate(const char **minefield, const size_t rows)
{
    if (rows == 0 || minefield == NULL || minefield[0] == NULL) return NULL;

    size_t cols = strlen(minefield[0]);
    char **result = calloc(rows, sizeof(char *));
    if (!result) return NULL;

    for (size_t r = 0; r < rows; ++r) {
        result[r] = malloc(cols + 1);
        if (!result[r]) {
            free_annotation(result);
            return NULL;
        }

        for (size_t c = 0; c < cols; ++c) {
            if (minefield[r][c] == '*') {
                result[r][c] = '*';
                continue;
            }

            int count = 0;
            for (int dr = -1; dr <= 1; ++dr) {
                for (int dc = -1; dc <= 1; ++dc) {
                    if (dr == 0 && dc == 0) continue;
                    size_t nr = r + dr, nc = c + dc;
                    if (nr < rows && nc < cols && minefield[nr][nc] == '*') {
                        ++count;
                    }
                }
            }
            result[r][c] = (count > 0) ? '0' + count : minefield[r][c];
        }
        result[r][cols] = '\0';
    }
    return result;
}

void free_annotation(char **annotation)
{
    if (!annotation) return;
    for (size_t i = 0; annotation[i] != NULL; ++i) {
        free(annotation[i]);
    }
    free(annotation);
}