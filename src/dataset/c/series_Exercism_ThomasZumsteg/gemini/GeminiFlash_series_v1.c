#include "series.h"
#include <stdlib.h>
#include <string.h>

SeriesResults_t series(char *inputText, unsigned int substringLength) {
    size_t inputLength = strlen(inputText);
    int n_substrs = (int)inputLength - (int)substringLength + 1;

    SeriesResults_t result;
    result.substringCount = 0;
    result.substring = NULL;

    if (n_substrs <= 0 || substringLength == 0) {
        return result;
    }

    result.substring = malloc(sizeof(char*) * n_substrs);
    if (result.substring == NULL) {
        return result; // Handle allocation failure
    }

    for (int i = 0; i < n_substrs; ++i) {
        if (i + substringLength > inputLength) break;

        char *substr_p = malloc(sizeof(char) * (substringLength + 1));
        if (substr_p == NULL) {
            // Handle allocation failure: free previously allocated substrings
            for (int j = 0; j < result.substringCount; ++j) {
                free(result.substring[j]);
            }
            free(result.substring);
            result.substring = NULL;
            result.substringCount = 0;
            return result;
        }

        strncpy(substr_p, inputText + i, substringLength);
        substr_p[substringLength] = '\0'; // Null-terminate the substring

        result.substring[result.substringCount++] = substr_p;
    }

    return result;
}