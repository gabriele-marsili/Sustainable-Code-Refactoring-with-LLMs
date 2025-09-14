#include <stdlib.h>
#include <stdio.h>
#include "diamond.h"

char **make_diamond(char letter) {
    int size = letter - 'A';
    int dimension = 2 * size + 1;
    
    char **result = malloc(sizeof(char *) * dimension);
    
    for (int l = 0; l < dimension; l++) {
        result[l] = malloc(sizeof(char) * (dimension + 1));
        
        int row_distance = abs(l - size);
        char row_letter = 'A' + (size - row_distance);
        
        for (int n = 0; n < dimension; n++) {
            int col_distance = abs(n - size);
            result[l][n] = (row_distance + col_distance == size) ? row_letter : ' ';
        }
        result[l][dimension] = '\0';
    }
    
    return result;
}