#include <stdlib.h>
#include <stdio.h>
#include <math.h>
#include "diamond.h"

char **make_diamond(char letter) {
    int size = letter - 'A';
    int diamond_size = 2 * size + 1;
    char **result = calloc(sizeof(char *), diamond_size);

    if (!result) return NULL;

    for (int l = 0; l < diamond_size; l++) {
        result[l] = calloc(sizeof(char), diamond_size + 1); // +1 for null terminator
        if (!result[l]) {
            // Handle allocation failure: free previously allocated rows
            for (int i = 0; i < l; i++) {
                free(result[i]);
            }
            free(result);
            return NULL;
        }

        int diff = size - abs(l - size);
        char letter_to_print = 'A' + diff;
        int letter_pos = size - diff;

        for (int n = 0; n < diamond_size; n++) {
            if (n == letter_pos || n == diamond_size - 1 - letter_pos) {
                result[l][n] = letter_to_print;
            } else {
                result[l][n] = ' ';
            }
        }
        result[l][diamond_size] = '\0'; // Null-terminate the string
    }

    return result;
}