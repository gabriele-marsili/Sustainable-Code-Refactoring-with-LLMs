#include <stdlib.h>
#include <string.h>
#include <ctype.h>
#include <stdio.h>
#include <stdbool.h>

char *abbreviate(const char *phrase)
{
    if (!phrase || !*phrase)
        return NULL;

    int word_count = 0;
    const char *p = phrase;
    bool in_word = false;

    while (*p) {
        if (isalpha(*p)) {
            if (!in_word) {
                word_count++;
                in_word = true;
            }
        } else {
            in_word = false;
        }
        p++;
    }

    if (!word_count)
        return NULL;

    char *res = malloc(word_count + 1);
    if (!res) {
        fprintf(stderr, "Memory error!\n");
        return NULL;
    }

    char *tmp = res;
    in_word = false;

    while (*phrase) {
        if (isalpha(*phrase)) {
            if (!in_word) {
                *tmp++ = toupper(*phrase);
                in_word = true;
            }
        } else {
            in_word = false;
        }
        phrase++;
    }
    *tmp = '\0';

    return res;
}