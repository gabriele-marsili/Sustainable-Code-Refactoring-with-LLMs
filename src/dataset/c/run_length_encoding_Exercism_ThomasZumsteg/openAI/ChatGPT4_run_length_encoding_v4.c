#include "run_length_encoding.h"
#include <stdlib.h>
#include <string.h>
#include <stdio.h>

#define MAX_LEN 255

char *encode(char *input) {
    if (!input || !*input) return strdup("");

    char *result = malloc(MAX_LEN);
    if (!result) return NULL;

    char *p_result = result;
    char prev = *input;
    int count = 1;

    for (char *c = input + 1; *c; c++) {
        if (*c == prev) {
            count++;
        } else {
            if (count > 1) {
                p_result += sprintf(p_result, "%d%c", count, prev);
            } else {
                *(p_result++) = prev;
            }
            prev = *c;
            count = 1;
        }
    }

    if (count > 1) {
        sprintf(p_result, "%d%c", count, prev);
    } else {
        *(p_result++) = prev;
        *p_result = '\0';
    }

    return result;
}

char *decode(char *input) {
    if (!input || !*input) return strdup("");

    char *result = malloc(MAX_LEN);
    if (!result) return NULL;

    char *p_result = result;
    int count = 0;

    for (char *c = input; *c; c++) {
        if (*c >= '0' && *c <= '9') {
            count = count * 10 + (*c - '0');
        } else {
            int repeat = count > 0 ? count : 1;
            memset(p_result, *c, repeat);
            p_result += repeat;
            count = 0;
        }
    }

    *p_result = '\0';
    return result;
}