#include "run_length_encoding.h"
#include <stdlib.h>
#include <string.h>
#include <stdio.h>

#define MAX_LEN 255

char *encode(char *input) {
    if (!input || !*input) return calloc(1, sizeof(char));
    
    char *result = malloc(MAX_LEN);
    char *p_result = result;
    char prev = *input;
    int count = 1;
    
    for(char *c = input + 1; *c; c++) {
        if(prev == *c) {
            count++;
        } else {
            if(count > 1) {
                p_result += sprintf(p_result, "%d%c", count, prev);
            } else {
                *p_result++ = prev;
            }
            count = 1;
            prev = *c;
        }
    }
    
    if(count > 1) {
        p_result += sprintf(p_result, "%d%c", count, prev);
    } else {
        *p_result++ = prev;
    }
    *p_result = '\0';
    
    return result;
}

char *decode(char *input) {
    if (!input || !*input) return calloc(1, sizeof(char));
    
    char *result = malloc(MAX_LEN);
    char *p_result = result;
    int count = 0;
    
    for(char *c = input; *c; c++) {
        if('0' <= *c && *c <= '9') {
            count = count * 10 + (*c - '0');
        } else {
            int repeat = count > 0 ? count : 1;
            while(repeat-- > 0) {
                *p_result++ = *c;
            }
            count = 0;
        }
    }
    *p_result = '\0';
    
    return result;
}