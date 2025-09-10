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

SeriesResults_t series(char *inputText, unsigned int substringLength) {
    SeriesResults_t result;
    result.substringCount = 0;
    result.substring = NULL;

    if (!inputText || substringLength == 0) {
        return result;
    }

    size_t inputLength = strlen(inputText);
    if (substringLength > inputLength) {
        return result;
    }

    size_t maxSubstrings = inputLength - substringLength + 1;
    result.substring = malloc(sizeof(char*) * maxSubstrings);
    if (!result.substring) {
        return result;
    }

    for (size_t i = 0; i <= inputLength - substringLength; ++i) {
        char *sub = substr(inputText + i, substringLength);
        if (sub) {
            result.substring[result.substringCount++] = sub;
        }
    }

    return result;
}