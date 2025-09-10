#include "series.h"
#include <stdlib.h>
#include <string.h>

SeriesResults_t series(char *inputText, unsigned int substringLength) {
    SeriesResults_t result;
    result.substringCount = 0;
    result.substring = NULL;

    if (substringLength == 0 || inputText == NULL) {
        return result;
    }

    int inputLength = strlen(inputText);
    int n_substrs = inputLength - substringLength + 1;

    if (n_substrs <= 0) {
        return result;
    }

    result.substring = malloc(sizeof(char *) * n_substrs);

    for (int i = 0; i < n_substrs; i++) {
        result.substring[i] = strndup(inputText + i, substringLength);
        result.substringCount++;
    }

    return result;
}