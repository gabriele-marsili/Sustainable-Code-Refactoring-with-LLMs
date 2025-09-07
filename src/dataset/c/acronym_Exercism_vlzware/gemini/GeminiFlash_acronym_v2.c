#include <stdlib.h>
#include <string.h>
#include <ctype.h>
#include <stdio.h>
#include <stdbool.h>

char *abbreviate(const char *phrase)
{
    if (!phrase || !*phrase) {
        return NULL;
    }

    size_t phrase_len = strlen(phrase);
    char *res = malloc(phrase_len + 1);  // Allocate maximum possible size
    if (!res) {
        fprintf(stderr, "Memory error!\n");
        return NULL;
    }

    char *tmp = res;
    bool wordstart = true;
    size_t res_len = 0;

    for (size_t i = 0; i < phrase_len; ++i) {
        if (isalpha(phrase[i])) {
            if (wordstart) {
                wordstart = false;
                *tmp++ = toupper(phrase[i]);
                res_len++;
            }
        } else {
            wordstart = true;
        }
    }

    *tmp = '\0';
    if (res_len == 0) {
        free(res);
        return NULL;
    }

    res = realloc(res, res_len + 1); // Reallocate to actual size
    if (!res) {
        fprintf(stderr, "Memory error during reallocation!\n");
        return NULL;
    }

    return res;
}