#include "series.h"
#include <stdlib.h>
#include <stdio.h>
#include <string.h>

char *substr(char *text, int len) {
    char *result = malloc(len + 1);
    if (!result) return NULL;
    
    for(int i = 0; i < len; i++) {
        if(text[i] == 0) {
            free(result);
            return NULL;
        }
        result[i] = text[i];
    }
    result[len] = '\0';
    return result;
}

SeriesResults_t series(char *inputText, unsigned int substringLength) {
    SeriesResults_t result = {0, NULL};
    
    if(!inputText || substringLength == 0) {
        return result;
    }
    
    int inputLen = strlen(inputText);
    if(inputLen < substringLength) {
        return result;
    }
    
    int maxSubstrings = inputLen - substringLength + 1;
    result.substring = malloc(sizeof(char*) * maxSubstrings);
    if(!result.substring) {
        return result;
    }
    
    for(int i = 0; i <= inputLen - substringLength; i++) {
        char *substr_p = substr(inputText + i, substringLength);
        if(substr_p) {
            result.substring[result.substringCount++] = substr_p;
        }
    }
    
    return result;
}