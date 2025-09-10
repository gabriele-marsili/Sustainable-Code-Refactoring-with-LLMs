#include "series.h"
#include <stdlib.h>
#include <string.h>

SeriesResults_t series(char *inputText, unsigned int substringLength) {
    size_t inputLength = strlen(inputText);
    if (substringLength == 0 || inputLength < substringLength) {
        SeriesResults_t result = {0, NULL};
        return result;
    }

    size_t substringCount = inputLength - substringLength + 1;
    char **substrings = malloc(substringCount * sizeof(char*));
    if (substrings == NULL) {
        SeriesResults_t result = {0, NULL};
        return result;
    }

    for (size_t i = 0; i < substringCount; ++i) {
        substrings[i] = malloc((substringLength + 1) * sizeof(char));
        if (substrings[i] == NULL) {
            // Handle allocation failure: free previously allocated substrings
            for (size_t j = 0; j < i; ++j) {
                free(substrings[j]);
            }
            free(substrings);
            SeriesResults_t result = {0, NULL};
            return result;
        }
        strncpy(substrings[i], inputText + i, substringLength);
        substrings[i][substringLength] = '\0';
    }

    SeriesResults_t result = {substringCount, substrings};
    return result;
}