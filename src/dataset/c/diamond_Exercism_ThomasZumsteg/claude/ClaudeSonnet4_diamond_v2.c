#include <stdlib.h>
#include <stdio.h>
#include "diamond.h"

char **make_diamond(char letter) {
    int size = letter - 'A';
    int dim = 2 * size + 1;
    char **result = malloc(sizeof(char *) * dim);
    
    for(int l = 0; l < dim; l++) {
        result[l] = malloc(sizeof(char) * (dim + 1));
        result[l][dim] = '\0';
        
        int row_diff = abs(l - size);
        char row_char = 'A' + (size - row_diff);
        
        for(int n = 0; n < dim; n++) {
            int col_diff = abs(n - size);
            result[l][n] = (row_diff + col_diff == size) ? row_char : ' ';
        }
    }
    return result;
}