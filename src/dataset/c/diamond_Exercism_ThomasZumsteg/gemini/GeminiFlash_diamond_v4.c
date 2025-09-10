#include <stdlib.h>
#include <stdio.h>
#include "diamond.h"

char **make_diamond(char letter) {
    int size = letter - 'A';
    int diamond_size = 2 * size + 1;
    char **result = calloc(diamond_size, sizeof(char *));
    if (!result) return NULL;

    for (int i = 0; i < diamond_size; ++i) {
        result[i] = calloc(diamond_size + 1, sizeof(char));
        if (!result[i]) {
            for (int j = 0; j < i; ++j) {
                free(result[j]);
            }
            free(result);
            return NULL;
        }
        result[i][diamond_size] = '\0';
    }

    for (int i = 0; i < size; ++i) {
        int distanceFromCenter = abs(size - i);
        char currentChar = 'A' + size - distanceFromCenter;
        int charPosition = size - (currentChar - 'A');

        result[i][charPosition] = currentChar;
        result[i][diamond_size - 1 - charPosition] = currentChar;
        result[diamond_size - 1 - i][charPosition] = currentChar;
        result[diamond_size - 1 - i][diamond_size - 1 - charPosition] = currentChar;
    }

    result[size][0] = letter;
    result[size][diamond_size - 1] = letter;

    return result;
}