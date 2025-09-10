#include "series.h"
#include <stdlib.h>
#include <stdio.h>
#include <string.h>

char *substr(char *text, int len) {
    if (strlen(text) < len) return NULL;
    char *result = malloc(len + 1);
    if (!result) return NULL;
    strncpy(result, text, len);
    result[len] = '\0';
    return result;
}

SeriesResults_t series(char *inputText, unsigned int substringLength) {
    SeriesResults_t result = {0, NULL};
    size_t inputLength = strlen(inputText);
    if (substringLength == 0 || substringLength > inputLength) return result;

    int n_substrs = inputLength - substringLength + 1;
    result.substring = malloc(n_substrs * sizeof(char *));
    if (!result.substring) return result;

    for (int i = 0; i < n_substrs; i++) {
        result.substring[i] = substr(inputText + i, substringLength);
        if (!result.substring[i]) {
            for (int j = 0; j < i; j++) free(result.substring[j]);
            free(result.substring);
            result.substring = NULL;
            result.substringCount = 0;
            return result;
        }
        result.substringCount++;
    }
    return result;
}