#include "run_length_encoding.h"
#include <stdlib.h>
#include <string.h>
#include <stdio.h>

#define MAX_LEN 255

char *encode(char *input) {
    char *result = malloc(MAX_LEN);
    if (!result) return NULL;
    int pos = 0;
    char prev = input[0];
    int count = 1;

    for (int i = 1; input[i] != '\0'; i++) {
        if (input[i] == prev) {
            count++;
        } else {
            if (count > 1) {
                pos += snprintf(result + pos, MAX_LEN - pos, "%d%c", count, prev);
            } else {
                result[pos++] = prev;
            }
            prev = input[i];
            count = 1;
        }
    }
    if (count > 1) {
        snprintf(result + pos, MAX_LEN - pos, "%d%c", count, prev);
    } else {
        result[pos++] = prev;
        result[pos] = '\0';
    }
    return result;
}

char *decode(char *input) {
    char *result = malloc(MAX_LEN);
    if (!result) return NULL;
    int pos = 0;
    int count = 0;

    for (int i = 0; input[i] != '\0'; i++) {
        if ('0' <= input[i] && input[i] <= '9') {
            count = count * 10 + (input[i] - '0');
        } else {
            int repeat = count > 0 ? count : 1;
            if (pos + repeat >= MAX_LEN) {
                free(result);
                return NULL; // Prevent buffer overflow
            }
            memset(result + pos, input[i], repeat);
            pos += repeat;
            count = 0;
        }
    }
    result[pos] = '\0';
    return result;
}