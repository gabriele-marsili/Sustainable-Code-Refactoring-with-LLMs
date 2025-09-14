#include <stdlib.h>
#include <stdio.h>
#include "diamond.h"

char **make_diamond(char letter) {
    int size = letter - 'A';
    int dimension = 2 * size + 1;
    
    char **result = malloc(sizeof(char *) * dimension);
    
    for(int l = 0; l < dimension; l++) {
        result[l] = malloc(sizeof(char) * (dimension + 1));
        
        int row_offset = abs(l - size);
        char row_char = 'A' + (size - row_offset);
        
        for(int n = 0; n < dimension; n++) {
            int col_offset = abs(n - size);
            result[l][n] = (row_offset + col_offset == size) ? row_char : ' ';
        }
        result[l][dimension] = '\0';
    }
    
    return result;
}