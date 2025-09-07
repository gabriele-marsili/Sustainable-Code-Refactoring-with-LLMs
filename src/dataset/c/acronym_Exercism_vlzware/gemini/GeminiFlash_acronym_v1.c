#include <stdlib.h>
#include <string.h>
#include <ctype.h>
#include <stdio.h>
#include <stdbool.h>

char *abbreviate(const char *phrase) {
    if (!phrase || !*phrase) {
        return NULL;
    }

    size_t phrase_len = strlen(phrase);
    char *res = malloc(phrase_len + 1); 
    if (!res) {
        fprintf(stderr, "Memory allocation failed\n");
        return NULL;
    }

    char *dest = res;
    bool new_word = true;

    for (size_t i = 0; i < phrase_len; ++i) {
        if (isalpha(phrase[i])) {
            if (new_word) {
                *dest++ = toupper(phrase[i]);
                new_word = false;
            }
        } else {
            new_word = true;
        }
    }

    *dest = '\0';

    if (dest == res) {
        free(res);
        return NULL;
    }

    res = realloc(res, dest - res + 1);
    if (!res) {
        fprintf(stderr, "Memory reallocation failed\n");
        return NULL;
    }

    return res;
}