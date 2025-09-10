#include <stdlib.h>
#include <stdio.h>
#include "diamond.h"

char **make_diamond(char letter) {
    int size = letter - 'A';
    int dim = 2 * size + 1;
    char **result = malloc(dim * sizeof(char *));
    for (int l = 0; l < dim; l++) {
        result[l] = malloc(dim * sizeof(char));
        for (int n = 0; n < dim; n++) {
            result[l][n] = ' ';
        }
    }

    for (int i = 0; i <= size; i++) {
        char c = 'A' + i;
        result[size - i][size - i] = c;
        result[size - i][size + i] = c;
        result[size + i][size - i] = c;
        result[size + i][size + i] = c;
    }

    return result;
}