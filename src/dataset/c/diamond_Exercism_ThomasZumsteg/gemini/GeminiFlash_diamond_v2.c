#include <stdlib.h>
#include <stdio.h>
#include <math.h>
#include "diamond.h"

char **make_diamond(char letter) {
    int size = letter - 'A';
    int diamond_size = 2 * size + 1;
    char **result = calloc(sizeof(char *), diamond_size);

    if (result == NULL) {
        return NULL; // Handle allocation failure
    }

    for (int l = 0; l < diamond_size; l++) {
        result[l] = calloc(sizeof(char), diamond_size + 1); // +1 for null terminator
        if (result[l] == NULL) {
            // Handle allocation failure, free previously allocated memory
            for (int i = 0; i < l; i++) {
                free(result[i]);
            }
            free(result);
            return NULL;
        }

        for (int n = 0; n < diamond_size; n++) {
            int diff_l = abs(l - size);
            int diff_n = abs(n - size);

            if (diff_l + diff_n == size) {
                result[l][n] = 'A' + (size - diff_l);
            } else {
                result[l][n] = ' ';
            }
        }
        result[l][diamond_size] = '\0'; // Null-terminate the string
    }

    return result;
}