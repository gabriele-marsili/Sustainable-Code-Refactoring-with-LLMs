#include "anagram.h"
#include <stdlib.h>
#include <string.h>
#include <ctype.h>

#define MAX_VEC_SIZE 128

int code_point_bytes(char c) {
    if ((c & (1 << 7)) == 0) {
        return 1;
    } else if (((c & (6 << 5)) == (6 << 5)) && ((c & (1 << 5)) == 0)) {
        return 2;
    } else if (((c & (14 << 4)) == (14 << 4)) && ((c & (1 << 4)) == 0)) {
        return 3;
    } else if (((c & (30 << 3)) == (30 << 3)) && ((c & (1 << 3)) == 0)) {
        return 4;
    }

    return -1;
}

int code_point_count(char *str, char *cp) {
    int count = 0;

    char c;
    int match;
    int bytes = code_point_bytes(cp[0]);

    for (int i = 0; (c = str[i]) != '\0'; i++) {
        for (int j = 0; j < bytes; j++) {
            match = 1;

            if (str[i + j] != cp[j]) {
                match = 0;
                break;
            }

            if (match) {
                count++;
            }

            if (i + j >= MAX_STR_LEN - 1) {
                break;
            }
        }

        if (i >= MAX_STR_LEN - 1) {
            break;
        }
    }

    return count;
}

void downcase(char *dst, char *src) {
    int i;
    char c;

    for (i = 0; (c = src[i]) != '\0'; i++) {
        if (code_point_bytes(c) == 1) {
            dst[i] = tolower(c);
        } else {
            dst[i] = c;
        }

        if (i >= MAX_STR_LEN - 1) {
            break;
        }
    }

    dst[i] = '\0';
}

int is_anagram(char *a, char *b) {
    char aBuf[MAX_STR_LEN];
    char bBuf[MAX_STR_LEN];

    unsigned len;

    char c;
    int i = 0;

    downcase(aBuf, a);
    downcase(bBuf, b);

    len = strlen(aBuf);

    if (len != strlen(bBuf) || strncmp(aBuf, bBuf, MAX_STR_LEN) == 0) {
        return 0;
    }

    while ((c = a[i]) != '\0') {
        if (code_point_count(aBuf, aBuf + i) !=
            code_point_count(bBuf, aBuf + i)) {
            return 0;
        }

        i += code_point_bytes(c);

        if (i >= MAX_STR_LEN - 1) {
            break;
        }
    }

    return 1;
}

struct Vector anagrams_for(char *word, struct Vector candidates) {
    struct Vector anagrams = { 0 };
    char matches[MAX_VEC_SIZE] = { 0 };

    int size = 0;
    int i, n = 0;

    for (i = 0; i < candidates.size; i++) {
        if (is_anagram(word, candidates.vec[i])) {
            size++;
            matches[i] = 1;
        }

        if (i >= MAX_VEC_SIZE - 1) {
            break;
        }
    }

    if (size > 0) {
        anagrams.vec =
            (char(*)[MAX_STR_LEN])malloc(sizeof(char*) * MAX_STR_LEN * size);
        anagrams.size = size;
    }

    for (i = 0; i < MAX_VEC_SIZE; i++) {
        if (matches[i]) {
            strncpy(anagrams.vec[n], candidates.vec[i], MAX_STR_LEN);
            n++;
        }
    }

    return anagrams;
}
