#include "series.h"
#include <stdlib.h>
#include <stdio.h>
#include <string.h>

SeriesResults_t series(char *inputText, unsigned int substringLength) {
    SeriesResults_t result = {0, NULL};
    
    if (substringLength == 0 || inputText == NULL) {
        return result;
    }
    
    int inputLen = strlen(inputText);
    if (inputLen < substringLength) {
        return result;
    }
    
    int maxSubstrings = inputLen - substringLength + 1;
    result.substring = malloc(sizeof(char*) * maxSubstrings);
    if (result.substring == NULL) {
        return result;
    }
    
    for (int i = 0; i <= inputLen - substringLength; i++) {
        char *substring = malloc(sizeof(char) * (substringLength + 1));
        if (substring == NULL) {
            // Clean up previously allocated memory
            for (int j = 0; j < result.substringCount; j++) {
                free(result.substring[j]);
            }
            free(result.substring);
            result.substring = NULL;
            result.substringCount = 0;
            return result;
        }
        
        memcpy(substring, inputText + i, substringLength);
        substring[substringLength] = '\0';
        result.substring[result.substringCount++] = substring;
    }
    
    return result;
}