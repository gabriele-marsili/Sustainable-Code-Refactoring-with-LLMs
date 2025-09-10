#include "series.h"
#include <stdlib.h>
#include <string.h>

char *substr(const char *text, int len) {
    if (!text || len <= 0) return NULL;
    char *result = malloc(len + 1);
    if (!result) return NULL;
    strncpy(result, text, len);
    result[len] = '\0';
    return result;
}

SeriesResults_t series(const char *inputText, unsigned int substringLength) {
    SeriesResults_t result = {0, NULL};
    if (!inputText || substringLength == 0) return result;

    size_t inputLen = strlen(inputText);
    if (substringLength > inputLen) return result;

    size_t n_substrs = inputLen - substringLength + 1;
    result.substring = malloc(n_substrs * sizeof(char *));
    if (!result.substring) return result;

    for (size_t i = 0; i < n_substrs; i++) {
        result.substring[i] = substr(inputText + i, substringLength);
        if (!result.substring[i]) {
            for (size_t j = 0; j < i; j++) free(result.substring[j]);
            free(result.substring);
            result.substring = NULL;
            result.substringCount = 0;
            return result;
        }
        result.substringCount++;
    }

    return result;
}