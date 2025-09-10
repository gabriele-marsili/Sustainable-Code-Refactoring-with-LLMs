#include <stdlib.h>
#include <stdio.h>
#include "diamond.h"

char **make_diamond(char letter) {
    int size = letter - 'A';
    int dim = 2 * size + 1;
    char **result = calloc(dim, sizeof(char *));
    if (!result) return NULL;

    for (int l = 0; l < dim; l++) {
        result[l] = calloc(dim + 1, sizeof(char)); // +1 for null terminator
        if (!result[l]) {
            for (int i = 0; i < l; i++) free(result[i]);
            free(result);
            return NULL;
        }

        int diff = size - abs(l - size);
        for (int n = size - diff; n <= size + diff; n++) {
            result[l][n] = 'A' + diff;
        }
    }

    return result;
}