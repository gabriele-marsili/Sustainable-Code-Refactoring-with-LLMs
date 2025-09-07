#include "run_length_encoding.h"
#include <stdlib.h>
#include <string.h>
#include <stdio.h>

#define MAX_LEN 255

char *encode(char *input) {
    char *result = malloc(MAX_LEN);
    if (!result) return NULL;
    int pos = 0;
    char prev = '\0';
    int count = 0;

    for (char *c = input; *c; c++) {
        if (prev == *c) {
            count++;
        } else {
            if (count > 0) {
                if (count > 1) {
                    pos += snprintf(result + pos, MAX_LEN - pos, "%d%c", count, prev);
                } else {
                    result[pos++] = prev;
                }
            }
            count = 1;
            prev = *c;
        }
    }
    if (count > 0) {
        if (count > 1) {
            snprintf(result + pos, MAX_LEN - pos, "%d%c", count, prev);
        } else {
            result[pos++] = prev;
        }
    }
    result[pos] = '\0';
    return result;
}

char *decode(char *input) {
    char *result = malloc(MAX_LEN);
    if (!result) return NULL;
    char *p_result = result;
    int count = 0;

    for (char *c = input; *c; c++) {
        if ('0' <= *c && *c <= '9') {
            count = count * 10 + (*c - '0');
        } else {
            int repeat = count > 0 ? count : 1;
            if (p_result + repeat - result >= MAX_LEN) {
                free(result);
                return NULL; // Prevent buffer overflow
            }
            memset(p_result, *c, repeat);
            p_result += repeat;
            count = 0;
        }
    }
    *p_result = '\0';
    return result;
}