#include <stdlib.h>
#include <stdio.h>
#include "diamond.h"

char **make_diamond(char letter) {
    int size = letter - 'A';
    int dim = 2 * size + 1;
    char **result = malloc(dim * sizeof(char *));
    for (int l = 0; l < dim; l++) {
        result[l] = malloc(dim * sizeof(char));
        int diff = size - abs(l - size);
        for (int n = 0; n < dim; n++) {
            result[l][n] = (abs(n - size) == diff) ? 'A' + diff : ' ';
        }
    }
    return result;
}