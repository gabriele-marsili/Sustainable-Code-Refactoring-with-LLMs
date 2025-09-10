#include "series.h"
#include <stdlib.h>
#include <stdio.h>
#include <string.h>

char *substr(const char *text, int len) {
    if (!text || len <= 0) return NULL;

    char *result = malloc(len + 1);
    if (!result) return NULL;

    strncpy(result, text, len);
    result[len] = '\0';

    return result;
}

SeriesResults_t series(char *inputText, unsigned int substringLength) {
    SeriesResults_t result;
    result.substringCount = 0;
    result.substring = NULL;

    size_t inputLength = strlen(inputText);

    if (substringLength == 0 || inputLength < substringLength) {
        return result;
    }

    size_t n_substrs = inputLength - substringLength + 1;
    result.substring = malloc(sizeof(char*) * n_substrs);

    if (!result.substring) {
        return result;
    }

    result.substringCount = n_substrs;

    for (size_t i = 0; i < n_substrs; ++i) {
        result.substring[i] = substr(inputText + i, substringLength);
        if (!result.substring[i]) {
            // Handle allocation failure: free previously allocated substrings
            for (size_t j = 0; j < i; ++j) {
                free(result.substring[j]);
            }
            free(result.substring);
            result.substring = NULL;
            result.substringCount = 0;
            return result;
        }
    }

    return result;
}