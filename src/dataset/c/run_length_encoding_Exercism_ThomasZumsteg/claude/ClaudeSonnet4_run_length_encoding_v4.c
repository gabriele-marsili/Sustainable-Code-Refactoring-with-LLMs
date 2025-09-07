#include "run_length_encoding.h"
#include <stdlib.h>
#include <string.h>

#define MAX_LEN 255

char *encode(char *input) {
    if (!input || !*input) {
        char *result = malloc(1);
        *result = '\0';
        return result;
    }
    
    char *result = malloc(MAX_LEN);
    char *write_ptr = result;
    char prev = *input;
    int count = 1;
    
    for (char *c = input + 1; *c; c++) {
        if (prev == *c) {
            count++;
        } else {
            if (count > 1) {
                write_ptr += sprintf(write_ptr, "%d%c", count, prev);
            } else {
                *write_ptr++ = prev;
            }
            count = 1;
            prev = *c;
        }
    }
    
    if (count > 1) {
        write_ptr += sprintf(write_ptr, "%d%c", count, prev);
    } else {
        *write_ptr++ = prev;
    }
    *write_ptr = '\0';
    
    return result;
}

char *decode(char *input) {
    if (!input || !*input) {
        char *result = malloc(1);
        *result = '\0';
        return result;
    }
    
    char *result = malloc(MAX_LEN);
    char *write_ptr = result;
    int count = 0;
    
    for (char *c = input; *c; c++) {
        if (*c >= '0' && *c <= '9') {
            count = count * 10 + (*c - '0');
        } else {
            int repeat = count > 0 ? count : 1;
            while (repeat--) {
                *write_ptr++ = *c;
            }
            count = 0;
        }
    }
    *write_ptr = '\0';
    
    return result;
}