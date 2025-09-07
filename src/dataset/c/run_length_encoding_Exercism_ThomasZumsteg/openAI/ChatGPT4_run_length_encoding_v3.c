#include "run_length_encoding.h"
#include <stdlib.h>
#include <string.h>
#include <stdio.h>

#define MAX_LEN 255

char *encode(char *input) {
    char *result = calloc(MAX_LEN, sizeof(char));
    if (!result) return NULL;

    char *write_ptr = result;
    char prev = '\0';
    int count = 0;

    for (char *c = input; *c; c++) {
        if (*c == prev) {
            count++;
        } else {
            if (count > 0) {
                if (count > 1) write_ptr += sprintf(write_ptr, "%d", count);
                *(write_ptr++) = prev;
            }
            prev = *c;
            count = 1;
        }
    }

    if (count > 0) {
        if (count > 1) write_ptr += sprintf(write_ptr, "%d", count);
        *(write_ptr++) = prev;
    }

    *write_ptr = '\0';
    return result;
}

char *decode(char *input) {
    char *result = calloc(MAX_LEN, sizeof(char));
    if (!result) return NULL;

    char *write_ptr = result;
    int count = 0;

    for (char *c = input; *c; c++) {
        if (*c >= '0' && *c <= '9') {
            count = count * 10 + (*c - '0');
        } else {
            int repeat = count > 0 ? count : 1;
            memset(write_ptr, *c, repeat);
            write_ptr += repeat;
            count = 0;
        }
    }

    *write_ptr = '\0';
    return result;
}